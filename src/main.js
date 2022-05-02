import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "@fortawesome/fontawesome-free/css/all.css";

import ScrollAnimation from "@/directives/scrollanimation";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import "@/style/index.css";

const app = createApp(App);

app.directive("aos", ScrollAnimation);
app.use(router);
app.use(store);
app.use(VueAxios, axios);

app.mount("#app");

router.beforeEach(() => {
  store.commit("UPDATE_MENU_STATE", false);
});
