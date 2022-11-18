import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './module-auth'
import moduleEmail from './module-email'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth,
    moduleEmail,
  },
})
