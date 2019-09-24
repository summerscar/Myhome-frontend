import Vue from 'vue'
import Vuex from 'vuex'
import {
  Auth,
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    hassAuth: {},
    hassConfig: {},
    hassEntities: {},
    hassUser: {}
  },
  getters: {
    connected (state) {
      return state.connected
    },
    hassAuth (state) {
      return state.hassAuth
    },
    hassConfig (state) {
      return state.hassConfig
    },
    hassEntities (state) {
      return state.hassEntities
    },
    hassUser (state) {
      return state.hassUser
    }
  },
  mutations: {
    setConnected (state, boolean: boolean) {
      state.connected = boolean
    },
    setAuth (state, auth: Auth) {
      state.hassAuth = auth
    },
    setHassConfig (state, config: HassConfig) {
      state.hassConfig = config
    },
    setHassEntities (state, entities: HassEntities) {
      state.hassEntities = entities
    },
    setHassUser (state, user: HassUser) {
      state.hassUser = user
    }
  },
  actions: {

  }
})
