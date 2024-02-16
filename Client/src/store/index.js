import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
  },
  getters: {
    token: state => {
      return state.token
    }
  },
  mutations: {
    setToken(state, t) {
      state.token = t
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState()],

})
