import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      layout: 'empty'
    },
    component: () => import("@/views/LoginPage.vue"),
  },
  {
    path: "/categories",
    name: "categories",
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/CategoryPage.vue"),
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'empty'
    },
    component: () => import("@/views/RegisterPage.vue"),
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/HistoryPage.vue"),
  },
  {
    path: '/detail/:id',
    name: 'detail',
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/DetailPage.vue"),
  },
  {
    path: '/planing',
    name: 'planing',
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/PlanningPage.vue"),
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/ProfilPage.vue"),
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'main'
    },
    component: () => import("@/views/RecordPage.vue"),
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
