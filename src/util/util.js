export const positions = [
  {
    text: "北部",
    img: new URL("../assets/img/taipei-101.png", import.meta.url),
    city: {
      Taipei: "台北市",
      NewTaipei: "新北市",
      Taoyuan: "桃園市",
      Keelung: "基隆市",
      YilanCounty: "宜蘭縣",
      HsinchuCounty: "新竹縣",
      Hsinchu: "新竹市",
    },
  },
  {
    text: "中部",
    img: new URL("../assets/img/temple.png", import.meta.url),
    city: {
      MiaoliCounty: "苗栗縣",
      Taichung: "台中市",
      NantouCounty: "南投縣",
      YunlinCounty: "雲林縣",
      ChanghuaCounty: "彰化縣",
    },
  },
  {
    text: "南部",
    img: new URL("../assets/img/river.png", import.meta.url),
    city: {
      ChiayiCounty: "嘉義縣",
      Chiayi: "嘉義市",
      Kaohsiung: "高雄市",
      PingtungCounty: "屏東縣",
      Tainan: "台南市",
    },
  },
  {
    text: "東部",
    img: new URL("../assets/img/montains.png", import.meta.url),
    city: {
      HualienCounty: "花蓮縣",
      TaitungCounty: "台東縣",
    },
  },
  {
    text: "離島",
    img: new URL("../assets/img/fish.png", import.meta.url),
    city: {
      PenghuCounty: "澎湖縣",
      KinmenCounty: "金門縣",
      LienchiangCounty: "連江縣",
    },
  },
];

export const filters = [
  { label: "中式美食", id: "chinese" },
  { label: "異國料理", id: "abroad" },
  { label: "地方特產", id: "local" },
  { label: "伴手禮", id: "gift" },
  { label: "甜點冰品", id: "snake" },
  { label: "火烤料理", id: "roast" },
  { label: "其他", id: "other" },
];
