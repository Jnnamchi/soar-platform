import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './module-auth'
import Auth from './modules/auth.module'
import Signup from './modules/signup.module'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth,
    Auth,
    Signup,
  },
})
