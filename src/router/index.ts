import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    props: true,
    name: "HomeMe",
    component: Home,
  },
  {
    path: "/home",
    props: true,
    name: "HomeMe",
    component: Home,
  },
  {
    path: "/survey",
    props: true,
    name: "SurveySection",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SurveyView.vue"),
  },
  {
    path: "/addCompany",
    props: true,
    name: "AddCompanySection",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AddCompany.vue"),
  },
  {
    path: "/company",
    props: true,
    name: "CompanyDashboard",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompanyDashboard.vue"),
  },
  {
    path: "/login",
    props: true,
    name: "LoginPage",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/SOARModuleView",
    props: true,
    name: "SOARModuleView",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SOARModuleView.vue"),
  },
  {
    path: "/SOARModuleAnalysis",
    props: true,
    name: "SOARModuleAnalysis",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SOARModuleAnalysis.vue"),
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
