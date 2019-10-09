import Vue from 'vue'
import Vuex from 'vuex'
import {
  Auth,
  Connection,
  HassConfig,
  HassEntities,
  HassUser
} from 'home-assistant-js-websocket'

const config = require('./config/config.json')

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    connected: false,
    hassAuth: {},
    hassConfig: {},
    hassEntities: {},
    hassUser: {},
    hassConnection: {},
    config: config
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
    },
    hassConnection (state) {
      return state.hassConnection
    },
    config (state) {
      return state.config
    }
  },
  mutations: {
    setConnected (state, boolean: boolean) {
      if (boolean) {
        state.connected = boolean
      } else {
        state.hassAuth = {}
        state.hassConfig = {}
        state.hassEntities = {}
        state.hassUser = {}
        localStorage.removeItem('hass_url')
        localStorage.removeItem('hass_tokens')
      }
    },
    setAuth (state, auth: Auth) {
      state.hassAuth = auth
    },
    setHassConfig (state, config: HassConfig) {
      state.hassConfig = config
    },
    setHassEntities (state, entities: HassEntities) {
      console.log('change: hassEntities', entities)
      state.hassEntities = entities
    },
    setHassUser (state, user: HassUser) {
      state.hassUser = user
    },
    setHassConnection (state, connection: Connection) {
      state.hassConnection = connection
    },
    setConfig (state, config) {
      state.config = config
    }
  },
  actions: {

  }
})
