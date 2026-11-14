// 大阪 6 天 5 夜行程書 — 完整預設資料（以大正站 Airbnb 三層獨棟民宿為基地）
const TRIP_DEFAULT = {
  eyebrow: "Kansai Tabi · 關西之旅",
  title: "Osaka 遊記",
  heroTitle: "Osaka Kansai Trip",
  startDate: "2026-12-10",
  departureTime: "08:30",
  badges: ["🏠 大正站包棟民宿", "🌈 6天5夜", "🏯 大阪・京都・奈良"],
  rate: 0.215,

  flights: [
    {
      type: "去程航班",
      code: "JX820 星宇航空",
      from: "台北桃園 TPE (T1)",
      to: "大阪關西 KIX (T1)",
      dep: "08:30",
      arr: "12:05",
      remind: "06:00 前抵達機場（起飛前 2.5 小時）"
    },
    {
      type: "回程航班",
      code: "JX823 星宇航空",
      from: "大阪關西 KIX (T1)",
      to: "台北桃園 TPE (T1)",
      dep: "18:30",
      arr: "20:45",
      remind: "16:00 前抵達關西機場辦理報到與退稅確認"
    }
  ],

  hotels: [
    {
      stayLabel: "全程 5 晚 · 包棟民宿",
      dates: "Day 1 – Day 5",
      name: "大正車站 4 分・陽光充足 3 層樓獨棟民宿",
      area: "大阪市大正區（近京瓷巨蛋）",
      address: "大阪府大阪市大正區（JR 大阪環狀線／地鐵長堀鶴見綠地線「大正站」步行 4 分鐘、京瓷巨蛋步行 8 分鐘）",
      map: "Taisho Station Osaka",
      airbnbUrl: "https://www.airbnb.com.tw/rooms/1372891258852120566",
      lat: 34.6656,
      lng: 135.4793,
      img: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80",
      checkIn: "自助入住 · 整棟 3 層樓獨立空間（含客廳・廚房・衛浴）",
      rooms: [
        { unit: "1F 公共空間", type: "客廳・餐廳・廚房・衛浴", guests: "全體旅伴共用", note: "周邊步行即有超商、超市、藥妝店與大正站前居酒屋街" },
        { unit: "2F 臥室區", type: "主臥室（陽光充足）", guests: "點擊右上「編輯住宿」可填寫分房名單", note: "獨立樓層空間、附空調與收納" },
        { unit: "3F 臥室區", type: "次臥室", guests: "點擊右上「編輯住宿」可填寫分房名單", note: "三五好友或家庭包棟私密不打擾" }
      ]
    }
  ],

  days: [
    {
      city: "Osaka · 大正・心齋橋・道頓堀",
      shortCity: "大正・道頓堀",
      title: "抵達關西・入住民宿・心齋橋與道頓堀夜未眠",
      center: [34.6687, 135.4920],
      items: [
        {
          id: "d1-1", time: "12:05", duration: "1 小時",
          name: "抵達關西國際機場 (KIX)", area: "關西機場", cat: "交通",
          desc: "入境審查、提領行李，出示 Visit Japan Web QR Code。B1 購買或綁定 ICOCA，搭乘 JR 關空快速免轉車直達「大正站」。",
          map: "Kansai International Airport", lat: 34.4320, lng: 135.2304,
          transit: "🚆 JR 關空快速 直達「大正站」約 60 分鐘（或南海電鐵至新今宮轉 JR 1 站）"
        },
        {
          id: "d1-2", time: "13:30", duration: "45 分鐘",
          name: "大正站 Airbnb 獨棟民宿放行李", area: "大正區", cat: "住宿",
          desc: "從大正站步行約 4 分鐘抵達 3 層樓包棟民宿，放置行李、熟悉環境並稍作休息。",
          map: "Taisho Station Osaka", lat: 34.6656, lng: 135.4793,
          transit: "🚇 地鐵長堀鶴見綠地線 大正 → 心齋橋 直達僅 6 分鐘"
        },
        {
          id: "d1-3", time: "14:30", duration: "2 小時",
          name: "心齋橋筋商店街 & PARCO", area: "心齋橋", cat: "購物",
          desc: "約 600 公尺拱廊商店街，藥妝、服飾一次逛齊；心齋橋 PARCO 6F 有吉卜力共和國、寶可夢中心與 Chiikawa 專賣店。",
          map: "Shinsaibashi PARCO", lat: 34.6723, lng: 135.5011,
          transit: "🚶 沿商店街往南步行約 6 分鐘"
        },
        {
          id: "d1-4", time: "17:00", duration: "45 分鐘",
          name: "法善寺橫丁・水掛不動尊", area: "難波", cat: "景點",
          desc: "鬧中取靜的石板小巷，向長滿翠綠青苔的不動明王潑水祈福，旁邊就是名店「夫婦善哉」紅豆湯。",
          map: "Hozenji Yokocho", lat: 34.6678, lng: 135.5027,
          transit: "🚶 步行約 4 分鐘"
        },
        {
          id: "d1-5", time: "18:00", duration: "2 小時",
          name: "道頓堀美食巡禮・固力果跑跑人", area: "道頓堀", cat: "美食",
          desc: "必拍戎橋固力果看板！晚餐推薦：美津の大阪燒、本家章魚燒、蟹道樂本店或一蘭拉麵道頓堀店別館。",
          map: "Dotonbori Glico Sign", lat: 34.6687, lng: 135.5013,
          transit: "🚶 步行約 2 分鐘至乘船處"
        },
        {
          id: "d1-6", time: "20:00", duration: "45 分鐘",
          name: "道頓堀水上觀光船 & 返回大正民宿", area: "道頓堀 → 大正", cat: "景點",
          desc: "搭 20 分鐘觀光船賞道頓堀霓虹夜景，回程搭地鐵或在大正站旁的 AEON Mall Osaka Dome City 超市買宵夜水果回民宿享用。",
          map: "Tombori River Cruise", lat: 34.6690, lng: 135.5030
        }
      ]
    },
    {
      city: "USJ · 日本環球影城",
      shortCity: "環球影城",
      title: "日本環球影城 USJ 夢幻一日暢玩（大正出發超近！）",
      center: [34.6654, 135.4323],
      items: [
        {
          id: "d2-1", time: "07:20", duration: "20 分鐘",
          name: "從大正民宿出發前往 USJ", area: "大正 → 環球城", cat: "交通",
          desc: "住大正站去 USJ 超級快！從「JR 大正站」搭大阪環狀線 2 站到「西九條站」，轉乘 JR 夢咲線至「環球城站」，車程僅約 12 分鐘。",
          map: "Universal City Station", lat: 34.6679, lng: 135.4383,
          transit: "🚶 出站步行 5 分鐘入園"
        },
        {
          id: "d2-2", time: "08:30", duration: "3 小時",
          name: "超級任天堂世界 Super Nintendo World", area: "USJ", cat: "景點",
          desc: "入園立即用 USJ App 抽整理券或憑 Express 入場！必玩：瑪利歐賽車～庫巴的挑戰書、咚奇剛的瘋狂礦車、戴能量手環敲磚塊。",
          map: "Super Nintendo World Osaka", lat: 34.6656, lng: 135.4306,
          transit: "🚶 園區移動 8 分鐘"
        },
        {
          id: "d2-3", time: "12:00", duration: "1.5 小時",
          name: "奇諾比奧咖啡店 / 三根掃帚午餐", area: "USJ", cat: "美食",
          desc: "奇諾比奧咖啡店需掃描店門 QR 預約時段；或前往哈利波特園區「三根掃帚」享用烤雞排與奶油啤酒。",
          map: "Kinopio's Cafe USJ", lat: 34.6658, lng: 135.4309,
          transit: "🚶 園區移動 5 分鐘"
        },
        {
          id: "d2-4", time: "13:30", duration: "2.5 小時",
          name: "哈利波特魔法世界", area: "USJ", cat: "景點",
          desc: "霍格華茲城堡「哈利波特禁忌之旅」、鷹馬的飛行，活米村挑魔杖互動施法。",
          map: "The Wizarding World of Harry Potter Osaka", lat: 34.6649, lng: 135.4308,
          transit: "🚶 園區移動 6 分鐘"
        },
        {
          id: "d2-5", time: "16:00", duration: "2.5 小時",
          name: "小小兵樂園 & 侏羅紀公園飛天翼龍", area: "USJ", cat: "景點",
          desc: "小小兵瘋狂乘車遊、購買造型爆米花桶；刺激派必搭「飛天翼龍」與「好萊塢美夢乘車遊」。",
          map: "Minion Park USJ", lat: 34.6644, lng: 135.4343,
          transit: "🚶 出園步行 5 分鐘"
        },
        {
          id: "d2-6", time: "20:00", duration: "1.5 小時",
          name: "Universal CityWalk 晚餐 & 12分鐘返抵大正", area: "環球城市大道", cat: "美食",
          desc: "園區外大道有大阪章魚燒博物館、Shake Shack、Red Lobster，吃飽搭 JR 僅 12 分鐘即回到大正站民宿！",
          map: "Universal CityWalk Osaka", lat: 34.6673, lng: 135.4375
        }
      ]
    },
    {
      city: "Osaka · 大阪城與梅田",
      shortCity: "大阪城・梅田",
      title: "歷史名城・黑門市場海鮮・梅田藍天大廈絕景",
      center: [34.6873, 135.5100],
      items: [
        {
          id: "d3-1", time: "09:00", duration: "2 小時",
          name: "大阪城公園・天守閣 & 御座船", area: "大阪城", cat: "景點",
          desc: "從大正站搭地鐵長堀鶴見綠地線免轉車 16 分鐘直達「森之宮站」！登天守閣 8 樓展望台（¥600），搭金箔御座船繞行內護城河。",
          map: "Osaka Castle", lat: 34.6873, lng: 135.5262,
          transit: "🚇 地鐵長堀鶴見綠地線轉堺筋線 約 15 分鐘"
        },
        {
          id: "d3-2", time: "11:30", duration: "1.5 小時",
          name: "黑門市場 海鮮早午餐", area: "日本橋", cat: "美食",
          desc: "「大阪的廚房」：黑門三平生魚片、現烤帝王蟹腳、海膽干貝、神戶牛串燒、高橋豆漿。",
          map: "Kuromon Market", lat: 34.6654, lng: 135.5067,
          transit: "🚶 步行約 7 分鐘"
        },
        {
          id: "d3-3", time: "13:30", duration: "1.5 小時",
          name: "日本橋電電城 (Den Den Town)", area: "日本橋", cat: "購物",
          desc: "關西秋葉原！Animate、駿河屋、Super Kids Land 模型、公仔扭蛋巡禮。",
          map: "Den Den Town Osaka", lat: 34.6595, lng: 135.5056,
          transit: "🚇 地鐵御堂筋線 難波 → 梅田 約 9 分鐘"
        },
        {
          id: "d3-4", time: "15:30", duration: "1.5 小時",
          name: "梅田商圈・HEP FIVE 紅色摩天輪", area: "梅田", cat: "景點",
          desc: "逛 LUCUA、大丸梅田、GRAND FRONT OSAKA，搭乘 HEP FIVE 頂樓紅色摩天輪（¥600）。",
          map: "HEP FIVE", lat: 34.7039, lng: 135.5003,
          transit: "🚶 經 GRAND GREEN OSAKA 步行 12 分鐘"
        },
        {
          id: "d3-5", time: "17:30", duration: "1.5 小時",
          name: "梅田藍天大廈 空中庭園展望台", area: "梅田", cat: "景點",
          desc: "40 樓 360 度露天展望台，一次飽覽黃昏夕陽、淀川與百萬璀璨夜景（¥2,000）。",
          map: "Umeda Sky Building", lat: 34.7055, lng: 135.4896,
          transit: "🚶 步行 10 分鐘回 JR 大阪站"
        },
        {
          id: "d3-6", time: "19:30", duration: "1.5 小時",
          name: "梅田晚餐 & JR 環狀線直達大正站", area: "梅田 → 大正", cat: "美食",
          desc: "享用和牛燒肉或利久牛舌，餐後從「JR 大阪站」搭大阪環狀線免轉車 11 分鐘直達「大正站」回民宿！",
          map: "LUCUA Osaka", lat: 34.7031, lng: 135.4959
        }
      ]
    },
    {
      city: "Kyoto · 京都古都",
      shortCity: "京都",
      title: "千本鳥居・清水舞台・祇園花見小路",
      center: [34.9949, 135.7850],
      items: [
        {
          id: "d4-1", time: "08:00", duration: "1 小時",
          name: "大正出發前往京都伏見", area: "大正 → 伏見稻荷", cat: "交通",
          desc: "從大正搭 JR 環狀線至「京橋站」轉乘京阪本線特急（至丹波橋轉準急）直達「伏見稻荷站」，轉乘超順暢！",
          map: "Fushimi-Inari Station", lat: 34.9669, lng: 135.7706,
          transit: "🚶 步行 5 分鐘"
        },
        {
          id: "d4-2", time: "09:00", duration: "1.5 小時",
          name: "伏見稻荷大社・千本鳥居", area: "京都伏見", cat: "景點",
          desc: "朱紅色千本鳥居隧道，體力許可推薦走到「四ツ辻」俯瞰京都市景，買狐狸繪馬祈福。",
          map: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727,
          transit: "🚆 京阪電車 伏見稻荷 → 清水五條 約 8 分鐘"
        },
        {
          id: "d4-3", time: "11:00", duration: "1.5 小時",
          name: "清水寺・清水舞台 & 音羽之瀧", area: "京都東山", cat: "景點",
          desc: "世界文化遺產，不用一根釘子的懸空木造舞台（門票 ¥500）。可提前預約穿和服漫步。",
          map: "Kiyomizu-dera", lat: 34.9949, lng: 135.7850,
          transit: "🚶 順坡而下即達"
        },
        {
          id: "d4-4", time: "12:30", duration: "1.5 小時",
          name: "三年坂・二年坂 町家午餐", area: "京都東山", cat: "美食",
          desc: "京都古街散策：奧丹湯豆腐、阿古屋茶屋茶泡飯、藤菜美醬油團子、% Arabica 京都東山店。",
          map: "Sannenzaka Kyoto", lat: 34.9974, lng: 135.7809,
          transit: "🚶 經寧寧之道步行 10 分鐘"
        },
        {
          id: "d4-5", time: "14:30", duration: "1.5 小時",
          name: "八坂神社 & 祇園花見小路", area: "京都祇園", cat: "景點",
          desc: "參拜八坂神社美御前社，漫步花見小路與白川巽橋感受藝妓茶屋風情（注意私人小巷禁止攝影）。",
          map: "Yasaka Shrine", lat: 35.0037, lng: 135.7785,
          transit: "🚶 跨過四條大橋步行 10 分鐘"
        },
        {
          id: "d4-6", time: "16:30", duration: "1.5 小時",
          name: "錦市場 & 新京極商店街", area: "四條河原町", cat: "美食",
          desc: "三木雞卵玉子燒、富美家烏龍麵、史努比茶屋、抹茶甜點伴手禮（店家約 17:30 陸續打烊）。",
          map: "Nishiki Market", lat: 35.0050, lng: 135.7649,
          transit: "🚶 步行 6 分鐘至鴨川畔"
        },
        {
          id: "d4-7", time: "18:30", duration: "2 小時",
          name: "先斗町・鴨川晚餐 & 返抵大阪大正", area: "河原町 → 大正", cat: "美食",
          desc: "在鴨川旁的先斗町石板巷弄享用京料理，餐後搭京阪電車至京橋（或阪急至梅田）轉 JR 環狀線回大正民宿。",
          map: "Pontocho Alley", lat: 35.0052, lng: 135.7710
        }
      ]
    },
    {
      city: "Nara · 奈良與新世界",
      shortCity: "奈良・新世界",
      title: "奈良小鹿餵食・東大寺・通天閣串炸",
      center: [34.6851, 135.8430],
      items: [
        {
          id: "d5-1", time: "08:30", duration: "45 分鐘",
          name: "大正出發 → 近鐵奈良", area: "大正 → 奈良", cat: "交通",
          desc: "從大正搭地鐵或 JR 至難波/鶴橋，轉乘「近鐵奈良線快速急行」直達近鐵奈良站（或從大正搭 JR 大和路線直達 JR 奈良）。",
          map: "Kintetsu-Nara Station", lat: 34.6842, lng: 135.8276,
          transit: "🚶 沿東向商店街步行 8 分鐘"
        },
        {
          id: "d5-2", time: "09:30", duration: "1.5 小時",
          name: "奈良公園 與小鹿互動", area: "奈良", cat: "景點",
          desc: "買鹿仙貝（¥200）餵食野生梅花鹿，向小鹿敬禮牠們也會點頭回禮！請收好紙鈔與地圖。",
          map: "Nara Park", lat: 34.6850, lng: 135.8430,
          transit: "🚶 步行 6 分鐘"
        },
        {
          id: "d5-3", time: "11:00", duration: "1.5 小時",
          name: "東大寺・大佛殿 & 春日大社", area: "奈良", cat: "景點",
          desc: "世界最大木造建築東大寺參拜 15 公尺高盧舍那大佛（¥800），鑽大佛鼻孔柱祈求平安；順遊春日大社萬燈籠。",
          map: "Todai-ji", lat: 34.6890, lng: 135.8399,
          transit: "🚶 步行 12 分鐘回商店街"
        },
        {
          id: "d5-4", time: "12:45", duration: "1.5 小時",
          name: "中谷堂高速搗麻糬 & 釜飯志津香午餐", area: "奈良三條通", cat: "美食",
          desc: "必吃中谷堂剛出爐熱騰騰的艾草紅豆麻糬，午餐享用奈良名物「平宗柿葉壽司」或「志津香釜飯」。",
          map: "Nakatanidou Nara", lat: 34.6822, lng: 135.8287,
          transit: "🚆 奈良 → 天王寺（阿倍野）約 35 分鐘"
        },
        {
          id: "d5-5", time: "16:00", duration: "1.5 小時",
          name: "阿倍野 HARUKAS 300 展望台", area: "天王寺", cat: "景點",
          desc: "300 公尺高玻璃帷幕觀景台，天氣晴朗可遠眺明石海峽大橋與京瓷巨蛋方向（¥2,000）。",
          map: "Abeno Harukas", lat: 34.6463, lng: 135.5135,
          transit: "🚶 穿越天王寺公園步行 12 分鐘"
        },
        {
          id: "d5-6", time: "18:00", duration: "2 小時",
          name: "新世界・通天閣 & 元祖串炸晚餐", area: "新世界 → 大正", cat: "美食",
          desc: "昭和復古霓虹街區拍照！晚餐吃「八重勝」或「串炸達摩 (だるま)」，餐後從 JR 新今宮站搭環狀線 2 站（4 分鐘）就回到大正站民宿！",
          map: "Tsutenkaku", lat: 34.6525, lng: 135.5063
        }
      ]
    },
    {
      city: "Rinku · 臨空城與返台",
      shortCity: "臨空城・機場",
      title: "難波八阪神社・臨空城 Outlet 血拼・平安返台",
      center: [34.4066, 135.2943],
      items: [
        {
          id: "d6-1", time: "09:00", duration: "1.5 小時",
          name: "難波八阪神社（獅子殿）& 京瓷巨蛋周邊散步", area: "難波 / 大正", cat: "景點",
          desc: "參拜 12 公尺巨型獅子頭舞台吸走厄運、招來勝運；或就近逛民宿步行 8 分鐘的京瓷巨蛋與 TUGBOAT TAISHO 河畔美食廣場。",
          map: "Namba Yasaka Shrine", lat: 34.6614, lng: 135.4966,
          transit: "🚶 返回大正民宿整理行李退房"
        },
        {
          id: "d6-2", time: "10:45", duration: "50 分鐘",
          name: "民宿退房・JR 大正站直達臨空城", area: "大正 → 臨空城", cat: "交通",
          desc: "檢查 1F～3F 各樓層插座、護照與退稅品。從「JR 大正站」搭乘 JR 關空快速免轉車直達「臨空城站」（約 52 分鐘）。",
          map: "Rinku-Town Station", lat: 34.4109, lng: 135.2994,
          transit: "🚶 步行 6 分鐘"
        },
        {
          id: "d6-3", time: "11:45", duration: "3.5 小時",
          name: "臨空城 Rinku Premium Outlets", area: "臨空城", cat: "購物",
          desc: "西日本最大海景 Outlet，超過 250 個品牌！先到服務中心領外國旅客優惠券並寄放行李，海濱區還可拍關西機場跨海大橋。",
          map: "Rinku Premium Outlets", lat: 34.4066, lng: 135.2943,
          transit: "🚆 臨空城 → 關西機場 僅 1 站 5 分鐘"
        },
        {
          id: "d6-4", time: "15:45", duration: "2.5 小時",
          name: "抵達關西國際機場・報到與免稅店", area: "關西機場", cat: "購物",
          desc: "辦理退稅確認、託運行李，入關後逛全新改裝 KIX 國際線免稅店（白色戀人、ROYCE、清酒）。",
          map: "Kansai International Airport", lat: 34.4320, lng: 135.2304,
          transit: "✈️ 登機準備"
        },
        {
          id: "d6-5", time: "18:30", duration: "3 小時 15 分",
          name: "搭機返回溫暖的家", area: "KIX → TPE", cat: "交通",
          desc: "滿載戰利品與美好回憶，期待下一趟旅程！",
          map: "Taoyuan International Airport", lat: 25.0797, lng: 121.2342
        }
      ]
    }
  ],

  highlights: [
    {
      name: "日本環球影城 USJ",
      tag: "大正出發12分",
      area: "此花區",
      desc: "從大正站搭 JR 僅 12 分鐘！超級任天堂世界、咚奇剛國度與哈利波特魔法世界。",
      map: "Universal Studios Japan", lat: 34.6654, lng: 135.4323,
      img: "https://images.unsplash.com/photo-1624601573012-efb68931cc8f?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "道頓堀・固力果跑跑人",
      tag: "必拍地標",
      area: "難波・道頓堀",
      desc: "大阪最具代表性的霓虹招牌與運河街景，夜晚搭觀光船氣氛滿分。",
      map: "Dotonbori Glico Sign", lat: 34.6687, lng: 135.5013,
      img: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "伏見稻荷大社 千本鳥居",
      tag: "京都必訪",
      area: "京都伏見",
      desc: "綿延山頭的萬座朱紅色鳥居隧道，早晨前往光影最美、人潮較少。",
      map: "Fushimi Inari Taisha", lat: 34.9671, lng: 135.7727,
      img: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "清水寺・二三年坂",
      tag: "世界遺產",
      area: "京都東山",
      desc: "懸空木造清水舞台與古色古香的石坂町家街道，最適合穿和服漫步。",
      map: "Kiyomizu-dera", lat: 34.9949, lng: 135.7850,
      img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "大阪城天守閣",
      tag: "大正地鐵直達",
      area: "中央區",
      desc: "從大正搭長堀鶴見綠地線免轉車直達森之宮！白牆金飾天守閣與護城河金箔御座船。",
      map: "Osaka Castle", lat: 34.6873, lng: 135.5262,
      img: "https://images.unsplash.com/photo-1589452271712-64b8a66c7b71?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "奈良公園 & 東大寺",
      tag: "療癒必訪",
      area: "奈良",
      desc: "上千隻親人小鹿在草地漫步，搭配世界最大木造建築東大寺大佛。",
      map: "Nara Park", lat: 34.6850, lng: 135.8430,
      img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=700&q=80"
    }
  ],

  foods: [
    {
      name: "TUGBOAT TAISHO 河畔美食街",
      tag: "民宿走路6分",
      warn: "大正站旁",
      area: "大正區",
      desc: "就在大正站尻無川河畔的複合貨櫃美食廣場，有精釀啤酒、大阪燒、披薩與河景座位，回民宿前小酌首選！",
      map: "TUGBOAT TAISHO Osaka", lat: 34.6672, lng: 135.4801,
      img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "蟹道樂 道頓堀本店",
      tag: "螃蟹料理",
      warn: "建議預約",
      area: "道頓堀",
      desc: "巨型可動螃蟹招牌名店，午間螃蟹會席套餐 CP 值極高，一次品嚐螃蟹刺身、炭烤與釜飯。",
      map: "Kani Doraku Dotonbori Honten", lat: 34.6687, lng: 135.5018,
      img: "https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "美津の (Mizuno) 大阪燒",
      tag: "大阪燒",
      warn: "米其林必比登",
      area: "道頓堀",
      desc: "傳承三代老店，招牌「山芋燒」100% 山藥泥取代麵粉，鋪滿干貝、鮮蝦與豬肉。",
      map: "Mizuno Okonomiyaki", lat: 34.6683, lng: 135.5026,
      img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "黑門市場 海鮮屋台",
      tag: "現流海鮮",
      warn: "早午餐首選",
      area: "日本橋",
      desc: "現剖海膽、炙燒黑鮪魚大腹、烤大扇貝與 A5 神戶牛串燒。",
      map: "Kuromon Market", lat: 34.6654, lng: 135.5067,
      img: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "元祖串炸 達摩 (だるま)",
      tag: "新世界串炸",
      warn: "人氣名店",
      area: "新世界・通天閣",
      desc: "外皮薄脆不油膩，必點元祖牛肉串、炸蘆筍、炸起司與天然大蝦。",
      map: "Kushikatsu Daruma Shinsekai", lat: 34.6520, lng: 135.5062,
      img: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=700&q=80"
    },
    {
      name: "中谷堂 艾草麻糬",
      tag: "奈良甜點",
      warn: "現搗出爐",
      area: "奈良商店街",
      desc: "日本電視冠軍高速搗麻糬名店，熱呼呼軟Q外皮包裹綿密十勝紅豆餡與黃豆粉。",
      map: "Nakatanidou", lat: 34.6822, lng: 135.8287,
      img: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=700&q=80"
    }
  ],

  savedSpots: [
    {
      id: "s0",
      name: "AEON Mall 大阪巨蛋城 (イオンモール大阪ドームシティ)",
      area: "大正區 · 民宿步行 8 分鐘",
      desc: "就在京瓷巨蛋旁的大型商場與大型超市！入住期間買日本草莓、和牛、飲料零食回包棟民宿煮宵夜超方便。",
      map: "AEON MALL Osaka Dome City", lat: 34.6679, lng: 135.4790
    },
    {
      id: "s1",
      name: "木津卸賣市場・海鮮丼",
      area: "大國町 · Osaka",
      desc: "在地人逛的早市（06:00–11:00），「魚市食堂」海膽海鮮丼超澎湃，旁邊還有木津浴場。",
      map: "Kizu Wholesale Market", lat: 34.6562, lng: 135.4988
    },
    {
      id: "s2",
      name: "中崎町 昭和老宅咖啡街",
      area: "梅田周邊 · Osaka",
      desc: "距離梅田步行 10 分鐘的復古巷弄，聚集古著店、雜貨與文青手沖咖啡館。",
      map: "Nakazakicho Osaka", lat: 34.7069, lng: 135.5056
    },
    {
      id: "s3",
      name: "空庭溫泉 OSAKA BAY TOWER",
      area: "弁天町（大正站搭 JR 僅 1 站 2 分鐘！）",
      desc: "離大正站只有 1 站距離！安土桃山時代主題溫泉樂園，可穿浴衣在千坪空中庭園足湯拍照放鬆。",
      map: "Solaniwa Onsen Osaka", lat: 34.6695, lng: 135.4611
    },
    {
      id: "s4",
      name: "宇治 平等院 & 中村藤吉本店",
      area: "京都宇治 · Kyoto",
      desc: "日幣 10 圓硬幣上的鳳凰堂，順遊百年抹茶老舖享用竹筒抹茶聖代（可作為 Day 4 伏見稻荷順遊備案）。",
      map: "Byodoin Uji", lat: 34.8893, lng: 135.8077
    },
    {
      id: "s5",
      name: "RIKURO 老爺爺起司蛋糕 難波本店",
      area: "難波 · Osaka",
      desc: "剛出爐會搖晃的雲朵舒芙蕾起司蛋糕，底層有葡萄乾，買整模回民宿大家一起分食超讚。",
      map: "Rikuro Ojisan no Mise Namba", lat: 34.6660, lng: 135.5015
    }
  ],

  reminders: [
    {
      icon: "🏠",
      title: "大正站 Airbnb 包棟民宿入住須知",
      items: [
        "房源位置：JR 大阪環狀線／地鐵長堀鶴見綠地線「大正站」步行約 4 分鐘（鄰近京瓷巨蛋、AEON 購物中心與 TUGBOAT 河畔美食街）",
        "包棟優勢：整棟 3 層樓獨立房屋，前往心齋橋（地鐵直達 6 分）、梅田（JR 直達 11 分）、USJ 環球影城（約 12 分）、關西機場（JR 關空快速直達）都超方便",
        "日本住宅區夜間 21:00 後請降低音量，出入隨手鎖門，垃圾請依民宿規定分類放置於室內",
        "Airbnb 房源頁面：https://www.airbnb.com.tw/rooms/1372891258852120566"
      ]
    },
    {
      icon: "🛂",
      title: "護照與入境準備",
      items: [
        "出發前請確認護照效期，建議剩餘 6 個月以上",
        "每人隨身攜帶護照正本，另外拍照存手機並準備影印本一份備份",
        "建議出發前先在 Visit Japan Web 完成入境審查與海關申報登錄，抵達關西機場直接掃描 QR Code 通關",
        "台北駐大阪經濟文化辦事處急難救助：+81-90-8794-4568（日本報警 110 / 救護車 119）"
      ]
    },
    {
      icon: "💴",
      title: "日幣、交通卡與支付",
      items: [
        "提前在台灣換好日幣現金，神社御守、黑門市場部分攤位、奈良鹿仙貝只收現金",
        "iPhone 旅客可直接於 Apple 錢包內加入「ICOCA」並以信用卡儲值，搭地鐵、JR 環狀線、私鐵、超商感應超方便",
        "準備一個零錢包放 ¥100、¥500 硬幣，扭蛋機、投幣式置物櫃與販賣機常會用到"
      ]
    },
    {
      icon: "🧾",
      title: "日本退稅新制（2026/11/1 起適用）",
      items: [
        "【先付含稅、機場退還】店內結帳時先付含稅價，出境時於關西機場確認後退還稅款，不再於店家當場免稅",
        "取消原本 ¥5,000 下限與消耗品特殊封袋限制，一般物品與藥妝零食合併計算更方便",
        "購物時仍須出示「護照正本」或 Visit Japan Web 退稅 QR Code 讓店家登錄購買紀錄",
        "出境前請預留時間：在關西機場先到自助機台（Kiosk）掃描護照確認退稅（綠燈代表完成，紅燈需持商品給海關檢查），因此退稅商品請先不要託運！"
      ]
    }
  ],

  checklist: [
    { cat: "證件與票券", items: ["護照正本（效期 6 個月以上）", "Visit Japan Web QR 截圖", "Airbnb 入住指南 & 門鎖密碼截圖", "日幣現金 & 零錢包", "海外高回饋信用卡 2 張", "USJ 門票 + 快速通關 QR", "旅遊平安險＋不便險"] },
    { cat: "3C 與網路", items: ["手機 + 充電線", "行動電源（放隨身包）", "日本 eSIM / 網卡", "Apple Wallet 綁定 ICOCA", "多孔延長線 / 充電頭"] },
    { cat: "衣物與隨身物", items: ["好走防滑的運動鞋", "換洗衣物 & 保暖外套", "休足時間 / 足貼", "常備藥品（腸胃・止痛・感冒）", "摺疊購物袋（去 AEON 超市採買用）", "晴雨兩用摺疊傘"] }
  ]
};
