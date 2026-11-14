(() => {
  const $ = (s) => document.querySelector(s);
  const store = {
    get: (k, d) => { try { return JSON.parse(localStorage.getItem("osaka_" + k)) ?? d; } catch { return d; } },
    set: (k, v) => localStorage.setItem("osaka_" + k, JSON.stringify(v))
  };
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const mapUrl = (q) => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
  const WEEK = ["日", "一", "二", "三", "四", "五", "六"];

  // ---------- Header ----------
  $("#title").textContent = TRIP.title;
  $("#subtitle").textContent = TRIP.subtitle;
  const dateInput = $("#startDate");
  dateInput.value = store.get("start", TRIP.defaultStart);

  const dayDate = (i) => {
    const d = new Date(dateInput.value + "T00:00:00");
    d.setDate(d.getDate() + i);
    return d;
  };
  const fmt = (d) => `${d.getMonth() + 1}/${d.getDate()}（${WEEK[d.getDay()]}）`;

  function updateCountdown() {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = dayDate(0);
    const diff = Math.round((start - today) / 86400000);
    const n = TRIP.days.length;
    let txt;
    if (diff > 0) txt = `倒數 ${diff} 天 🎒`;
    else if (diff > -n) txt = `旅程第 ${1 - diff} 天 🎉`;
    else txt = "旅程已結束 💖";
    $("#countdown").textContent = txt;
    return diff;
  }

  // ---------- Plan ----------
  let currentDay = 0;
  const done = store.get("done", {});

  function renderTabs() {
    $("#dayTabs").innerHTML = TRIP.days.map((d, i) => `
      <button class="day-tab ${i === currentDay ? "active" : ""}" data-day="${i}"
        style="${i === currentDay ? `background:${d.color}` : ""}">
        <b>Day ${i + 1}</b><small>${fmt(dayDate(i))}</small>
      </button>`).join("");
  }

  function renderDay() {
    const d = TRIP.days[currentDay];
    const doneCount = d.items.filter((_, j) => done[`${currentDay}-${j}`]).length;
    $("#dayContent").innerHTML = `
      <div class="day-head" style="background:linear-gradient(135deg, ${d.color}, ${d.color}cc)">
        <span class="emoji">${d.emoji}</span>
        <p>DAY ${currentDay + 1} · ${fmt(dayDate(currentDay))}</p>
        <h2>${esc(d.title)}</h2>
        <div class="chips">
          <span class="chip">📍 ${esc(d.area)}</span>
          <span class="chip">🧭 ${d.items.length} 個行程</span>
          <span class="chip">✔ 完成 ${doneCount}/${d.items.length}</span>
        </div>
      </div>
      <div class="timeline" style="--dot:${d.color}">
        ${d.items.map((it, j) => {
          const key = `${currentDay}-${j}`;
          return `
          <div class="stop ${done[key] ? "done" : ""}">
            <div class="card">
              <div class="icon">${it.icon}</div>
              <div class="body">
                <div class="time">${it.time}</div>
                <div class="name">${esc(it.name)}${it.food ? '<span class="tag-food">美食</span>' : ""}</div>
                <div class="desc">${esc(it.desc)}</div>
                ${it.tip ? `<div class="tip">💡 ${esc(it.tip)}</div>` : ""}
                <div class="actions">
                  <button class="btn-sm ${done[key] ? "on" : ""}" data-done="${key}">${done[key] ? "✔ 已完成" : "○ 標記完成"}</button>
                  ${it.map ? `<a class="btn-sm" href="${mapUrl(it.map)}" target="_blank" rel="noopener">📍 地圖</a>` : ""}
                </div>
              </div>
            </div>
          </div>`;
        }).join("")}
      </div>
      <div class="card">
        <h3>🏨 今晚住宿</h3>
        <p>${currentDay === TRIP.days.length - 1 ? "返程日，無住宿 🏠" : `${esc(TRIP.hotel.name)}<br><span class="muted">${esc(TRIP.hotel.address)}</span>`}</p>
        ${currentDay === TRIP.days.length - 1 ? "" : `<div class="actions" style="margin-top:10px"><a class="btn-sm" href="${mapUrl(TRIP.hotel.map)}" target="_blank" rel="noopener">📍 飯店地圖</a></div>`}
      </div>`;
  }

  $("#dayTabs").addEventListener("click", (e) => {
    const b = e.target.closest("[data-day]");
    if (!b) return;
    currentDay = +b.dataset.day;
    renderTabs(); renderDay();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  $("#dayContent").addEventListener("click", (e) => {
    const b = e.target.closest("[data-done]");
    if (!b) return;
    const k = b.dataset.done;
    done[k] = !done[k];
    store.set("done", done);
    renderDay();
  });

  // ---------- Checklist ----------
  const checked = store.get("checked", {});
  const custom = store.get("customCheck", []);

  function renderChecklist() {
    const groups = TRIP.checklist.map((g) => ({ cat: g.cat, items: [...g.items] }));
    groups.push({ cat: "自訂項目", items: custom, custom: true });
    let total = 0, ok = 0;
    $("#checklist").innerHTML = groups.map((g, gi) => `
      <div class="card">
        <h3>${esc(g.cat)}</h3>
        ${g.items.map((it) => {
          total++; if (checked[it]) ok++;
          return `<label class="check-item ${checked[it] ? "checked" : ""}">
            <input type="checkbox" data-check="${esc(it)}" ${checked[it] ? "checked" : ""}/>
            <span>${esc(it)}</span>
          </label>`;
        }).join("")}
        ${g.custom ? `<form class="add-row" id="addCheck"><input placeholder="新增項目…" required/><button>＋</button></form>` : ""}
      </div>`).join("");
    const pct = total ? Math.round((ok / total) * 100) : 0;
    $("#checkBar").style.width = pct + "%";
    $("#checkProgress").textContent = `${ok}/${total}（${pct}%）`;
  }
  $("#checklist").addEventListener("change", (e) => {
    const k = e.target.dataset.check;
    if (k == null) return;
    checked[k] = e.target.checked;
    store.set("checked", checked);
    renderChecklist();
  });
  $("#checklist").addEventListener("submit", (e) => {
    e.preventDefault();
    const v = e.target.querySelector("input").value.trim();
    if (v && !custom.includes(v)) { custom.push(v); store.set("customCheck", custom); }
    renderChecklist();
  });

  // ---------- Expenses ----------
  let expenses = store.get("expenses", []);
  const rateInput = $("#rate");
  rateInput.value = store.get("rate", 0.21);
  $("#expDay").innerHTML = TRIP.days.map((_, i) => `<option value="${i}">Day ${i + 1}</option>`).join("");

  const yen = (n) => "¥" + Math.round(n).toLocaleString();
  function renderExpenses() {
    const rate = parseFloat(rateInput.value) || 0;
    const total = expenses.reduce((s, e) => s + e.amt, 0);
    $("#totalJpy").textContent = yen(total);
    $("#totalTwd").textContent = `≈ NT$${Math.round(total * rate).toLocaleString()}`;

    const byCat = {};
    expenses.forEach((e) => (byCat[e.cat] = (byCat[e.cat] || 0) + e.amt));
    $("#catSummary").innerHTML = Object.entries(byCat).map(([c, v]) => `<span>${esc(c)} ${yen(v)}</span>`).join("");

    if (!expenses.length) { $("#expenseList").innerHTML = `<li class="empty">還沒有任何花費紀錄 ✨</li>`; return; }
    let html = "";
    TRIP.days.forEach((_, i) => {
      const list = expenses.map((e, idx) => ({ ...e, idx })).filter((e) => e.day === i);
      if (!list.length) return;
      const sum = list.reduce((s, e) => s + e.amt, 0);
      html += `<li class="day-label">Day ${i + 1} · ${fmt(dayDate(i))} — ${yen(sum)}</li>`;
      html += list.map((e) => `
        <li class="exp">
          <span>${esc(e.cat.split(" ")[0])} ${esc(e.name)}</span>
          <span><span class="amt">${yen(e.amt)}</span><button class="del" data-del="${e.idx}" title="刪除">×</button></span>
        </li>`).join("");
    });
    $("#expenseList").innerHTML = html;
  }
  $("#expenseForm").addEventListener("submit", (e) => {
    e.preventDefault();
    expenses.push({
      day: +$("#expDay").value,
      cat: $("#expCat").value,
      name: $("#expName").value.trim(),
      amt: parseFloat($("#expAmt").value) || 0
    });
    store.set("expenses", expenses);
    $("#expName").value = ""; $("#expAmt").value = "";
    renderExpenses();
  });
  $("#expenseList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-del]");
    if (!b || !confirm("確定刪除這筆紀錄？")) return;
    expenses.splice(+b.dataset.del, 1);
    store.set("expenses", expenses);
    renderExpenses();
  });
  rateInput.addEventListener("input", () => { store.set("rate", rateInput.value); renderExpenses(); });

  // ---------- Info ----------
  $("#infoList").innerHTML = TRIP.info.map((b, bi) => `
    <div class="card info-card">
      <h3>${b.icon} ${esc(b.title)}</h3>
      <ul>${b.lines.map((l) => `<li>${bi === 0 ? esc(l).replace(/(\+?\d[\d-]{2,})/g, (m) => `<a href="tel:${m}">${m}</a>`) : esc(l)}</li>`).join("")}</ul>
    </div>`).join("");
  const notes = $("#notes");
  notes.value = store.get("notes", "");
  notes.addEventListener("input", () => store.set("notes", notes.value));
  $("#resetBtn").addEventListener("click", () => {
    if (!confirm("確定清除所有完成標記、清單、記帳與備忘錄？")) return;
    Object.keys(localStorage).filter((k) => k.startsWith("osaka_")).forEach((k) => localStorage.removeItem(k));
    location.reload();
  });

  // ---------- Nav ----------
  document.querySelectorAll(".bottom-nav button").forEach((btn) =>
    btn.addEventListener("click", () => {
      document.querySelectorAll(".bottom-nav button").forEach((b) => b.classList.toggle("active", b === btn));
      document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "view-" + btn.dataset.view));
      window.scrollTo({ top: 0 });
    })
  );

  dateInput.addEventListener("change", () => {
    if (!dateInput.value) dateInput.value = TRIP.defaultStart;
    store.set("start", dateInput.value);
    init();
  });

  function init() {
    const diff = updateCountdown();
    if (diff <= 0 && diff > -TRIP.days.length && !init.done) currentDay = -diff; // 旅途中自動跳到今天
    init.done = true;
    renderTabs(); renderDay(); renderExpenses();
  }
  renderChecklist();
  init();
})();
