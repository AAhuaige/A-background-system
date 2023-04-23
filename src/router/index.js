import { createRouter, createWebHashHistory } from "vue-router";
// import home from "../views/Home/home.vue";
const routes = [
  {
    path: "/",
    name: "home1",
    component: () => import("../views/Main.vue"),
    redirect: "/home",
    children: [],
  },
  {
    path: "/Login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory("/dist/"),
  routes,
});

export default router;
