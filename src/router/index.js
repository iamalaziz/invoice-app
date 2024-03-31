import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import Home from "../views/Home.vue";
import InvoicePage from "../views/InvoicePage.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import NotFound from "../views/NotFound.vue";

const requireAuth = (to, from, next) => {
  const user = auth.currentUser;
  if (!user) {
    next({ name: "Login" });
  } else {
    next();
  }
};

const isLoggedIn = (to, from, next) => {
  const user = auth.currentUser;
  if (user) {
    next({ name: "Home" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/invoice/:id",
    name: "InvoicePage",
    component: InvoicePage,
    beforeEnter: requireAuth,
    props: true,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: isLoggedIn,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.afterEach((to, from) => {
  if (from.name === "InvoicePage") {
    to.meta.transition = "slide-right";
  }
  if (to.name === "InvoicePage") {
    to.meta.transition = "slide-left";
  }
});

export default router;
