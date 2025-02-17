import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import blogRoutes from "./blog";
import sessionRoutes from "./session";

const routes = [
  { path: "/", component: HomeView },
  { path: "/about", component: AboutView },
  ...blogRoutes,
  ...sessionRoutes,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
