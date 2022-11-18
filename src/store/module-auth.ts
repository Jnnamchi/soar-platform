/* eslint-disable no-unused-vars */
// @ts-nocheck
import { AuthAPI } from '@/api/auth'
import { IUser } from '@/data/User'

export interface IAuthState {
  credentials: {
    access_token: null | string
    first_name: string
  }
}

export interface IAuthCommit {}

export default {
  namespaced: true,

  state() {
    return {
      credentials: {
        access_token: localStorage.getItem('sl-t') || null,
        first_name: '',
      },
    }
  },

  getters: {
    getUserName: (state: IAuthState) => state.credentials.first_name,
  },

  mutations: {
    SET_TOKEN(state: IAuthState, token: string) {
      state.credentials.access_token = token
      localStorage.setItem('sl-t', token)
    },
    DELETE_TOKEN(state: IAuthState) {
      state.credentials.access_token = null
      localStorage.removeItem('sl-t')
    },
    SET_USERNAME(state: IAuthState, name: string) {
      state.credentials.first_name = name
    },
  },

  actions: {
    async onSignupAdmin({ commit }, data: IUser) {
      return AuthAPI.registrationAdmin(data).then((res) => {
        console.log('auth api login res: ', res)
        return
      })
    },

    async onRegistrationConfirm(_context, id: string) {
      return AuthAPI.registrationConfirm(id).then((res) => res)
    },

    async onLogin(_context, data: { email: string; password: string }) {
      return AuthAPI.login(data).then((res) => res)
    },

    async onLoginConfirm({ commit }, data: { id: string; code: string }) {
      return AuthAPI.loginConfirm(data).then((res) => {
        if (res.status === 200) {
          commit('SET_TOKEN', res.data.access_token)
        }

        return res
      })
    },

    async onGetUserInfo() {
      return AuthAPI.userInfo().then((res) => {
        return res
      })
    },

    onLogout({ commit }) {
      console.log('logout')
      commit('DELETE_TOKEN')
    },
  },
}
