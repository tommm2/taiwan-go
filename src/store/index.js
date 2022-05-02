import { createStore } from "vuex";
import { positions } from "@/util/util.js";
import { ajax } from "@/api/ajax";

const store = createStore({
  state: () => ({
    modalData: {},
    data: [],
    multiData: {
      activitys: [],
      foods: [],
      scenicSpots: [],
      hotels: [],
    },
    totalLength: 0,
    currentPage: 1,
    totalPage: 0,
    modalIsShow: false,
    menuIsShow: false,
    choosePosition: "",
    chooseArea: "",
    title: "",
  }),
  mutations: {
    UPDATE_MODAL_DATA(state, payload) {
      state.modalData = payload;
    },
    UPDATE_MODAL_STATE(state, payload) {
      state.modalIsShow = payload;
    },
    UPDATE_MENU_STATE(state, payload) {
      state.menuIsShow = payload;
    },
    UPDATE_POSITION(state, payload) {
      state.choosePosition = payload;
    },
    UPDATE_AREA(state, payload) {
      state.chooseArea = payload;
    },
    UPDATE_TITLE(state, payload) {
      state.title = payload;
    },
    UPDATE_DATA(state, payload) {
      const { data, min, max } = payload;

      data.forEach((item, index) => {
        const num = index + 1;
        if (num >= min && num <= max) state.data.push(item);
      });
    },
    UPDATE_MULTI_DATA(state, payload) {
      const { data, type } = payload;
      if (type === "ScenicSpot") {
        state.multiData.scenicSpots = data;
      }
      if (type === "Activity") {
        state.multiData.activitys = data;
      }
      if (type === "Restaurant") {
        state.multiData.foods = data;
      }
      if (type === "Hotel") {
        state.multiData.hotels = data;
      }
    },
    UPDATE_CURRENT_PAGE(state, payload) {
      state.currentPage = payload;
    },
    UPDATE_TOTAL_PAGE(state, payload) {
      state.totalPage = payload;
    },
    UPDATE_TOTAL_LENGTH(state, payload) {
      state.totalLength = payload;
    },
  },
  actions: {
    // 搭配 pagination 取得資料
    getResultWithPage({ commit, state }, payload) {
      const { type, city, perData, filter } = payload;
      const { currentPage } = state;
      let AJAX = filter ? ajax(type, city, { filter }) : ajax(type, city);

      AJAX.then(({ data }) => {
        let min = currentPage * perData - perData + 1;
        let max = currentPage * perData;

        commit("UPDATE_TOTAL_LENGTH", data.length);
        commit("UPDATE_TOTAL_PAGE", Math.ceil(data.length / perData));
        commit("UPDATE_DATA", { data, min, max });
      });
    },
    // 用來取得 ScenicSpot、Restaurant、Activity、Hotel 四種不同類型的資料
    getResult({ commit }, payload) {
      const { type, city, query } = payload;

      let AJAX = query ? ajax(type, city, query) : ajax(type, city);

      AJAX.then(({ data }) => {
        commit("UPDATE_MULTI_DATA", { data, type });
      });
    },
    // 取得單一資料
    getResultById({ commit }, payload) {
      const { type, id, city } = payload;

      ajax(type, city, { filter: { id } }).then(({ data }) => {
        commit("UPDATE_MODAL_DATA", data);
        commit("UPDATE_MODAL_STATE", true);
      });
    },
    changePosition({ commit }, payload) {
      commit("UPDATE_POSITION", payload);
    },
    changeArea({ commit }, payload) {
      const { areaTW, areaEN } = payload;
      commit("UPDATE_TITLE", areaTW);
      commit("UPDATE_AREA", areaEN);
      commit("UPDATE_CURRENT_PAGE", 1);
    },
  },
  getters: {
    // 篩選縣市
    areaFilter(state) {
      let area = {};

      positions.forEach(({ text, city }) => {
        text === state.choosePosition ? (area = { ...city }) : {};
      });

      return area;
    },
  },
  modules: {},
});

export default store;
