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
      resolve()
    })
  },

  getInfo({ commit }) {
    return new Promise((resolve, reject) => {
      const url = process.env.USER_INFO_API || '/api/camomilla/users/current/'
      this.$axios.get(url).then(response => {
        commit('SET_USERNAME', response.data.username)
        commit('SET_INFO', response.data)
        resolve(response.data)
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
