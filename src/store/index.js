import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: '',
    nowAddress: {
      label: '北京',
      pinyin: 'beijing',
      short: 'bj',
      value: 'AREA|88cff55c-aaa4-e2e0'
    },
    allDatas: {}
  },
  getters: {
  },
  mutations: {
    addToken (state, payload) {
      state.token = payload
    },
    removeToken (state) {
      state.token = ''
    },
    changeAddress (state, Address) {
      state.nowAddress = Address
    },
    addDatas (state, data) {
      state.allDatas = data
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
