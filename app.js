(() => {
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const gmapUrl = (q) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;

  // ---------- Storage ----------
  const STORAGE_KEY = "osaka_v5_state";
  // Replace only unchanged defaults; preserve customized itineraries and all personal records.
  function migrateCityDay(raw) {
    const changes = [{"key":"days","index":1,"previous":{"city":"USJ · 日本環球影城","shortCity":"環球影城","title":"日本環球影城 USJ 夢幻一日暢玩（大正出發超近！）","center":[34.6654,135.4323],"items":[{"id":"d2-1","time":"07:20","duration":"20 分鐘","name":"從大正民宿出發前往 USJ","area":"大正 → 環球城","cat":"交通","desc":"住大正站去 USJ 超級快！從「JR 大正站」搭大阪環狀線 2 站到「西九條站」，轉乘 JR 夢咲線至「環球城站」，車程僅約 12 分鐘。","map":"Universal City Station","lat":34.6679,"lng":135.4383,"transit":"🚶 出站步行 5 分鐘入園"},{"id":"d2-2","time":"08:30","duration":"3 小時","name":"超級任天堂世界 Super Nintendo World","area":"USJ","cat":"景點","desc":"入園立即用 USJ App 抽整理券或憑 Express 入場！必玩：瑪利歐賽車～庫巴的挑戰書、咚奇剛的瘋狂礦車、戴能量手環敲磚塊。","map":"Super Nintendo World Osaka","lat":34.6656,"lng":135.4306,"transit":"🚶 園區移動 8 分鐘"},{"id":"d2-3","time":"12:00","duration":"1.5 小時","name":"奇諾比奧咖啡店 / 三根掃帚午餐","area":"USJ","cat":"美食","desc":"奇諾比奧咖啡店需掃描店門 QR 預約時段；或前往哈利波特園區「三根掃帚」享用烤雞排與奶油啤酒。","map":"Kinopio's Cafe USJ","lat":34.6658,"lng":135.4309,"transit":"🚶 園區移動 5 分鐘"},{"id":"d2-4","time":"13:30","duration":"2.5 小時","name":"哈利波特魔法世界","area":"USJ","cat":"景點","desc":"霍格華茲城堡「哈利波特禁忌之旅」、鷹馬的飛行，活米村挑魔杖互動施法。","map":"The Wizarding World of Harry Potter Osaka","lat":34.6649,"lng":135.4308,"transit":"🚶 園區移動 6 分鐘"},{"id":"d2-5","time":"16:00","duration":"2.5 小時","name":"小小兵樂園 & 侏羅紀公園飛天翼龍","area":"USJ","cat":"景點","desc":"小小兵瘋狂乘車遊、購買造型爆米花桶；刺激派必搭「飛天翼龍」與「好萊塢美夢乘車遊」。","map":"Minion Park USJ","lat":34.6644,"lng":135.4343,"transit":"🚶 出園步行 5 分鐘"},{"id":"d2-6","time":"20:00","duration":"1.5 小時","name":"Universal CityWalk 晚餐 & 12分鐘返抵大正","area":"環球城市大道","cat":"美食","desc":"園區外大道有大阪章魚燒博物館、Shake Shack、Red Lobster，吃飽搭 JR 僅 12 分鐘即回到大正站民宿！","map":"Universal CityWalk Osaka","lat":34.6673,"lng":135.4375}]}},{"key":"highlights","index":0,"previous":{"name":"日本環球影城 USJ","tag":"大正出發12分","area":"此花區","desc":"從大正站搭 JR 僅 12 分鐘！超級任天堂世界、咚奇剛國度與哈利波特魔法世界。","map":"Universal Studios Japan","lat":34.6654,"lng":135.4323,"img":"https://images.unsplash.com/photo-1624601573012-efb68931cc8f?auto=format&fit=crop&w=700&q=80"}},{"key":"reminders","index":1,"previous":{"icon":"🏠","title":"大正站 Airbnb 包棟民宿入住須知","items":["房源位置：JR 大阪環狀線／地鐵長堀鶴見綠地線「大正站」步行約 4 分鐘（鄰近京瓷巨蛋、AEON 購物中心與 TUGBOAT 河畔美食街）","包棟優勢：整棟 3 層樓獨立房屋，前往心齋橋（地鐵直達 6 分）、梅田（JR 直達 11 分）、USJ 環球影城（約 12 分）、關西機場（JR 關空快速直達）都超方便","日本住宅區夜間 21:00 後請降低音量，出入隨手鎖門，垃圾請依民宿規定分類放置於室內"]}},{"key":"checklist","index":0,"previous":{"cat":"證件與票券","items":["護照正本（效期 6 個月以上）","樂桃航空預訂確認碼 #UF25FY 截圖","Visit Japan Web QR 截圖","Airbnb 入住指南 & 門鎖密碼截圖","日幣現金 & 零錢包","海外高回饋信用卡 2 張","USJ 門票 + 快速通關 QR"]}},{"key":"days","index":4,"previous":{"city":"Nara · 奈良與新世界","shortCity":"奈良・新世界","title":"奈良小鹿餵食・東大寺・通天閣串炸","center":[34.6851,135.843],"items":[{"id":"d5-1","time":"08:30","duration":"45 分鐘","name":"大正出發 → 近鐵奈良","area":"大正 → 奈良","cat":"交通","desc":"從大正搭地鐵或 JR 至難波/鶴橋，轉乘「近鐵奈良線快速急行」直達近鐵奈良站（或從大正搭 JR 大和路線直達 JR 奈良）。","map":"Kintetsu-Nara Station","lat":34.6842,"lng":135.8276,"transit":"🚶 沿東向商店街步行 8 分鐘"},{"id":"d5-2","time":"09:30","duration":"1.5 小時","name":"奈良公園 與小鹿互動","area":"奈良","cat":"景點","desc":"買鹿仙貝（¥200）餵食野生梅花鹿，向小鹿敬禮牠們也會點頭回禮！請收好紙鈔與地圖。","map":"Nara Park","lat":34.685,"lng":135.843,"transit":"🚶 步行 6 分鐘"},{"id":"d5-3","time":"11:00","duration":"1.5 小時","name":"東大寺・大佛殿 & 春日大社","area":"奈良","cat":"景點","desc":"世界最大木造建築東大寺參拜 15 公尺高盧舍那大佛（¥800），鑽大佛鼻孔柱祈求平安；順遊春日大社萬燈籠。","map":"Todai-ji","lat":34.689,"lng":135.8399,"transit":"🚶 步行 12 分鐘回商店街"},{"id":"d5-4","time":"12:45","duration":"1.5 小時","name":"中谷堂高速搗麻糬 & 釜飯志津香午餐","area":"奈良三條通","cat":"美食","desc":"必吃中谷堂剛出爐熱騰騰的艾草紅豆麻糬，午餐享用奈良名物「平宗柿葉壽司」或「志津香釜飯」。","map":"Nakatanidou Nara","lat":34.6822,"lng":135.8287,"transit":"🚆 奈良 → 天王寺（阿倍野）約 35 分鐘"},{"id":"d5-5","time":"16:00","duration":"1.5 小時","name":"阿倍野 HARUKAS 300 展望台","area":"天王寺","cat":"景點","desc":"300 公尺高玻璃帷幕觀景台，天氣晴朗可遠眺明石海峽大橋與京瓷巨蛋方向（¥2,000）。","map":"Abeno Harukas","lat":34.6463,"lng":135.5135,"transit":"🚶 穿越天王寺公園步行 12 分鐘"},{"id":"d5-6","time":"18:00","duration":"2 小時","name":"新世界・通天閣 & 元祖串炸晚餐","area":"新世界 → 大正","cat":"美食","desc":"昭和復古霓虹街區拍照！晚餐吃「八重勝」或「串炸達摩 (だるま)」，餐後從 JR 新今宮站搭環狀線 2 站（4 分鐘）就回到大正站民宿！","map":"Tsutenkaku","lat":34.6525,"lng":135.5063}]}},{"key":"highlights","index":5,"previous":{"name":"奈良公園 & 東大寺","tag":"療癒必訪","area":"奈良","desc":"上千隻親人小鹿在草地漫步，搭配世界最大木造建築東大寺大佛。","map":"Nara Park","lat":34.685,"lng":135.843,"img":"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=80"}},{"key":"foods","index":5,"previous":{"name":"中谷堂 艾草麻糬","tag":"奈良甜點","warn":"現搗出爐","area":"奈良商店街","desc":"日本電視冠軍高速搗麻糬名店，熱呼呼軟Q外皮包裹綿密十勝紅豆餡與黃豆粉。","map":"Nakatanidou","lat":34.6822,"lng":135.8287,"img":"https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80"}}];
    let changed = false;
    // This route replacement was explicitly requested; apply it once to saved trips too.
    if (raw.days?.[4] && raw.day5KobeRevision !== 1) {
      const backupKey = `${STORAGE_KEY}_day5_before_kobe`;
      try {
        if (!localStorage.getItem(backupKey)) {
          localStorage.setItem(backupKey, JSON.stringify(raw.days[4]));
        }
      } catch {
        return raw;
      }
      raw.days[4] = structuredClone(TRIP_DEFAULT.days[4]);
      raw.day5KobeRevision = 1;
      changed = true;
    }
    for (const { key, index, previous } of changes) {
      if (JSON.stringify(raw[key]?.[index]) === JSON.stringify(previous)) {
        raw[key][index] = structuredClone(TRIP_DEFAULT[key][index]);
        changed = true;
      }
    }
    if (changed) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(raw)); } catch {}
    }
    return raw;
  }
  const loadState = () => {
    try {
      const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (raw && Array.isArray(raw.days) && raw.days.length) return migrateCityDay(raw);
    } catch {}
    return structuredClone(TRIP_DEFAULT);
  };
  let state = loadState();
  const saveState = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));

  let currentDay = 0;
  let currentTab = "home";
  let walletMode = "daily";
  let spotsFilter = "saved";
  let expenses = JSON.parse(localStorage.getItem("osaka_v2_expenses") || "[]");
  let dailyNotes = JSON.parse(localStorage.getItem("osaka_v2_notes") || "{}");
  let checkedItems = JSON.parse(localStorage.getItem("osaka_v2_checked") || "{}");
  let cachedWeather = null;

  const saveExpenses = () => localStorage.setItem("osaka_v2_expenses", JSON.stringify(expenses));
  const saveNotes = () => localStorage.setItem("osaka_v2_notes", JSON.stringify(dailyNotes));
  const saveChecked = () => localStorage.setItem("osaka_v2_checked", JSON.stringify(checkedItems));

  const WEEK_EN = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const WEEK_TC = ["日", "一", "二", "三", "四", "五", "六"];

  const getDayDate = (idx) => {
    const base = new Date((state.startDate || "2026-12-09") + "T00:00:00");
    base.setDate(base.getDate() + idx);
    return base;
  };
  const pad2 = (n) => String(n).padStart(2, "0");

  // ---------- 頂部日期膠囊列 & 進度滑桿 (影片 1) ----------
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
    renderHomeView();
    renderPlanView();
    renderWalletView();
    if (currentTab === "map") refreshMapMarkers();
  }

  // ---------- 底部五格導覽列切換 ----------
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

  // ---------- 1. 首頁 VIEW (100% 影片 1 版面) ----------
  function renderHomeView() {
    const dObj = getDayDate(currentDay);
    const dayData = state.days[currentDay];
    const mStr = `${pad2(dObj.getMonth() + 1)}月${pad2(dObj.getDate())}日`;

    $("#homeTodayBox").innerHTML = `
      <p class="today-tag">TODAY</p>
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
      moreBtn.textContent = `還有 ${remain} 個行程`;
    } else {
      moreBtn.classList.add("hidden");
    }
  }

  // ---------- 2. 行程 VIEW (100% 影片 1 00:08–00:09) ----------
  function renderPlanView() {
    const dayData = state.days[currentDay];
    $("#planTimeline").innerHTML = dayData.items
      .map(
        (it, idx) => `
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
            <a class="pill-action" href="${gmapUrl(it.map || it.name)}" target="_blank" rel="noopener">◁ 導航</a>
            <button class="pill-action" data-focuspin="${idx}">📍 加入地圖</button>
            <button class="pill-action" data-editstop="${idx}">✎ 編輯</button>
          </div>
        </div>
      </article>
      ${
        it.transit && idx < dayData.items.length - 1
          ? `<div class="transit-card">
              <div class="transit-left">—</div>
              <div>
                <div class="stop-tags" style="margin-bottom:4px">
                  <span class="chip-area">${esc(it.area)}</span>
                  <span class="chip-cat">車程</span>
                </div>
                <p class="muted-xs" style="color:var(--ink-soft)">${esc(it.transit)}</p>
              </div>
            </div>`
          : ""
      }`
      )
      .join("");

    $("#dailyNoteInput").value = dailyNotes[currentDay] || "";
  }

  $("#dailyNoteInput").addEventListener("input", (e) => {
    dailyNotes[currentDay] = e.target.value;
    saveNotes();
  });
  $("#focusNoteBtn").addEventListener("click", () => $("#dailyNoteInput").focus());

  $("#planTimeline").addEventListener("click", (e) => {
    const focusBtn = e.target.closest("[data-focuspin]");
    if (focusBtn) {
      const idx = +focusBtn.dataset.focuspin;
      switchTab("map");
      setTimeout(() => focusStopOnMap(idx), 160);
      return;
    }
    const editBtn = e.target.closest("[data-editstop]");
    if (editBtn) openStopModal(+editBtn.dataset.editstop);
  });

  $("#addStopFab").addEventListener("click", () => openStopModal(null));

  // ---------- 3. 地圖 VIEW (影片 1 00:10) ----------
  let mapInstance = null;
  let markersLayer = null;
  let currentStopMarkers = [];

  function initMapIfNeeded() {
    if (mapInstance) {
      mapInstance.invalidateSize();
      return;
    }
    mapInstance = L.map("leafletMap", { zoomControl: false }).setView([34.6687, 135.492], 12);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OSM, &copy; OpenStreetMap, &copy; CartoDB",
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
        html: `<div style="width:27px;height:27px;border-radius:50%;background:#281e16;color:#fff;border:2px solid #fbf8f2;display:grid;place-items:center;font-family:'Cormorant Garamond',serif;font-weight:700;font-size:13px;box-shadow:0 3px 8px rgba(0,0,0,0.28)">${idx + 1}</div>`,
        iconSize: [27, 27],
        iconAnchor: [13, 13]
      });
      const m = L.marker([it.lat, it.lng], { icon })
        .bindPopup(`<b>${idx + 1}. ${esc(it.name)}</b><br><small>${esc(it.time)} · ${esc(it.area)}</small>`)
        .addTo(markersLayer);
      currentStopMarkers.push(m);
    });

    // 大正站 Airbnb 民宿基地圖釘
    (state.hotels || []).forEach((h) => {
      if (!h.lat || !h.lng) return;
      const homeIcon = L.divIcon({
        className: "hotel-pin",
        html: `<div style="width:28px;height:28px;border-radius:50%;background:#b54d36;color:#fff;border:2px solid #fbf8f2;display:grid;place-items:center;font-size:13px;box-shadow:0 3px 8px rgba(0,0,0,0.3)">🏠</div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 14]
      });
      L.marker([h.lat, h.lng], { icon: homeIcon })
        .bindPopup(`<b>🏠 住宿：${esc(h.name)}</b><br><small>${esc(h.area)}</small>`)
        .addTo(markersLayer);
    });

    // 備用景點星號圖釘
    state.savedSpots.forEach((sp) => {
      if (!sp.lat || !sp.lng) return;
      const icon = L.divIcon({
        className: "saved-pin",
        html: `<div style="width:23px;height:23px;border-radius:50%;background:#c49648;color:#fff;border:2px solid #fbf8f2;display:grid;place-items:center;font-size:11px;box-shadow:0 2px 6px rgba(0,0,0,0.22)">★</div>`,
        iconSize: [23, 23],
        iconAnchor: [11, 11]
      });
      L.marker([sp.lat, sp.lng], { icon })
        .bindPopup(`<b>★ ${esc(sp.name)}</b><br><small>${esc(sp.area)}</small>`)
        .addTo(markersLayer);
    });

    if (coords.length > 1) {
      L.polyline(coords, { color: "#8c7a67", weight: 2, dashArray: "5 5" }).addTo(markersLayer);
      mapInstance.fitBounds(coords, { padding: [34, 34] });
    } else if (coords.length === 1) {
      mapInstance.setView(coords[0], 14);
    }

    $("#mapPinList").innerHTML = dayData.items
      .map(
        (it, i) => `
      <div class="map-pin-item" data-pinidx="${i}">
        <div>
          <span class="pin-num">${i + 1}</span>
          <strong>${esc(it.name)}</strong>
          <span class="muted-xs"> · ${esc(it.time)}</span>
        </div>
        <a class="pill-action" href="${gmapUrl(it.map || it.name)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">◁ 導航</a>
      </div>`
      )
      .join("");
  }

  function focusStopOnMap(idx) {
    initMapIfNeeded();
    refreshMapMarkers();
    const it = state.days[currentDay].items[idx];
    if (it && it.lat && it.lng && mapInstance) {
      mapInstance.flyTo([it.lat, it.lng], 15, { duration: 0.5 });
      currentStopMarkers[idx]?.openPopup();
    }
  }

  $("#mapPinList").addEventListener("click", (e) => {
    const row = e.target.closest("[data-pinidx]");
    if (row) focusStopOnMap(+row.dataset.pinidx);
  });

  $("#locateMeBtn").addEventListener("click", () => {
    const st = $("#mapYouStat");
    if (!navigator.geolocation) {
      st.textContent = "不支援";
      return;
    }
    st.textContent = "定位中…";
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        st.textContent = "已定位";
        initMapIfNeeded();
        L.circleMarker([latitude, longitude], {
          radius: 7,
          color: "#fbf8f2",
          weight: 2,
          fillColor: "#b54d36",
          fillOpacity: 1
        })
          .addTo(markersLayer)
          .bindPopup("你的目前位置")
          .openPopup();
        mapInstance.flyTo([latitude, longitude], 14);
      },
      () => {
        st.textContent = "未取得";
      }
    );
  });

  // ---------- 4. 記帳 VIEW (影片 1 00:11–00:12) ----------
  function renderWalletView() {
    const rate = parseFloat(state.rate) || 0.215;
    const dObj = getDayDate(currentDay);
    const dStr = `${pad2(dObj.getMonth() + 1)}/${pad2(dObj.getDate())}`;

    $("#walletHeroLabel").textContent = walletMode === "daily" ? `本日支出 ${dStr}` : "累積總支出";
    $("#expenseSubLabel").textContent = walletMode === "daily" ? "Today's Expenses" : "All Expenses";
    $("#convRateNote").textContent = `1 JPY ≈ ${rate} TWD · 更新於 2026/12/9`;

    const filtered = expenses
      .map((e, idx) => ({ ...e, idx }))
      .filter((e) => (walletMode === "daily" ? e.day === currentDay : true));

    const sumJpy = filtered.reduce((s, e) => s + (Number(e.jpy) || 0), 0);
    const sumTwd = Math.round(sumJpy * rate);

    $("#walletTotalTwd").textContent = `NT$ ${sumTwd.toLocaleString()}`;
    $("#walletTotalJpy").textContent = sumJpy > 0 ? `¥ ${Math.round(sumJpy).toLocaleString()} 日圓支出` : "尚無外幣支出";

    if (!filtered.length) {
      $("#expenseListWrap").innerHTML = `<div class="cream-card" style="text-align:center;color:var(--muted);font-size:13.5px">尚未新增支出紀錄</div>`;
      return;
    }

    $("#expenseListWrap").innerHTML = filtered
      .map(
        (e) => `
      <div class="exp-item">
        <div>
          <strong style="font-family:'Noto Serif TC',serif">${esc(e.name)}</strong>
          <div class="muted-xs">Day ${e.day + 1} · ${esc(e.cat)} · ${esc(e.payer || "共同")}${e.split > 1 ? ` (${e.split}人分攤)` : ""}</div>
        </div>
        <div style="text-align:right;display:flex;align-items:center">
          <div>
            <strong class="serif-en" style="font-size:17px">NT$ ${Math.round(e.jpy * rate).toLocaleString()}</strong>
            <div class="muted-xs">¥ ${Math.round(e.jpy).toLocaleString()}</div>
          </div>
          <button type="button" class="exp-del" data-delexp="${e.idx}" aria-label="刪除支出：${esc(e.name)}">刪除</button>
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
    const idx = Number(del.dataset.delexp);
    if (!Number.isInteger(idx) || idx < 0 || idx >= expenses.length) return;
    if (!confirm(`確定刪除「${expenses[idx].name}」這筆支出嗎？`)) return;
    expenses.splice(idx, 1);
    saveExpenses();
    renderWalletView();
  });

  // ---------- 5. 備用景點 VIEW (影片 1 00:13–00:14) ----------
  function renderSavedSpots() {
    const list =
      spotsFilter === "foods"
        ? (state.foods || []).map((f, i) => ({ ...f, _type: "food", _idx: i }))
        : spotsFilter === "highlights"
        ? (state.highlights || []).map((h, i) => ({ ...h, _type: "highlight", _idx: i }))
        : (state.savedSpots || []).map((s, i) => ({ ...s, _type: "saved", _idx: i }));

    $("#savedSpotsList").innerHTML = list
      .map(
        (sp) => `
      <article class="saved-spot-card">
        <h3>${esc(sp.name)}</h3>
        <p class="saved-spot-area">${esc(sp.area || "")}${sp.tag ? ` · ${esc(sp.tag)}` : ""}${sp.warn ? ` · ${esc(sp.warn)}` : ""}</p>
        <p class="saved-spot-desc">${esc(sp.desc)}</p>
        <div class="stop-actions">
          <button class="pill-action" data-addspot="${sp._type}:${sp._idx}">＋ 加入行程</button>
          <a class="pill-action" href="${gmapUrl(sp.map || sp.name)}" target="_blank" rel="noopener">📍 地圖</a>
          ${sp._type === "saved" ? `<button class="pill-action" data-editsaved="${sp._idx}">✎ 編輯</button>` : ""}
        </div>
      </article>`
      )
      .join("");
  }

  $("#spotsFilterRow").addEventListener("click", (e) => {
    const b = e.target.closest("[data-sfilter]");
    if (!b) return;
    spotsFilter = b.dataset.sfilter;
    $$("#spotsFilterRow button").forEach((btn) => btn.classList.toggle("active", btn === b));
    renderSavedSpots();
  });

  // ---------- Open-Meteo 天氣預報抓取 ----------
  const WMO_ICON = (c) => (c === 0 ? "☀️" : c <= 2 ? "⛅" : c === 3 ? "☁️" : c <= 67 ? "🌧️" : "🌦️");
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=34.6937&longitude=135.5023&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FTokyo&forecast_days=6"
  )
    .then((r) => r.json())
    .then((d) => {
      if (d?.daily?.time) cachedWeather = d.daily;
    })
    .catch(() => {});

  // ---------- 彈出視窗 Modals (全米色質感設計) ----------
  const backdrop = $("#modalBackdrop");
  const sheet = $("#modalSheet");
  const closeModal = () => backdrop.classList.add("hidden");
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal();
  });

  // A) 首頁點擊「✈️ 出團資訊 · 樂桃航班 · 大正包棟民宿」展開米色資訊抽屜
  $("#openFlightSheetBtn").addEventListener("click", () => {
    const h = state.hotels[0];
    const target = new Date(`${state.startDate || "2026-12-09"}T${state.departureTime || "09:40"}:00`);
    const diff = target - new Date();
    const cdText =
      diff > 0
        ? `距離出發倒數 ${Math.floor(diff / 86400000)} 天 ${Math.floor((diff % 86400000) / 3600000)} 小時`
        : "關西之旅進行中";

    const weatherHtml = cachedWeather
      ? `<div class="weather-mini-grid">
          ${cachedWeather.time
            .map((t, i) => {
              const dt = new Date(t + "T00:00:00");
              return `<div class="w-mini-box">
                <div class="muted-xs">${dt.getMonth() + 1}/${dt.getDate()}</div>
                <div style="font-size:18px;margin:2px 0">${WMO_ICON(cachedWeather.weathercode[i])}</div>
                <strong>${Math.round(cachedWeather.temperature_2m_min[i])}°–${Math.round(cachedWeather.temperature_2m_max[i]) || 15}°</strong>
              </div>`;
            })
            .join("")}
        </div>`
      : `<p class="muted-xs">12月大阪平均氣溫約 7°C – 14°C，早晚偏涼建議攜帶保暖大衣。</p>`;

    sheet.innerHTML = `
      <div class="card-head-row">
        <h3>✈️ 出團資訊 · 航班與住宿</h3>
        <span class="gold-label">${cdText}</span>
      </div>

      ${(state.flights || [])
        .map(
          (f) => `
        <div class="sheet-subcard">
          <div class="card-head-row" style="margin-bottom:6px">
            <span class="chip-cat">${esc(f.type)}</span>
            <span class="muted-xs">${esc(f.code)}</span>
          </div>
          <p class="serif-en" style="font-size:24px;color:var(--ink)">${esc(f.dep)} → ${esc(f.arr)}</p>
          <p class="muted-xs" style="margin:2px 0 8px">${esc(f.from)} → ${esc(f.to)}</p>
          <p style="font-size:12.5px;color:var(--ink-soft);background:var(--bg);padding:8px 10px;border-radius:10px;border:1px solid var(--border)">${esc(f.remind)}</p>
        </div>`
        )
        .join("")}

      ${
        h
          ? `<div class="sheet-subcard">
              <div class="card-head-row" style="margin-bottom:6px">
                <span class="chip-area">${esc(h.stayLabel)}</span>
                <span class="muted-xs">${esc(h.dates)}</span>
              </div>
              <h4>🏠 ${esc(h.name)}</h4>
              <p class="muted-xs" style="margin-bottom:10px">${esc(h.address)}</p>
              ${h.rooms
                .map(
                  (r) => `
                <div style="font-size:12.5px;padding:6px 0;border-top:1px dashed var(--border)">
                  <strong>${esc(r.unit)}（${esc(r.type)}）</strong>：${esc(r.guests)}
                </div>`
                )
                .join("")}
              <div class="stop-actions" style="margin-top:10px">
                ${h.airbnbUrl ? `<a class="pill-action" href="${esc(h.airbnbUrl)}" target="_blank" rel="noopener">🏠 開啟 Airbnb 房源</a>` : ""}
                <a class="pill-action" href="${gmapUrl(h.map)}" target="_blank" rel="noopener">📍 大正站地圖</a>
              </div>
            </div>`
          : ""
      }

      <div class="sheet-subcard">
        <h4>🌤️ 大阪 6 日即時天氣預報 (Open-Meteo)</h4>
        ${weatherHtml}
      </div>

      <div class="modal-actions">
        <button type="button" class="btn-primary" id="closeSheetBtn">關閉</button>
      </div>
    `;
    backdrop.classList.remove("hidden");
    $("#closeSheetBtn").onclick = closeModal;
  });

  // B) 首頁點擊「Travel Tips 旅遊須知」展開米色須知與行前打包清單
  $("#openTipsSheetBtn").addEventListener("click", () => {
    renderTipsSheet();
    backdrop.classList.remove("hidden");
  });

  function renderTipsSheet() {
    sheet.innerHTML = `
      <h3>📖 旅遊須知 · 行前準備清單</h3>
      ${(state.reminders || [])
        .map(
          (r) => `
        <div class="sheet-subcard">
          <h4>${r.icon} ${esc(r.title)}</h4>
          <ul>${r.items.map((line) => `<li>${esc(line)}</li>`).join("")}</ul>
        </div>`
        )
        .join("")}

      <div class="section-caption-row">
        <h3>行前打包清單</h3>
        <span class="serif-italic muted">Checklist</span>
      </div>
      ${(state.checklist || [])
        .map(
          (g) => `
        <div class="sheet-subcard">
          <h4>${esc(g.cat)}</h4>
          ${g.items
            .map((item) => {
              const done = !!checkedItems[item];
              return `<label class="check-row ${done ? "done" : ""}">
                <input type="checkbox" data-checkitem="${esc(item)}" ${done ? "checked" : ""} />
                <span>${esc(item)}</span>
              </label>`;
            })
            .join("")}
        </div>`
        )
        .join("")}

      <div class="modal-actions">
        <button type="button" class="btn-primary" id="closeTipsBtn">完成並關閉</button>
      </div>
    `;
    $("#closeTipsBtn").onclick = closeModal;
    sheet.querySelectorAll("[data-checkitem]").forEach((cb) =>
      cb.addEventListener("change", () => {
        checkedItems[cb.dataset.checkitem] = cb.checked;
        saveChecked();
        cb.closest(".check-row").classList.toggle("done", cb.checked);
      })
    );
  }

  // C) 新增 / 編輯單日行程 Modal
  function openStopModal(idx) {
    const isEdit = idx !== null && idx !== undefined;
    const item = isEdit
      ? state.days[currentDay].items[idx]
      : { time: "14:00", duration: "1.5 小時", name: "", area: state.days[currentDay].shortCity, cat: "景點", desc: "", transit: "🚇 地鐵約 15 分鐘", map: "" };

    sheet.innerHTML = `
      <h3>${isEdit ? "✎ 編輯行程" : `＋ 新增 Day ${currentDay + 1} 行程`}</h3>
      <form id="stopForm" class="form-grid">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>時間<input name="time" value="${esc(item.time)}" placeholder="09:30" required /></label>
          <label>停留時間<input name="duration" value="${esc(item.duration || "")}" placeholder="1.5 小時" /></label>
        </div>
        <label>地點名稱<input name="name" value="${esc(item.name)}" placeholder="例如：比薩斜塔 / 清水寺" required /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>區域標籤<input name="area" value="${esc(item.area)}" placeholder="難波 / 梅田" /></label>
          <label>類別標籤
            <select name="cat">
              ${["景點", "美食", "購物", "交通", "住宿"].map((c) => `<option ${item.cat === c ? "selected" : ""}>${c}</option>`).join("")}
            </select>
          </label>
        </div>
        <label>行程備註<textarea name="desc" rows="3">${esc(item.desc)}</textarea></label>
        <label>前往下一站車程提示<input name="transit" value="${esc(item.transit || "")}" placeholder="車程或地鐵時間…" /></label>
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
        renderHomeView();
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
      renderHomeView();
      closeModal();
    };
  }

  // D) 備用景點「＋ 加入行程」與「✎ 編輯」
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
          <label>選擇加入哪一天
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
          lng: src.lng
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

  function openSavedModal(idx) {
    const isEdit = idx !== null && idx !== undefined;
    const sp = isEdit ? state.savedSpots[idx] : { name: "", area: "大阪 · Osaka", desc: "", map: "" };
    sheet.innerHTML = `
      <h3>${isEdit ? "✎ 編輯備用景點" : "＋ 新增備用景點"}</h3>
      <form id="savedForm" class="form-grid">
        <label>景點或店名<input name="name" value="${esc(sp.name)}" placeholder="例如：HARBS 心齋橋店" required /></label>
        <label>城市與區域<input name="area" value="${esc(sp.area)}" placeholder="心齋橋 · Osaka" /></label>
        <label>備註說明<textarea name="desc" rows="3">${esc(sp.desc)}</textarea></label>
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
      spotsFilter = "saved";
      $$("#spotsFilterRow button").forEach((b) => b.classList.toggle("active", b.dataset.sfilter === "saved"));
      renderSavedSpots();
      closeModal();
    };
  }
  $("#addSavedFab").addEventListener("click", () => openSavedModal(null));

  // E) 新增支出 Modal
  $("#openExpenseModalBtn").addEventListener("click", () => {
    sheet.innerHTML = `
      <h3>＋ 新增支出</h3>
      <form id="expModalForm" class="form-grid">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>日期
            <select name="day">
              ${state.days.map((_, i) => `<option value="${i}" ${i === currentDay ? "selected" : ""}>Day ${i + 1}</option>`).join("")}
            </select>
          </label>
          <label>類別
            <select name="cat">
              <option>餐飲</option><option>購物</option><option>交通</option><option>門票</option><option>住宿</option><option>其他</option>
            </select>
          </label>
        </div>
        <label>項目名稱<input name="name" placeholder="例如：章魚燒、藥妝" required /></label>
        <label>日圓金額 (JPY ¥)<input type="number" name="jpy" placeholder="3500" inputmode="decimal" required /></label>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
          <label>付款人<input name="payer" value="我" /></label>
          <label>分攤人數<input type="number" name="split" value="1" min="1" /></label>
        </div>
        <div class="modal-actions">
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存支出</button>
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

  // F) 右上角 ⚙️ 設定 Modal
  $("#openSettingsBtn").addEventListener("click", () => {
    sheet.innerHTML = `
      <h3>⚙️ 行程設定</h3>
      <form id="settingsForm" class="form-grid">
        <label>出發日期 (Day 1)<input type="date" name="startDate" value="${esc(state.startDate)}" required /></label>
        <label>匯率設定 (1 JPY = ? TWD)<input type="number" step="0.001" name="rate" value="${esc(state.rate)}" required /></label>
        <div class="modal-actions">
          <button type="button" class="btn-danger" id="resetAllBtn">重設預設資料</button>
          <button type="button" class="btn-secondary" id="cancelModalBtn">取消</button>
          <button type="submit" class="btn-primary">儲存</button>
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
      state.startDate = fd.get("startDate") || "2026-12-09";
      state.rate = parseFloat(fd.get("rate")) || 0.215;
      saveState();
      renderDateHeader();
      renderHomeView();
      renderPlanView();
      renderWalletView();
      closeModal();
    };
  });

  // ---------- 初始化 ----------
  renderDateHeader();
  renderHomeView();
  renderPlanView();
  renderWalletView();
  renderSavedSpots();
})();
