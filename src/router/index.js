import Vue from "vue";
import store from '@/store/index';
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Deleted from "../views/Deleted.vue"
import Login from "../views/Login.vue"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/deleted",
    name: "Deleted",
    component: Deleted,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.getItem('token')
  if (to.matched.some(record => record.meta.requiresAuth && !isLoggedIn)) {
    next({ path: '/login' })
  } else {
    next() 
  }
})

export default router;
