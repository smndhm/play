import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

const requireAuth = (to, from, next) => {
  if (
    !localStorage.accessToken ||
    JSON.parse(localStorage.accessToken).expire < Math.floor(Date.now() / 1000)
  ) {
    next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    component: Home
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/lists",
    component: () =>
      import(/* webpackChunkName: "lists" */ "../views/Lists.vue"),
    beforeEnter: requireAuth
  },
  {
    path: "/lists/:reference",
    component: () => import(/* webpackChunkName: "list" */ "../views/List.vue"),
    beforeEnter: requireAuth
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;
