import { getToken, setToken, removeToken } from '~mapomodule/utils/auth'

const state = () => ({
  token: getToken(),
  info: {},
  page_permissions: {}
})

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INFO: (state, info) => {
    state.info = info
  },
  CLEAN_DATA: (state) => {
    state.token = getToken()
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
      const url = process.env.AUTH_API || '/api/camomilla/token-auth/'
      this.$axios.post(url, { username: username.trim(), password: password.trim() }).then(response => {
        const { token } = response.data
        commit('SET_TOKEN', token)
        setToken(token)
        dispatch('getInfo').then(() => resolve()).catch(err => reject(err))
      }).catch(error => {
        reject(error)
      })
    })
  },

  logout({ commit }) {
    return new Promise((resolve) => {
      removeToken()
      commit('CLEAN_DATA')
      const { current } = this.$router.history
      this.$router.push({ name: 'login', query: { redirect: current.path, ...current.query } })
      resolve()
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const url = process.env.USER_INFO_API || '/api/camomilla/profiles/me/'
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
  isLoggedIn: state => !!state.token,
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
