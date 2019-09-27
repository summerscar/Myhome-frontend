import {
  Auth,
  AuthData,
  callService,
  Connection,
  createConnection,
  ERR_HASS_HOST_REQUIRED,
  ERR_INVALID_AUTH,
  getAuth,
  getUser,
  HassConfig,
  HassEntities,
  HassUser,
  subscribeConfig,
  subscribeEntities
} from 'home-assistant-js-websocket'
import store from '@/store'
import router from '@/router'

let connection: Connection, auth: Auth

export function loadTokens () {
  let hassTokens
  try {
    hassTokens = JSON.parse(String(localStorage.getItem('hass_tokens')))
  } catch (err) {}
  return hassTokens
}

export function loadHassUrl ():string {
  return String(localStorage.getItem('hass_url'))
}

export async function saveTokens (tokens?: AuthData | null) {
  try {
    localStorage.setItem('hass_tokens', JSON.stringify(tokens))
  } catch (err) {}
}

export interface HomeAssistantEntityProps {
  hassAuth: Auth;
  hassConfig: HassConfig;
  hassEntities: HassEntities;
}
export interface HomeAssistantChangeProps extends HomeAssistantEntityProps {
  handleHassChange?: (
    domain: string,
    state: string | boolean,
    data?: any
  ) => void;
}
export function handleChange (
  domain: string,
  state: string | boolean,
  data?: any
) {
  process.env.NODE_ENV === 'development' &&
    console.log('handleChange:', domain, state, data)
  if (typeof state === 'string') {
    callService(connection, domain, state, data).then(
      () => {},
      err => {
        console.error('Error calling service:', err)
      }
    )
  } else {
    callService(connection, domain, state ? 'turn_on' : 'turn_off', data).then(
      () => {},
      err => {
        console.error('Error calling service:', err)
      }
    )
  }
}

function eventHandler (connection: Connection, data: any) {
  console.warn('Connection has been established again', data)
}

export async function connectToHASS (url: string) {
  if (!connection) {
    localStorage.setItem('hass_url', url)
    auth = await getAuth({
      hassUrl: url,
      saveTokens: saveTokens,
      loadTokens: () => Promise.resolve(loadTokens())
    })
    try {
      connection = await createConnection({ auth })
    } catch (err) {
      if (err !== ERR_HASS_HOST_REQUIRED) {
        store.commit('setConnected', false)
        return Promise.reject(err)
      }
      if (err !== ERR_INVALID_AUTH) {
        store.commit('setConnected', false)
        return Promise.reject(err)
      }
      // We can get invalid auth if auth tokens were stored that are no longer valid
      // Clear stored tokens.
      saveTokens()
      auth = await getAuth({
        hassUrl: url,
        saveTokens: saveTokens,
        loadTokens: () => Promise.resolve(loadTokens())
      })
      try {
        connection = await createConnection({ auth })
      } catch (err) {
        return Promise.reject(err)
      }
    }
    store.commit('setConnected', true)
    // connection.addEventListener('ready', eventHandler)
    connection.addEventListener('disconnected', eventHandler)
    connection.addEventListener('reconnect-error', eventHandler)
    store.commit('setAuth', auth)
    subscribeConfig(connection, (config: HassConfig) => {
      store.commit('setHassConfig', config)
    })
    subscribeEntities(connection, (entities: HassEntities) => {
      store.commit('setHassEntities', entities)
    })
    return getUser(connection).then((user: HassUser) => {
      console.log('Logged into Home Assistant as', user.name)
      store.commit('setHassUser', user)
    })
  }
}
