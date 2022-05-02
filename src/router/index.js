import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/HomePage.vue"),
  },
  {
    path: "/city",
    props: (route) => ({
      ...route.params,
    }),
    name: "ChooseCity",
    component: () => import("@/views/CountyPage.vue"),
  },
  {
    path: "/activity",
    name: "activity",
    component: () => import("@/views/ActivityPage.vue"),
  },
  {
    path: "/food",
    name: "Food",
    component: () => import("@/views/FoodPage.vue"),
  },
  {
    path: "/hotel",
    name: "Hotel",
    component: () => import("@/views/HotelPage.vue"),
  },
  { path: "/:catchAll(.*)", redirect: "/" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: "active",
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
