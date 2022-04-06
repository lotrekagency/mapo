import { getToken, setToken, removeToken } from '@mapomodule/utils/helpers/auth'

const state = () => ({
  token: getToken(),
  isLoggedIn: false,
  info: {},
  page_permissions: {}
})

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_LOGGEDIN: (state, bool) => {
    state.isLoggedIn = !!bool
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  CLEAN_DATA: (state) => {
    state.token = getToken()
    state.isLoggedIn = false
    state.info = {}
    state.page_permissions = {}
  },
  ADD_PAGE_PERMISSION: (state, payload) => {
    state.page_permissions[payload.key] = payload.value
  },
  DELETE_PAGE_PERMISSION: (state, key) => {
    delete state.page_permissions[key];
  },
}

const actions = {
  login({ commit, dispatch }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      const url = process.env.AUTH_LOGIN_URL || '/api/auth/login'
      this.$axios.post(url, { username: (username || "").trim(), password: (password || "").trim() }).then(response => {
        const { token } = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        commit('SET_LOGGEDIN', true)
        dispatch('getInfo').then(() => resolve())
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve, reject) => {
      const url = process.env.AUTH_LOGIN_URL || '/api/auth/logout'
      this.$axios.get(url).then(_ => {
        removeToken()
        commit('CLEAN_DATA')
        typeof location !== "undefined" && location.reload()
        resolve()
      }).catch(error => {
        commit('CLEAN_DATA')
        typeof location !== "undefined" && location.reload()
        reject(error)
      }) 
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const url = process.env.USER_INFO_API || '/api/profiles/me/'
      this.$axios.get(url).then(response => {
        commit('SET_INFO', response.data)
        resolve(response.data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  addPagePermission({ commit }, payload) {
    return new Promise((resolve) => {
      commit('ADD_PAGE_PERMISSION', payload)
      resolve()
    })
  },

  deletePagePermission({ commit }, key) {
    return new Promise((resolve) => {
      commit('DELETE_PAGE_PERMISSION', key)
      resolve()
    })
  }
}

const getters = {
  isLoggedIn: state => !!state.isLoggedIn,
  isSuperUser: state => !!state.info.is_superuser,
  token: state => state.token,
  username: state => state.info.username || 'Unknown',
  role: state => state.info.role || 'unknown',
  info: state => state.info,
  pagePermission: state => key => state.page_permissions[key] || [],
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
