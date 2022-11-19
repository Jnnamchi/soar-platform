// @ts-nocheck
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { RoutePath, RouteName } from '@/types/route'

// home
// import Home from "../views/Home.vue";
import BaseHome from '../views/BaseHome.vue'

// auth
import LoginUser from '@/views/auth/LoginUser.vue'
import SignupAdmin from '@/views/auth/SignupAdmin.vue'
import SignupAdminConfirm from '@/views/auth/SignupAdminConfirm.vue'
import RegisterParticipant from '@/views/auth/RegisterParticipant.vue'
import ResetPassword from '@/views/auth/ResetPassword.vue'

// 404
import NotFoundComponent from '@/views/404.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // home
  {
    path: RoutePath.Home,
    props: true,
    name: RouteName.Home,
    component: BaseHome,
  },

  // auth
  {
    path: RoutePath.SignupAdmin,
    name: RouteName.SignupAdmin,
    component: SignupAdmin,
    meta: {
      layout: 'AuthLayout',
    },
  },
  {
    path: RoutePath.SignupAdminConfirm,
    name: RouteName.SignupAdminConfirm,
    component: SignupAdminConfirm,
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
    component: RegisterParticipant,
    meta: {
      layout: 'AuthLayout',
    },
  },

  // 404
  {
    path: '/:pathMatch(.*)',
    component: NotFoundComponent,
    meta: {
      layout: 'EmptyLayout',
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
