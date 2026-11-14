// 行程資料：可直接修改此檔案自訂行程
const TRIP = {
  title: "大阪 6 天 5 夜",
  subtitle: "OSAKA · KYOTO · NARA",
  defaultStart: "2026-12-10",
  hotel: { name: "難波站周邊飯店", address: "大阪市中央区難波", map: "Namba Station Osaka" },
  days: [
    {
      title: "抵達大阪・道頓堀初體驗",
      area: "難波 / 心齋橋",
      emoji: "✈️",
      color: "#ff6b6b",
      items: [
        { time: "10:30", icon: "✈️", name: "抵達關西國際機場 (KIX)", desc: "入境、領行李，到 B1 換 ICOCA、領取 JR Pass / 周遊卡", map: "Kansai International Airport" },
        { time: "12:00", icon: "🚆", name: "南海電鐵 Rapi:t → 難波", desc: "約 40 分鐘，¥1,490（特急指定席）", tip: "也可搭一般急行 ¥970，約 45 分" },
        { time: "13:30", icon: "🏨", name: "飯店寄放行李 / Check-in", desc: "難波站周邊，交通最方便", map: "Namba Station Osaka" },
        { time: "14:30", icon: "🛍️", name: "心齋橋筋商店街", desc: "藥妝、服飾一次逛足，大丸、PARCO 也在附近", map: "Shinsaibashi-suji Shopping Street" },
        { time: "17:00", icon: "🏮", name: "法善寺橫丁", desc: "石板小巷與長滿青苔的水掛不動尊", map: "Hozenji Yokocho" },
        { time: "18:00", icon: "🦀", name: "道頓堀 美食巡禮", desc: "固力果跑跑人看板、章魚燒、大阪燒、金龍拉麵", food: true, map: "Dotonbori Glico Sign", tip: "推薦：蟹道樂本店、美津の大阪燒、くくる章魚燒" },
        { time: "20:00", icon: "🚢", name: "道頓堀 Tombori River Cruise", desc: "20 分鐘遊船看夜景，¥1,500", map: "Tombori River Cruise" }
      ]
    },
    {
      title: "日本環球影城 一日暢玩",
      area: "USJ",
      emoji: "🎢",
      color: "#4dabf7",
      items: [
        { time: "07:30", icon: "🚆", name: "出發前往 USJ", desc: "難波 → 西九條轉 JR 夢咲線 → 環球城站，約 25 分", tip: "建議開園前 1 小時到達排隊" },
        { time: "08:30", icon: "🍄", name: "超級任天堂世界", desc: "瑪利歐賽車、耀西冒險，需整理券或快速通關", map: "Super Nintendo World" },
        { time: "11:30", icon: "🧙", name: "哈利波特魔法世界", desc: "禁忌之旅、奶油啤酒、霍格華茲城堡", map: "The Wizarding World of Harry Potter Osaka" },
        { time: "13:00", icon: "🍔", name: "園區午餐", desc: "三根掃帚 / 奇諾比奧咖啡店", food: true },
        { time: "14:00", icon: "🦖", name: "侏羅紀公園・飛天翼龍", desc: "全球最長的飛行式雲霄飛車" },
        { time: "16:00", icon: "🍌", name: "小小兵樂園", desc: "小小兵瘋狂乘車遊、超可愛周邊" },
        { time: "19:00", icon: "🎆", name: "夜間遊行 / 城堡投影秀", desc: "依當季活動而定" },
        { time: "21:00", icon: "🍜", name: "環球城市大道晚餐後返回飯店", food: true, map: "Universal CityWalk Osaka" }
      ]
    },
    {
      title: "大阪城・黑門市場・梅田",
      area: "大阪市區",
      emoji: "🏯",
      color: "#ffa94d",
      items: [
        { time: "09:00", icon: "🏯", name: "大阪城公園・天守閣", desc: "登上天守閣 8 樓展望台，¥600", map: "Osaka Castle" },
        { time: "10:30", icon: "⛵", name: "大阪城御座船", desc: "乘船繞行護城河 20 分鐘", map: "Osaka Castle Gozabune" },
        { time: "12:00", icon: "🍣", name: "黑門市場 午餐", desc: "「大阪的廚房」：海膽、和牛串、生蠔、鮪魚", food: true, map: "Kuromon Market" },
        { time: "14:00", icon: "🏬", name: "日本橋 Den Den Town", desc: "動漫、模型、電器街", map: "Den Den Town Osaka" },
        { time: "16:00", icon: "🎡", name: "梅田 HEP FIVE 摩天輪", desc: "紅色摩天輪，¥600", map: "HEP FIVE" },
        { time: "17:30", icon: "🌇", name: "梅田藍天大廈 空中庭園", desc: "看夕陽與夜景的絕佳地點，¥2,000", map: "Umeda Sky Building" },
        { time: "19:30", icon: "🍢", name: "梅田晚餐", desc: "新梅田食道街、燒肉、串炸", food: true, map: "Shin-Umeda Shokudogai" }
      ]
    },
    {
      title: "京都古都一日遊",
      area: "京都",
      emoji: "⛩️",
      color: "#e64980",
      items: [
        { time: "08:00", icon: "🚆", name: "前往京都", desc: "京阪電車 淀屋橋 → 伏見稻荷，約 50 分", tip: "使用 ICOCA 或京阪一日券" },
        { time: "09:00", icon: "⛩️", name: "伏見稻荷大社", desc: "千本鳥居，建議走到四ツ辻展望", map: "Fushimi Inari Taisha" },
        { time: "11:30", icon: "🏯", name: "清水寺", desc: "清水舞台、音羽之瀧，¥500", map: "Kiyomizu-dera" },
        { time: "12:30", icon: "🍵", name: "二年坂・三年坂 午餐", desc: "湯豆腐、抹茶甜點、% Arabica 咖啡", food: true, map: "Sannenzaka" },
        { time: "14:30", icon: "🌸", name: "八坂神社・祇園花見小路", desc: "有機會遇見藝妓", map: "Hanamikoji Street" },
        { time: "16:30", icon: "🐟", name: "錦市場", desc: "京都的廚房，邊走邊吃", food: true, map: "Nishiki Market" },
        { time: "18:30", icon: "🍲", name: "鴨川・先斗町 晚餐", desc: "沿河散步，先斗町料亭", food: true, map: "Pontocho" },
        { time: "20:30", icon: "🚆", name: "阪急電車 河原町 → 大阪梅田", desc: "約 45 分，¥410" }
      ]
    },
    {
      title: "奈良小鹿・新世界通天閣",
      area: "奈良 / 新世界",
      emoji: "🦌",
      color: "#51cf66",
      items: [
        { time: "08:30", icon: "🚆", name: "近鐵 大阪難波 → 近鐵奈良", desc: "快速急行約 40 分，¥680" },
        { time: "09:30", icon: "🦌", name: "奈良公園 餵鹿", desc: "鹿仙貝 ¥200，鞠躬鹿會回禮", map: "Nara Park", tip: "注意隨身物品，鹿會咬紙類" },
        { time: "10:30", icon: "🛕", name: "東大寺", desc: "世界最大木造建築、奈良大佛，¥800", map: "Todai-ji" },
        { time: "12:00", icon: "🍡", name: "中谷堂 麻糬 & 午餐", desc: "高速搗麻糬表演、柿葉壽司", food: true, map: "Nakatanidou" },
        { time: "13:30", icon: "🏮", name: "春日大社", desc: "三千座石燈籠", map: "Kasuga Taisha" },
        { time: "16:00", icon: "🏙️", name: "阿倍野 HARUKAS 300", desc: "日本最高大樓展望台", map: "Abeno Harukas" },
        { time: "18:00", icon: "🗼", name: "新世界・通天閣", desc: "摸比利肯的腳底祈求好運", map: "Tsutenkaku" },
        { time: "19:00", icon: "🍢", name: "串炸晚餐", desc: "「醬汁禁止沾兩次！」推薦八重勝、だるま", food: true, map: "Kushikatsu Daruma Shinsekai" }
      ]
    },
    {
      title: "Outlet 血拼・賦歸",
      area: "臨空城 / 關西機場",
      emoji: "🛫",
      color: "#845ef7",
      items: [
        { time: "09:00", icon: "🧳", name: "飯店 Check-out", desc: "確認護照、退稅商品、充電器" },
        { time: "09:30", icon: "🍙", name: "早午餐・最後採買", desc: "難波 / 高島屋地下美食街伴手禮", food: true, map: "Takashimaya Osaka" },
        { time: "11:00", icon: "🚆", name: "南海電鐵 → 臨空城", desc: "約 35 分" },
        { time: "11:45", icon: "🛍️", name: "臨空城 Premium Outlets", desc: "近 250 間品牌，可寄放行李", map: "Rinku Premium Outlets" },
        { time: "15:30", icon: "🚆", name: "前往關西機場", desc: "臨空城 → 關西機場 1 站，約 5 分" },
        { time: "16:00", icon: "✈️", name: "機場報到・免稅店", desc: "建議起飛前 2.5 小時抵達", map: "Kansai International Airport" },
        { time: "18:30", icon: "🏠", name: "搭機返家", desc: "旅途愉快，下次見！" }
      ]
    }
  ],
  checklist: [
    { cat: "證件", items: ["護照（效期 6 個月以上）", "機票 / 電子登機證", "Visit Japan Web QR Code", "日幣現金", "信用卡", "旅遊保險"] },
    { cat: "交通票券", items: ["ICOCA 交通卡", "USJ 門票 + 快速通關", "Rapi:t 車票", "大阪周遊卡（選購）"] },
    { cat: "電子產品", items: ["手機 + 充電線", "行動電源（隨身攜帶）", "網卡 / eSIM / Wi-Fi 機", "轉接頭（日本為 A 型 100V）"] },
    { cat: "衣物用品", items: ["好走的鞋子", "保暖外套", "換洗衣物", "常備藥品", "盥洗用品", "購物袋 / 摺疊包"] }
  ],
  info: [
    { icon: "🚨", title: "緊急電話", lines: ["警察：110", "救護車 / 消防：119", "台北駐大阪經濟文化辦事處：+81-6-6227-8623", "急難救助：+81-90-8794-4568"] },
    { icon: "🚆", title: "交通小提醒", lines: ["大阪手扶梯靠右站，左側通行", "ICOCA 可搭乘關西地區所有電車與公車，也可在便利商店付款", "末班車約 23:30～24:00"] },
    { icon: "💴", title: "金錢與退稅", lines: ["單店同日消費滿 ¥5,000（未稅）可退稅", "退稅需出示護照正本", "部分小店與神社只收現金"] },
    { icon: "🍽️", title: "用餐禮儀", lines: ["日本無小費文化", "串炸醬汁禁止沾兩次", "邊走邊吃請留意店家規定"] },
    { icon: "🌐", title: "實用日語", lines: ["すみません（不好意思）", "ありがとうございます（謝謝）", "これをください（請給我這個）", "トイレはどこですか（廁所在哪裡）"] }
  ]
};

