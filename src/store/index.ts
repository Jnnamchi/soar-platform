import Vue from 'vue'
import Vuex from 'vuex'
import moduleAuth from './module-auth'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    moduleAuth,
  },
})
