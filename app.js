(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const gmapUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  // ---------- Storage ----------
  const STORAGE_KEY = "osaka_v3_state";
  const loadState = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && Array.isArray(raw.days) && raw.days.length) return raw;
    } catch {}
    return structuredClone(TRIP_DEFAULT);
  };
  let state = loadState();
  const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  let currentDay = 0;
  let currentTab = "home";
  let planMode = "single";
  let walletMode = "daily";
  let expenses = JSON.parse(localStorage.getItem("osaka_v2_expenses") || "[]");
  let dailyNotes = JSON.parse(localStorage.getItem("osaka_v2_notes") || "{}");
  let checkedItems = JSON.parse(localStorage.getItem("osaka_v2_checked") || "{}");

  const saveExpenses = () => localStorage.setItem("osaka_v2_expenses", JSON.stringify(expenses));
  const saveNotes = () => localStorage.setItem("osaka_v2_notes", JSON.stringify(dailyNotes));
  const saveChecked = () => localStorage.setItem("osaka_v2_checked", JSON.stringify(checkedItems));

  const WEEK_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const WEEK_TC = ["日", "一", "二", "三", "四", "五", "六"];

  const getDayDate = (idx) => {
    const base = new Date((state.startDate || "2026-12-10") + "T00:00:00");
    base.setDate(base.getDate() + idx);
    return base;
  };
  const pad2 = (n) => String(n).padStart(2, "0");

  // ---------- 頂部日期膠囊列 & 滑桿 (Video 1) ----------
  function renderDateHeader() {
    const total = state.days.length;
    $("#dateStrip").innerHTML = state.days
      .map((_, i) => {
        const d = getDayDate(i);
        const w = WEEK_EN[d.getDay()];
        const num = pad2(d.getDate());
        const mon = `${pad2(d.getMonth() + 1)}月`;
        return `
        <button class="date-pill ${i === currentDay ? "active" : ""}" data-day="${i}">
          <div class="dp-top"><span>${w}</span><sup>D${i + 1}</sup></div>
          <div class="dp-num">${num}</div>
          <div class="dp-month">${mon}</div>
        </button>`;
      })
      .join("");

    const pct = total > 1 ? (currentDay / (total - 1)) * 100 : 0;
    $("#sliderFill").style.width = `${pct}%`;
    $("#sliderDot").style.left = `${pct}%`;
    $("#sliderLabel").textContent = `Day ${currentDay + 1} / ${total}`;

    const activePill = $(`.date-pill[data-day="${currentDay}"]`);
    if (activePill) activePill.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }

  $("#dateStrip").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-day]");
    if (!btn) return;
    setDay(+btn.dataset.day);
  });
  $("#prevDayBtn").addEventListener("click", () => setDay((currentDay - 1 + state.days.length) % state.days.length));
  $("#nextDayBtn").addEventListener("click", () => setDay((currentDay + 1) % state.days.length));

  function setDay(idx) {
    currentDay = idx;
    renderDateHeader();
    renderHomeDynamic();
    renderPlanView();
    renderWalletView();
    if (currentTab === "map") refreshMapMarkers();
  }

  // ---------- 切換底部五格分頁 ----------
  function switchTab(tab) {
    currentTab = tab;
    $$(".bottom-bar .nav-item").forEach((b) => b.classList.toggle("active", b.dataset.tab === tab));
    $$(".main-content > .view").forEach((v) => v.classList.toggle("active", v.id === `view-${tab}`));
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (tab === "map") {
      setTimeout(() => {
        initMapIfNeeded();
        refreshMapMarkers();
      }, 60);
    }
  }

  $$(".bottom-bar .nav-item").forEach((b) => b.addEventListener("click", () => switchTab(b.dataset.tab)));
  document.addEventListener("click", (e) => {
    const g = e.target.closest("[data-goto]");
    if (g) switchTab(g.dataset.goto);
  });

  // ---------- 首頁渲染 (Video 1 + Video 2) ----------
  function renderHomeDynamic() {
    const dObj = getDayDate(currentDay);
    const dayData = state.days[currentDay];
    const mStr = `${pad2(dObj.getMonth() + 1)}月${pad2(dObj.getDate())}日`;

    $("#homeTodayBox").innerHTML = `
      <p class="today-tag">TODAY · DAY ${currentDay + 1}</p>
      <p class="today-date"><b>D${currentDay + 1}</b>${mStr}</p>
      <p class="today-city">${esc(dayData.city)}</p>
    `;

    const first3 = dayData.items.slice(0, 3);
    $("#homePreviewList").innerHTML = first3
      .map(
        (it) => `
      <div class="preview-item">
        <div class="preview-time">${esc(it.time)}</div>
        <div>
          <div class="preview-name">${esc(it.name)}</div>
          <div class="preview-meta">${esc(it.area)}${it.duration ? ` · ${esc(it.duration)}` : ""}</div>
        </div>
      </div>`
      )
      .join("");

    const remain = Math.max(0, dayData.items.length - 3);
    const moreBtn = $("#homeMoreBtn");
    if (remain > 0) {
      moreBtn.classList.remove("hidden");
      moreBtn.textContent = `還有 ${remain} 個行程 ›`;
    } else {
      moreBtn.classList.add("hidden");
    }
  }

  function renderHomeShowcase() {
    // 日期區間與徽章
    const dStart = getDayDate(0);
    const dEnd = getDayDate(state.days.length - 1);
    $("#cdDateRange").textContent = `${dStart.getFullYear()}.${pad2(dStart.getMonth() + 1)}.${pad2(dStart.getDate())} – ${pad2(dEnd.getMonth() + 1)}.${pad2(dEnd.getDate())}`;
    $("#cdBadges").innerHTML = (state.badges || []).map((b) => `<span class="cd-badge">${esc(b)}</span>`).join("");

    // 航班卡片
    $("#flightsContainer").innerHTML = (state.flights || [])
      .map(
        (f, i) => `
      <div class="flight-card">
        <span class="flight-badge ${i > 0 ? "flight-Badge-return" : ""}">✈️ ${esc(f.type)}</span>
        <div class="flight-code">${esc(f.code)}</div>
        <div class="flight-route">${esc(f.from)} → ${esc(f.to)}</div>
        <div class="flight-times">${esc(f.dep)} → ${esc(f.arr)}</div>
        <div class="flight-remind">🕒 ${esc(f.remind)}</div>
      </div>`
      )
      .join("");

    // 必訪景點畫廊
    $("#highlightsCarousel").innerHTML = (state.highlights || [])
      .map(
        (h, idx) => `
      <article class="photo-card">
        <img src="${esc(h.img)}" alt="${esc(h.name)}" loading="lazy" />
        <div class="photo-card-body">
          <h4>${esc(h.name)}</h4>
          <div class="tag-row">
            <span class="badge-blue">${esc(h.tag)}</span>
            <span class="chip-area">${esc(h.area)}</span>
          </div>
          <p>${esc(h.desc)}</p>
          <div class="photo-card-actions">
            <a class="map-blue-btn" href="${gmapUrl(h.map || h.name)}" target="_blank" rel="noopener">📍 地圖</a>
            <button class="pill-action" data-addspot="highlight:${idx}">＋ 加入行程</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    // 美食推薦畫廊
    $("#foodsCarousel").innerHTML = (state.foods || [])
      .map(
        (f, idx) => `
      <article class="photo-card">
        <img src="${esc(f.img)}" alt="${esc(f.name)}" loading="lazy" />
        <div class="photo-card-body">
          <h4>${esc(f.name)}</h4>
          <div class="tag-row">
            <span class="badge-blue">${esc(f.tag)}</span>
            ${f.warn ? `<span class="badge-warn">${esc(f.warn)}</span>` : ""}
          </div>
          <p>${esc(f.desc)}</p>
          <div class="photo-card-actions">
            <a class="map-blue-btn" href="${gmapUrl(f.map || f.name)}" target="_blank" rel="noopener">📍 地圖</a>
            <button class="pill-action" data-addspot="food:${idx}">＋ 加入行程</button>
          </div>
        </div>
      </article>`
      )
      .join("");

    // 住宿與房間分配
    $("#hotelsContainer").innerHTML = (state.hotels || [])
      .map(
        (h) => `
      <div class="hotel-card">
        <img src="${esc(h.img)}" alt="${esc(h.name)}" loading="lazy" />
        <div class="hotel-body">
          <div class="hotel-meta-row">
            <span class="badge-blue">${esc(h.stayLabel)}</span>
            <span class="muted-xs">📅 ${esc(h.dates)}</span>
          </div>
          <h4>${esc(h.name)}</h4>
          <p class="muted-xs" style="margin-bottom:10px">${esc(h.address)} · ${esc(h.checkIn)}</p>
          <div style="display:flex;gap:8px;flex-wrap:wrap">
            ${h.airbnbUrl ? `<a class="map-blue-btn" style="background:var(--terracotta)" href="${esc(h.airbnbUrl)}" target="_blank" rel="noopener">🏠 查看 Airbnb 房源</a>` : ""}
            <a class="map-blue-btn" href="${gmapUrl(h.map || h.name)}" target="_blank" rel="noopener">📍 地圖導航</a>
          </div>
          <details class="room-details" open>
            <summary>
              <span>🛏️ 樓層與房間配置（共 ${h.rooms.length} 區）</span>
              <span>▾</span>
            </summary>
            ${h.rooms
              .map(
                (r) => `
              <div class="room-box">
                <div class="room-box-head">
                  <span>${esc(r.unit)} · ${esc(r.guests)}</span>
                  <span class="badge-blue">${esc(r.type)}</span>
                </div>
                <p class="muted-xs">${esc(r.note)}</p>
              </div>`
              )
              .join("")}
          </details>
        </div>
      </div>`
      )
      .join("");

    // 旅遊小提醒 (護照、日幣、常備藥品、2026/11/1退稅新制)
    $("#remindersContainer").innerHTML = (state.reminders || [])
      .map(
        (r) => `
      <div class="tips-group">
        <h4>${r.icon} ${esc(r.title)}</h4>
        <ul>${r.items.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
      </div>`
      )
      .join("");
  }

  // 即時秒數倒數計時器 (Video 2)
  function updateLiveCountdown() {
    const target = new Date(`${state.startDate || "2026-12-10"}T${state.departureTime || "08:30"}:00`);
    const now = new Date();
    const diff = target - now;
    const el = $("#liveCountdown");
    if (!el) return;
    if (diff > 0) {
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      el.innerHTML = `${days}天 ${pad2(hours)}小時 ${pad2(mins)}分 <em>${pad2(secs)}秒</em>`;
    } else {
      const end = getDayDate(state.days.length);
      if (now < end) el.innerHTML = `🎉 關西旅程進行中！盡情享受每一刻`;
      else el.innerHTML = `💖 旅程圓滿結束・期待下次出發`;
    }
  }
  setInterval(updateLiveCountdown, 1000);

  // Open-Meteo 大阪即時天氣預報 (Video 2)
  const WMO_ICON = (code) => {
    if (code === 0) return "☀️";
    if (code <= 2) return "⛅";
    if (code === 3) return "☁️";
    if (code <= 49) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    return "⛈️";
  };

  async function fetchOsakaWeather() {
    const strip = $("#weatherStrip");
    const status = $("#weatherStatus");
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=34.6937&longitude=135.5023&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=6"
      );
      const data = await res.json();
      const daily = data.daily;
      strip.innerHTML = daily.time
        .map((dateStr, i) => {
          const d = new Date(dateStr + "T00:00:00");
          const label = `${d.getMonth() + 1}/${d.getDate()} (${WEEK_TC[d.getDay()]})`;
          const icon = WMO_ICON(daily.weathercode[i]);
          const min = Math.round(daily.temperature_2m_min[i]);
          const max = Math.round(daily.temperature_2m_max[i]);
          const rain = daily.precipitation_probability_max?.[i] ?? 10;
          return `
          <div class="w-day">
            <div class="w-date">${label}</div>
            <div class="w-icon">${icon}</div>
            <div class="w-temp">${min}° ${max}°</div>
            <div class="w-rain">💧 ${rain}%</div>
          </div>`;
        })
        .join("");
      status.textContent = "大阪即時預報";
    } catch {
      // 離線備援預報
      strip.innerHTML = state.days
        .map((_, i) => {
          const d = getDayDate(i);
          const icons = ["☀️", "⛅", "☀️", "⛅", "☀️", "⛅"];
          return `
          <div class="w-day">
            <div class="w-date">${d.getMonth() + 1}/${d.getDate()} (${WEEK_TC[d.getDay()]})</div>
            <div class="w-icon">${icons[i % icons.length]}</div>
            <div class="w-temp">${9 + (i % 3)}° ${16 + (i % 4)}°</div>
            <div class="w-rain">💧 ${10 + i * 5}%</div>
          </div>`;
        })
        .join("");
      status.textContent = "歷史平均參考";
    }
  }

  // 首頁快速錨點捲動
  $("#quickPills").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-scroll]");
    if (!btn) return;
    $$("#quickPills button").forEach((b) => b.classList.toggle("active", b === btn));
    const target = document.getElementById(btn.dataset.scroll);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#jumpFlightBtn").addEventListener("click", () => {
    document.getElementById("homeShowcase")?.scrollIntoView({ behavior: "smooth" });
  });
  $("#jumpTipsBtn").addEventListener("click", () => {
    document.getElementById("sec-tips")?.scrollIntoView({ behavior: "smooth" });
  });

  // ---------- 行程 VIEW (Video 1 單日詳細 + Video 2 全行程摺疊) ----------
  function renderPlanView() {
    const dayData = state.days[currentDay];
    const dObj = getDayDate(currentDay);
    $("#planDaySub").textContent = `DAY ${currentDay + 1} · ${dObj.getMonth() + 1}/${dObj.getDate()} (${WEEK_TC[dObj.getDay()]}) · ${dayData.shortCity}`;
    $("#planDayTitle").textContent = dayData.title;

    $("#planTimeline").innerHTML = dayData.items
      .map(
        (it, idx) => `
      <div class="stop-wrap">
        <article class="stop-card">
          <div class="stop-left">
            <div class="stop-time">${esc(it.time)}</div>
            <div class="stop-dur">${esc(it.duration || "")}</div>
          </div>
          <div class="stop-right">
            <h3 class="stop-title">${esc(it.name)}</h3>
            <div class="stop-tags">
              <span class="chip-area">${esc(it.area)}</span>
              <span class="chip-cat">${esc(it.cat || "景點")}</span>
            </div>
            <p class="stop-desc">${esc(it.desc)}</p>
            <div class="stop-actions">
              <a class="pill-action" href="${gmapUrl(it.map || it.name)}" target="_blank" rel="noopener">🧭 導航</a>
              <button class="pill-action" data-focuspin="${idx}">📍 加入地圖</button>
              <button class="pill-action" data-editstop="${idx}">✎ 編輯</button>
            </div>
          </div>
        </article>
        ${
          it.transit && idx < dayData.items.length - 1
            ? `<div class="transit-connector"><div class="transit-line"></div><span class="transit-pill">${esc(it.transit)}</span></div>`
            : `<div style="height:10px"></div>`
        }
      </div>`
      )
      .join("");

    // 今日筆記
    const noteInput = $("#dailyNoteInput");
    noteInput.value = dailyNotes[currentDay] || "";

    // 全天總覽摺疊卡片 (Video 2)
    $("#planAllWrap").innerHTML = state.days
      .map((d, di) => {
        const dt = getDayDate(di);
        const icons = ["✈️", "🎢", "🏯", "⛩️", "🦌", "🛍️"];
        return `
        <details class="day-accordion" ${di === currentDay ? "open" : ""}>
          <summary>
            <span>${icons[di % icons.length]} Day ${di + 1}｜${dt.getMonth() + 1}/${dt.getDate()}（${WEEK_TC[dt.getDay()]}）${esc(d.shortCity)}</span>
            <span class="muted-xs">▾</span>
          </summary>
          <div class="day-acc-body">
            ${d.items
              .map(
                (it, j) => `
              <div class="mini-stop">
                <strong style="color:var(--terracotta)">${esc(it.time)}</strong>
                <div>
                  <strong>${esc(it.name)}</strong>
                  <div class="muted-xs">${esc(it.desc)}</div>
                </div>
              </div>
              ${it.transit && j < d.items.length - 1 ? `<div class="mini-transit">${esc(it.transit)}</div>` : ""}`
              )
              .join("")}
          </div>
        </details>`;
      })
      .join("");
  }

  // 切換單日詳細 / 全天總覽
  $$(".mode-switch button").forEach((btn) =>
    btn.addEventListener("click", () => {
      planMode = btn.dataset.planmode;
      $$(".mode-switch button").forEach((b) => b.classList.toggle("active", b === btn));
      $("#planSingleWrap").classList.toggle("hidden", planMode !== "single");
      $("#planAllWrap").classList.toggle("hidden", planMode !== "all");
    })
  );

  $("#dailyNoteInput").addEventListener("input", (e) => {
    dailyNotes[currentDay] = e.target.value;
    saveNotes();
  });
  $("#focusNoteBtn").addEventListener("click", () => $("#dailyNoteInput").focus());

  // 點擊「加入地圖」定位或「編輯」行程
  $("#planTimeline").addEventListener("click", (e) => {
    const focusBtn = e.target.closest("[data-focuspin]");
    if (focusBtn) {
      const idx = +focusBtn.dataset.focuspin;
      switchTab("map");
      setTimeout(() => focusStopOnMap(idx), 160);
      return;
    }
    const editBtn = e.target.closest("[data-editstop]");
    if (editBtn) {
      openStopModal(+editBtn.dataset.editstop);
    }
  });

  $("#addStopFab").addEventListener("click", () => openStopModal(null));

  // ---------- 地圖 VIEW (Leaflet + OpenStreetMap) ----------
  let mapInstance = null;
  let markersLayer = null;
  let currentStopMarkers = [];

  function initMapIfNeeded() {
    if (mapInstance) {
      mapInstance.invalidateSize();
      return;
    }
    mapInstance = L.map("leafletMap", { zoomControl: true }).setView([34.6687, 135.5013], 13);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CartoDB",
      subdomains: "abcd",
      maxZoom: 19
    }).addTo(mapInstance);
    markersLayer = L.layerGroup().addTo(mapInstance);
  }

  function refreshMapMarkers() {
    if (!mapInstance || !markersLayer) return;
    markersLayer.clearLayers();
    currentStopMarkers = [];

    const dayData = state.days[currentDay];
    $("#mapCountStat").textContent = `${dayData.items.length} + ${state.savedSpots.length}`;
    $("#mapCityStat").textContent = dayData.shortCity;

    const coords = [];
    dayData.items.forEach((it, idx) => {
      if (!it.lat || !it.lng) return;
      coords.push([it.lat, it.lng]);
      const icon = L.divIcon({
        className: "custom-pin",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:#261c15;color:#fff;border:2px solid #fff;display:grid;place-items:center;font-weight:700;font-size:12px;box-shadow:0 3px 8px rgba(0,0,0,0.3)">${idx + 1}</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      const m = L.marker([it.lat, it.lng], { icon })
        .bindPopup(`<b>${idx + 1}. ${esc(it.name)}</b><br><small>${esc(it.time)} · ${esc(it.area)}</small>`)
        .addTo(markersLayer);
      currentStopMarkers.push(m);
    });

    // 住宿基地標記 (大正站 Airbnb 包棟民宿)
    (state.hotels || []).forEach((h) => {
      if (!h.lat || !h.lng) return;
      const homeIcon = L.divIcon({
        className: "hotel-pin",
        html: `<div style="width:30px;height:30px;border-radius:50%;background:#b8533c;color:#fff;border:2px solid #fff;display:grid;place-items:center;font-size:14px;box-shadow:0 3px 8px rgba(0,0,0,0.35)">🏠</div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
      L.marker([h.lat, h.lng], { icon: homeIcon })
        .bindPopup(`<b>🏠 住宿基地：${esc(h.name)}</b><br><small>${esc(h.area)}</small>`)
        .addTo(markersLayer);
    });

    // 收藏景點標記
    state.savedSpots.forEach((sp) => {
      if (!sp.lat || !sp.lng) return;
      const icon = L.divIcon({
        className: "saved-pin",
        html: `<div style="width:24px;height:24px;border-radius:50%;background:#c69a52;color:#fff;border:2px solid #fff;display:grid;place-items:center;font-size:12px;box-shadow:0 2px 6px rgba(0,0,0,0.25)">★</div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      });
      L.marker([sp.lat, sp.lng], { icon })
        .bindPopup(`<b>★ 備用景點：${esc(sp.name)}</b><br><small>${esc(sp.area)}</small>`)
        .addTo(markersLayer);
    });

    if (coords.length > 1) {
      L.polyline(coords, { color: "#7c6352", weight: 2.5, dashArray: "6 6" }).addTo(markersLayer);
      mapInstance.fitBounds(coords, { padding: [36, 36] });
    } else if (coords.length === 1) {
      mapInstance.setView(coords[0], 14);
    }

    // 渲染地圖下方當日地點列表
    $("#mapPinList").innerHTML = dayData.items
      .map(
        (it, i) => `
      <div class="map-pin-item" data-pinidx="${i}">
        <div>
          <span class="pin-num">${i + 1}</span>
          <strong>${esc(it.name)}</strong>
          <span class="muted-xs"> · ${esc(it.time)}</span>
        </div>
        <a class="pill-action" href="${gmapUrl(it.map || it.name)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">導航 ›</a>
      </div>`
      )
      .join("");
  }

  function focusStopOnMap(idx) {
    initMapIfNeeded();
    refreshMapMarkers();
    const it = state.days[currentDay].items[idx];
    if (it && it.lat && it.lng && mapInstance) {
      mapInstance.flyTo([it.lat, it.lng], 16, { duration: 0.6 });
      currentStopMarkers[idx]?.openPopup();
    }
  }

  $("#mapPinList").addEventListener("click", (e) => {
    const row = e.target.closest("[data-pinidx]");
    if (!row) return;
    focusStopOnMap(+row.dataset.pinidx);
  });

  $("#locateMeBtn").addEventListener("click", () => {
    const st = $("#mapYouStat");
    if (!navigator.geolocation) {
      st.textContent = "不支援定位";
      return;
    }
    st.textContent = "定位中…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        st.textContent = "已定位 ✔";
        initMapIfNeeded();
        L.circleMarker([latitude, longitude], {
          radius: 8,
          color: "#fff",
          weight: 2,
          fillColor: "#1d63b8",
          fillOpacity: 1
        })
          .addTo(markersLayer)
          .bindPopup("📍 你的目前位置")
          .openPopup();
        mapInstance.flyTo([latitude, longitude], 14);
      },
      () => {
        st.textContent = "未取得權限";
      }
    );
  });

  // ---------- 記帳 VIEW (Video 1 00:11-00:12) ----------
  function renderWalletView() {
    const rate = parseFloat(state.rate) || 0.215;
    const dObj = getDayDate(currentDay);
    const dStr = `${pad2(dObj.getMonth() + 1)}/${pad2(dObj.getDate())}`;

    $("#walletHeroLabel").textContent = walletMode === "daily" ? `本日支出 ${dStr}` : "6 天累積總支出";
    $("#expenseSubLabel").textContent = walletMode === "daily" ? `Day ${currentDay + 1} Expenses` : "All Expenses";
    $("#convRateNote").textContent = `1 JPY ≈ ${rate} TWD · 點擊右上角 ⚙️ 可調整匯率`;

    const filtered = expenses
      .map((e, idx) => ({ ...e, idx }))
      .filter((e) => (walletMode === "daily" ? e.day === currentDay : true));

    const sumJpy = filtered.reduce((s, e) => s + (Number(e.jpy) || 0), 0);
    const sumTwd = Math.round(sumJpy * rate);

    $("#walletTotalTwd").textContent = `NT$ ${sumTwd.toLocaleString()}`;
    $("#walletTotalJpy").textContent = sumJpy > 0 ? `¥ ${Math.round(sumJpy).toLocaleString()} 日圓（每人平均 NT$ ${Math.round(sumTwd / (filtered[0]?.split || 1)).toLocaleString()}）` : "尚無外幣支出";

    if (!filtered.length) {
      $("#expenseListWrap").innerHTML = `<div class="cream-card" style="text-align:center;color:var(--muted)">尚無支出紀錄，點擊上方「＋ 新增支出」開始記帳 ✨</div>`;
      return;
    }

    $("#expenseListWrap").innerHTML = filtered
      .map(
        (e) => `
      <div class="exp-item">
        <div>
          <strong>${esc(e.cat)} · ${esc(e.name)}</strong>
          <div class="muted-xs">Day ${e.day + 1} · ${esc(e.payer || "共同")}付款${e.split > 1 ? ` · ${e.split}人分攤 (每人 ¥${Math.round(e.jpy / e.split).toLocaleString()})` : ""}</div>
        </div>
        <div style="text-align:right;display:flex;align-items:center">
          <div>
            <strong>NT$ ${Math.round(e.jpy * rate).toLocaleString()}</strong>
            <div class="muted-xs">¥ ${Math.round(e.jpy).toLocaleString()}</div>
          </div>
          <button class="exp-del" data-delexp="${e.idx}" title="刪除">×</button>
        </div>
      </div>`
      )
      .join("");
  }

  $$(".wallet-seg button").forEach((btn) =>
    btn.addEventListener("click", () => {
      walletMode = btn.dataset.wmode;
      $$(".wallet-seg button").forEach((b) => b.classList.toggle("active", b === btn));
      renderWalletView();
    })
  );

  // 雙向匯率即時換算
  const convJpy = $("#convJpy");
  const convTwd = $("#convTwd");
  convJpy.addEventListener("input", () => {
    const v = parseFloat(convJpy.value);
    convTwd.value = isNaN(v) ? "" : Math.round(v * (parseFloat(state.rate) || 0.215));
  });
  convTwd.addEventListener("input", () => {
    const v = parseFloat(convTwd.value);
    convJpy.value = isNaN(v) ? "" : Math.round(v / (parseFloat(state.rate) || 0.215));
  });

  $("#expenseListWrap").addEventListener("click", (e) => {
    const del = e.target.closest("[data-delexp]");
    if (!del) return;
    expenses.splice(+del.dataset.delexp, 1);
    saveExpenses();
    renderWalletView();
  });

  // ---------- 備用景點 & 行前清單 VIEW (Video 1 00:13) ----------
  function renderSavedSpots() {
    $("#savedSpotsList").innerHTML = state.savedSpots
      .map(
        (sp, i) => `
      <article class="saved-spot-card">
        <h3>${esc(sp.name)}</h3>
        <p class="saved-spot-area">${esc(sp.area)}</p>
        <p class="saved-spot-desc">${esc(sp.desc)}</p>
        <div class="stop-actions">
          <button class="pill-action" data-addspot="saved:${i}">＋ 加入行程</button>
          <a class="pill-action" href="${gmapUrl(sp.map || sp.name)}" target="_blank" rel="noopener">📍 地圖</a>
          <button class="pill-action" data-editsaved="${i}">✎ 編輯</button>
        </div>
      </article>`
      )
      .join("");
  }

  function renderChecklist() {
    let total = 0;
    let done = 0;
    $("#checklistContainer").innerHTML = (state.checklist || [])
      .map(
        (g, gi) => `
      <div class="cream-card">
        <h3 style="margin-bottom:8px;font-size:16px">${esc(g.cat)}</h3>
        ${g.items
          .map((item) => {
            total++;
            const isChecked = !!checkedItems[item];
            if (isChecked) done++;
            return `
            <label class="check-row ${isChecked ? "done" : ""}">
              <input type="checkbox" data-checkitem="${esc(item)}" ${isChecked ? "checked" : ""} />
              <span>${esc(item)}</span>
            </label>`;
          })
          .join("")}
        ${
          gi === state.checklist.length - 1
            ? `<form id="addCheckForm" style="display:flex;gap:8px;margin-top:10px">
                <input id="newCheckInput" placeholder="新增自訂打包項目…" style="flex:1;border:1px solid var(--border-strong);border-radius:10px;padding:8px 10px;background:var(--bg)" required />
                <button class="pill-action" type="submit">＋ 新增</button>
              </form>`
            : ""
        }
      </div>`
      )
      .join("");

    const pct = total ? Math.round((done / total) * 100) : 0;
    $("#checkProgressFill").style.width = `${pct}%`;
    $("#checkProgressText").textContent = `${done} / ${total} (${pct}%)`;
  }

  $$(".spots-subtabs button").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$(".spots-subtabs button").forEach((b) => b.classList.toggle("active", b === btn));
      const tab = btn.dataset.stab;
      $("#stabSavedWrap").classList.toggle("hidden", tab !== "saved");
      $("#stabCheckWrap").classList.toggle("hidden", tab !== "check");
    })
  );

  $("#checklistContainer").addEventListener("change", (e) => {
    const item = e.target.dataset.checkitem;
    if (!item) return;
    checkedItems[item] = e.target.checked;
    saveChecked();
    renderChecklist();
  });

  $("#checklistContainer").addEventListener("submit", (e) => {
    if (e.target.id !== "addCheckForm") return;
    e.preventDefault();
    const val = $("#newCheckInput").value.trim();
    if (!val) return;
    state.checklist[state.checklist.length - 1].items.push(val);
    saveState();
    renderChecklist();
  });

  // ---------- 彈出視窗 Modals (新增/編輯行程、新增支出、備用景點、航班、設定) ----------
  const backdrop = $("#modalBackdrop");
  const sheet = $("#modalSheet");
  const closeModal = () => backdrop.classList.add("hidden");
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  // 1) 新增 / 編輯行程 Modal
  function openStopModal(idx) {
    const isEdit = idx !== null && idx !== undefined;
    const item = isEdit
      ? state.days[currentDay].items[idx]
      : { time: "14:00", duration: "1.5 小時", name: "", area: state.days[currentDay].shortCity, cat: "景點", desc: "", transit: "🚶 步行約 10 分鐘", map: "" };

    sheet.innerHTML = `
      <h3>${isEdit ? "✎ 編輯行程" : `＋ 新增 Day ${currentDay + 1} 行程`}</h3>
      <form id="stopForm" class="form-grid">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>時間<input name="time" value="${esc(item.time)}" placeholder="09:30" required /></label>
          <label>停留時間<input name="duration" value="${esc(item.duration || "")}" placeholder="1.5 小時" /></label>
        </div>
        <label>地點名稱<input name="name" value="${esc(item.name)}" placeholder="例如：通天閣" required /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>區域<input name="area" value="${esc(item.area)}" placeholder="難波 / 梅田" /></label>
          <label>類別
            <select name="cat">
              ${["景點", "美食", "購物", "交通", "住宿"].map((c) => `<option ${item.cat === c ? "selected" : ""}>${c}</option>`).join("")}
            </select>
          </label>
        </div>
        <label>行程備註與亮點<textarea name="desc" rows="3">${esc(item.desc)}</textarea></label>
        <label>前往下一站交通提示<input name="transit" value="${esc(item.transit || "")}" placeholder="🚇 地鐵御堂筋線 10 分鐘" /></label>
        <div class="modal-actions">
          ${isEdit ? `<button type="button" class="btn-danger" id="delStopBtn">刪除</button>` : ""}
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");

    $("#cancelModalBtn").onclick = closeModal;
    if (isEdit) {
      $("#delStopBtn").onclick = () => {
        state.days[currentDay].items.splice(idx, 1);
        saveState();
        renderPlanView();
        renderHomeDynamic();
        closeModal();
      };
    }
    $("#stopForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const updated = {
        ...item,
        time: fd.get("time").trim(),
        duration: fd.get("duration").trim(),
        name: fd.get("name").trim(),
        area: fd.get("area").trim(),
        cat: fd.get("cat"),
        desc: fd.get("desc").trim(),
        transit: fd.get("transit").trim(),
        map: fd.get("name").trim()
      };
      if (isEdit) state.days[currentDay].items[idx] = updated;
      else {
        state.days[currentDay].items.push(updated);
        state.days[currentDay].items.sort((a, b) => a.time.localeCompare(b.time));
      }
      saveState();
      renderPlanView();
      renderHomeDynamic();
      closeModal();
    };
  }

  // 2) 將「必訪景點 / 美食 / 備用景點」一鍵加入行程 Modal (Video 1 00:13)
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-addspot]");
    if (addBtn) {
      const [type, rawIdx] = addBtn.dataset.addspot.split(":");
      const idx = +rawIdx;
      const src = type === "highlight" ? state.highlights[idx] : type === "food" ? state.foods[idx] : state.savedSpots[idx];
      if (!src) return;

      sheet.innerHTML = `
        <h3>＋ 將「${esc(src.name)}」加入行程</h3>
        <form id="insertSpotForm" class="form-grid">
          <label>選擇天數
            <select name="dayIdx">
              ${state.days.map((d, i) => `<option value="${i}" ${i === currentDay ? "selected" : ""}>Day ${i + 1} · ${esc(d.shortCity)}</option>`).join("")}
            </select>
          </label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
            <label>時間<input name="time" value="15:00" required /></label>
            <label>停留時間<input name="duration" value="1.5 小時" /></label>
          </div>
          <div class="modal-actions">
            <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
            <button type="submit" class="btn-primary">加入行程</button>
          </div>
        </form>`;
      backdrop.classList.remove("hidden");
      $("#cancelModalBtn").onclick = closeModal;
      $("#insertSpotForm").onsubmit = (ev) => {
        ev.preventDefault();
        const fd = new FormData(ev.target);
        const targetDay = +fd.get("dayIdx");
        state.days[targetDay].items.push({
          id: "custom-" + Date.now(),
          time: fd.get("time").trim(),
          duration: fd.get("duration").trim(),
          name: src.name,
          area: src.area || state.days[targetDay].shortCity,
          cat: type === "food" ? "美食" : "景點",
          desc: src.desc,
          map: src.map || src.name,
          lat: src.lat,
          lng: src.lng,
          transit: "🚶 步行或搭車前往下一站"
        });
        state.days[targetDay].items.sort((a, b) => a.time.localeCompare(b.time));
        saveState();
        setDay(targetDay);
        closeModal();
        switchTab("plan");
      };
    }

    const editSaved = e.target.closest("[data-editsaved]");
    if (editSaved) openSavedModal(+editSaved.dataset.editsaved);
  });

  // 3) 新增 / 編輯備用景點 Modal
  function openSavedModal(idx) {
    const isEdit = idx !== null && idx !== undefined;
    const sp = isEdit ? state.savedSpots[idx] : { name: "", area: "大阪難波 · Osaka", desc: "", map: "" };
    sheet.innerHTML = `
      <h3>${isEdit ? "✎ 編輯備用景點" : "＋ 新增備用景點"}</h3>
      <form id="savedForm" class="form-grid">
        <label>景點或餐廳名稱<input name="name" value="${esc(sp.name)}" placeholder="例如：HARBS 大丸心齋橋店" required /></label>
        <label>城市與區域<input name="area" value="${esc(sp.area)}" placeholder="心齋橋 · Osaka" /></label>
        <label>特色備註<textarea name="desc" rows="3" placeholder="招牌水果千層蛋糕…">${esc(sp.desc)}</textarea></label>
        <div class="modal-actions">
          ${isEdit ? `<button type="button" class="btn-danger" id="delSavedBtn">刪除</button>` : ""}
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");
    $("#cancelModalBtn").onclick = closeModal;
    if (isEdit) {
      $("#delSavedBtn").onclick = () => {
        state.savedSpots.splice(idx, 1);
        saveState();
        renderSavedSpots();
        closeModal();
      };
    }
    $("#savedForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const obj = {
        ...sp,
        name: fd.get("name").trim(),
        area: fd.get("area").trim(),
        desc: fd.get("desc").trim(),
        map: fd.get("name").trim(),
        lat: sp.lat || 34.6687,
        lng: sp.lng || 135.5013
      };
      if (isEdit) state.savedSpots[idx] = obj;
      else state.savedSpots.push(obj);
      saveState();
      renderSavedSpots();
      closeModal();
    };
  }
  $("#addSavedFab").addEventListener("click", () => openSavedModal(null));

  // 4) 新增支出 Modal
  $("#openExpenseModalBtn").addEventListener("click", () => {
    sheet.innerHTML = `
      <h3>🪙 新增旅費支出</h3>
      <form id="expModalForm" class="form-grid">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>所屬天數
            <select name="day">
              ${state.days.map((_, i) => `<option value="${i}" ${i === currentDay ? "selected" : ""}>Day ${i + 1}</option>`).join("")}
            </select>
          </label>
          <label>類別
            <select name="cat">
              <option>🍜 餐飲</option><option>🛍️ 購物</option><option>🚆 交通</option><option>🎫 門票</option><option>🏨 住宿</option><option>📦 其他</option>
            </select>
          </label>
        </div>
        <label>項目名稱<input name="name" placeholder="例如：蟹道樂午間套餐、藥妝" required /></label>
        <label>日圓金額 (JPY ¥)<input type="number" name="jpy" placeholder="3500" inputmode="decimal" required /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>付款人<input name="payer" value="我" /></label>
          <label>分攤人數<input type="number" name="split" value="1" min="1" /></label>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">新增紀錄</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");
    $("#cancelModalBtn").onclick = closeModal;
    $("#expModalForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      expenses.unshift({
        day: +fd.get("day"),
        cat: fd.get("cat"),
        name: fd.get("name").trim(),
        jpy: parseFloat(fd.get("jpy")) || 0,
        payer: fd.get("payer").trim() || "我",
        split: Math.max(1, parseInt(fd.get("split"), 10) || 1)
      });
      saveExpenses();
      renderWalletView();
      closeModal();
    };
  });

  // 5) 編輯航班 Modal
  $("#editFlightBtn").addEventListener("click", () => {
    const f0 = state.flights[0];
    const f1 = state.flights[1];
    sheet.innerHTML = `
      <h3>✈️ 編輯去回程航班</h3>
      <form id="flightForm" class="form-grid">
        <strong style="font-size:13px;color:var(--blue-accent)">去程航班</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>航空公司與班號<input name="code0" value="${esc(f0.code)}" /></label>
          <label>航線<input name="route0" value="${esc(f0.from)} → ${esc(f0.to)}" /></label>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>起飛時間<input name="dep0" value="${esc(f0.dep)}" /></label>
          <label>抵達時間<input name="arr0" value="${esc(f0.arr)}" /></label>
        </div>
        <label>報到提醒<input name="rem0" value="${esc(f0.remind)}" /></label>

        <strong style="font-size:13px;color:#c5221f;margin-top:6px">回程航班</strong>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>航空公司與班號<input name="code1" value="${esc(f1.code)}" /></label>
          <label>航線<input name="route1" value="${esc(f1.from)} → ${esc(f1.to)}" /></label>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>起飛時間<input name="dep1" value="${esc(f1.dep)}" /></label>
          <label>抵達時間<input name="arr1" value="${esc(f1.arr)}" /></label>
        </div>
        <label>報到提醒<input name="rem1" value="${esc(f1.remind)}" /></label>

        <div class="modal-actions">
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存航班</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");
    $("#cancelModalBtn").onclick = closeModal;
    $("#flightForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      const [from0, to0] = fd.get("route0").split("→").map((s) => s.trim());
      const [from1, to1] = fd.get("route1").split("→").map((s) => s.trim());
      state.flights[0] = { ...f0, code: fd.get("code0"), from: from0 || f0.from, to: to0 || f0.to, dep: fd.get("dep0"), arr: fd.get("arr0"), remind: fd.get("rem0") };
      state.flights[1] = { ...f1, code: fd.get("code1"), from: from1 || f1.from, to: to1 || f1.to, dep: fd.get("dep1"), arr: fd.get("arr1"), remind: fd.get("rem1") };
      saveState();
      renderHomeShowcase();
      closeModal();
    };
  });

  // 5b) 編輯住宿與分房 Modal
  $("#editHotelBtn")?.addEventListener("click", () => {
    const h = state.hotels[0];
    if (!h) return;
    sheet.innerHTML = `
      <h3>🏠 編輯住宿與樓層分房</h3>
      <form id="hotelForm" class="form-grid">
        <label>民宿 / 飯店名稱<input name="name" value="${esc(h.name)}" required /></label>
        <label>地址與交通說明<input name="address" value="${esc(h.address)}" /></label>
        <label>入住須知 / 門鎖備註<input name="checkIn" value="${esc(h.checkIn)}" /></label>
        <label>Airbnb 房源連結<input name="airbnbUrl" value="${esc(h.airbnbUrl || "")}" /></label>
        ${h.rooms
          .map(
            (r, ri) => `
          <div style="border-top:1px solid var(--border);padding-top:8px;margin-top:4px">
            <strong style="font-size:13px;color:var(--terracotta)">${esc(r.unit)}（${esc(r.type)}）</strong>
            <label style="margin-top:6px">入住成員<input name="guests_${ri}" value="${esc(r.guests)}" /></label>
            <label style="margin-top:6px">備註<input name="note_${ri}" value="${esc(r.note)}" /></label>
          </div>`
          )
          .join("")}
        <div class="modal-actions">
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存住宿</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");
    $("#cancelModalBtn").onclick = closeModal;
    $("#hotelForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      h.name = fd.get("name").trim();
      h.address = fd.get("address").trim();
      h.checkIn = fd.get("checkIn").trim();
      h.airbnbUrl = fd.get("airbnbUrl").trim();
      h.rooms.forEach((r, ri) => {
        r.guests = fd.get(`guests_${ri}`).trim();
        r.note = fd.get(`note_${ri}`).trim();
      });
      saveState();
      renderHomeShowcase();
      closeModal();
    };
  });

  // 6) 右上角 ⚙️ 行程設定 Modal
  $("#openSettingsBtn").addEventListener("click", () => {
    sheet.innerHTML = `
      <h3>⚙️ 旅遊書設定</h3>
      <form id="settingsForm" class="form-grid">
        <label>出發日期 (Day 1)<input type="date" name="startDate" value="${esc(state.startDate)}" required /></label>
        <label>起飛時間 (用於秒數倒數)<input type="time" name="departureTime" value="${esc(state.departureTime || "08:30")}" /></label>
        <label>日圓兌台幣匯率 (1 JPY = ? TWD)<input type="number" step="0.001" name="rate" value="${esc(state.rate)}" required /></label>
        <div class="modal-actions">
          <button type="button" class="btn-danger" id="resetAllBtn">還原預設值</button>
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存設定</button>
        </div>
      </form>`;
    backdrop.classList.remove("hidden");
    $("#cancelModalBtn").onclick = closeModal;
    $("#resetAllBtn").onclick = () => {
      if (!confirm("確定要還原所有行程、記帳與筆記至預設狀態嗎？")) return;
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem("osaka_v2_expenses");
      localStorage.removeItem("osaka_v2_notes");
      localStorage.removeItem("osaka_v2_checked");
      location.reload();
    };
    $("#settingsForm").onsubmit = (e) => {
      e.preventDefault();
      const fd = new FormData(e.target);
      state.startDate = fd.get("startDate") || "2026-12-10";
      state.departureTime = fd.get("departureTime") || "08:30";
      state.rate = parseFloat(fd.get("rate")) || 0.215;
      saveState();
      renderDateHeader();
      renderHomeDynamic();
      renderHomeShowcase();
      renderPlanView();
      renderWalletView();
      updateLiveCountdown();
      closeModal();
    };
  });

  // ---------- 初始化 ----------
  renderDateHeader();
  renderHomeDynamic();
  renderHomeShowcase();
  renderPlanView();
  renderWalletView();
  renderSavedSpots();
  renderChecklist();
  updateLiveCountdown();
  fetchOsakaWeather();
})();
