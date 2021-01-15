import { login, logout, getInfo } from '~bossamodule/api/user'
import { getToken, setToken, removeToken } from '~bossamodule/utils/auth'

const state = () => ({
  token: getToken(),
  username: '',
  info: {}
})

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  CLEAN_DATA: (state) => {
    state.token = getToken()
    state.username = ''
    state.info = {}
  },
}

const actions = {

  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { token } = response
        commit('SET_TOKEN', token)
        setToken(token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      logout().then(response => {
        commit('CLEAN_DATA')
        removeToken()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        commit('SET_USERNAME', response.username)
        commit('SET_INFO', response)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

}

const getters = {
  token: state => state.token,
  username: state => state.username,
  info: state => state.info,

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
