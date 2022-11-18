export interface IUserEmail {
  user_email: string
}

export default {
  namespaced: true,

  state() {
    return {
      user_email: '',
    }
  },

  getters: {
    getUserEmail: (state: IUserEmail) => state.user_email,
  },

  mutations: {
    SET_USER_EMAIL(state: IUserEmail, name: string) {
      console.log('vuex user name mutation: ', name)
      state.user_email = name
    },
  },

  actions: {
    onUserEmail({ commit }, name: string) {
      commit('SET_USER_EMAIL', name)
    },
  },
}
