import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: { layout: 'main' },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: { layout: 'empty' },
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: { layout: 'main' },
    component: () => import("@/views/CategoryPage.vue"),
  },
  {
    path: '/register',
    name: 'register',
    meta: {layout: 'empty'},
    component: () => import("@/views/RegisterPage.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
