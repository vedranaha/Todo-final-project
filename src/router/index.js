import { createRouter, createWebHistory } from "vue-router";
import Auth from "../views/Auth.vue";
import Home from "../views/Home.vue";
const routes = [
  { path: "/auth", component: Auth },
  { path: "/", component: Home, meta: { requiresAuth: true } },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
