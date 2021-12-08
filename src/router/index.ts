import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/home",
    name: "HomeMe",
    component: Home,
  },
  {
    path: "/survey",
    name: "SurveySection",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SurveyView.vue"),
  },
  {
    path: "/addCompany",
    name: "AddCompanySection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddCompany.vue"),
  },
  {
    path: "/company",
    name: "CompanyDashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompanyDashboard.vue"),
  },
  {
    path: "/login",
    name: "LoginPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Setup the route hooks to perform authentication checking for every route
// except those that are not protected
import { getUserLoggedIn } from '../firebase/firebase'
router.beforeEach(async (to, from, next) => {
  if (to == from) {
    return
  }
  if (!await getUserLoggedIn()){
    if (to.path == '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    if (to.path == '/login') {
      next('/home')
    } else {
      next()
    }
  }
})

export default router
