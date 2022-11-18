import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

// home
// import Home from "../views/Home.vue";
import EmptyHome from '../views/EmptyHome.vue'

// auth
import SignUpAdmin from '@/views/auth/SignUpAdmin.vue'
import ConfirmRegistration from '@/views/auth/ConfirmRegistration.vue'
import SignUpParticipant from '@/views/auth/SignUpParticipant.vue'
import LoginUser from '@/views/auth/LoginUser.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

Vue.use(VueRouter)

// eslint-disable-next-line no-prototype-builtins
const isAuthorized = localStorage.hasOwnProperty('sl-t')

// const authGuard = (to, from, next) => {
//   if (!isAuthorized) return next({ name: 'login' })
//   else return next()
// }

const routes: Array<RouteConfig> = [
  // home
  {
    path: '/',
    props: true,
    name: 'home',
    component: EmptyHome,
  },

  // auth
  {
    path: '/auth/sign-up-admin',
    name: 'sign-up-admin',
    component: SignUpAdmin,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/registration/complete/:id',
    name: 'complete-registration',
    component: ConfirmRegistration,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/auth/login',
    name: 'login',
    component: LoginUser,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/auth/reset-pass',
    name: 'reset-pass',
    component: ResetPassword,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: '/auth/sign-up',
    name: 'sign-up-user',
    component: SignUpParticipant,
    meta: {
      layout: 'AuthLayout',
    },
  },

  {
    path: '/survey',
    props: true,
    name: 'SurveySection',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SurveyView.vue'),
  },
  {
    path: '/virtualWorkshop',
    props: true,
    name: 'VirtualWorkshop',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */ '../views/VirtualWorkshopView.vue'
      ),
  },
  {
    path: '/addCompany',
    props: true,
    name: 'AddCompanySection',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AddCompany.vue'),
  },
  {
    path: '/company',
    props: (route) => ({
      user: '',
      ...route.params,
    }),
    name: 'CompanyDashboard',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CompanyDashboard.vue'),
  },
  {
    path: '/login',
    props: true,
    name: 'LoginPage',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/SOARModuleView',
    props: true,
    name: 'SOARModuleView',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SOARModuleView.vue'),
  },
  {
    path: '/SOARModuleAnalysis',
    props: true,
    name: 'SOARModuleAnalysis',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/SOARModuleAnalysis.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to == from) {
    return
  }
  if (!isAuthorized) {
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
