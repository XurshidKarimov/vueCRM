import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    meta: {layout: 'empty'},
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {layout: 'main'},
    component: () => import("@/views/CategoryPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
