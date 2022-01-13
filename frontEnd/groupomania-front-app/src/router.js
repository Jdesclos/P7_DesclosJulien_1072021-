import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store/modules";
import Register from "./components/Register";
import Login from "./components/Login";
import Posts from "./components/Home";
import Profile from "./components/Profile";

Vue.use(VueRouter);

const routes = [
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { guest: true },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: { guest: true },
  },
  {
    path: "/home",
    name: "Home",
    component: Posts,
    meta: { requiresAuth: true },
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    meta: { requiresAuth: true }
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated && store.getters.isLogin) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated && store.getters.isLogin) {
      next("/home");
      return;
    }
    next();
  } else {
    next();
  }
});

export default router;
