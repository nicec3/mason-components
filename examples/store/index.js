import Vue from 'vue'
import Vuex from 'vuex'
import * as cookie from '../utils/cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
    ResetToken() {
      cookie.removeToken()
      this.SET_TOKEN('')
      this.SET_ROLES([])
    }
  },
  modules: {
    //login,
  }
})
