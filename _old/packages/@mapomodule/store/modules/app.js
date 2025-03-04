import Cookies from 'js-cookie'

const state = () => ({
  sidebar: {
    clipped: Cookies.get('sidebar_clipped') ? !!+Cookies.get('sidebar_clipped') : false,
    drawer: Cookies.get('sidebar_drawer') ? !!+Cookies.get('sidebar_drawer') : false,
    minivariant: Cookies.get('sidebar_minivariant') ? !!+Cookies.get('sidebar_minivariant') : false
  },
  snackbar: null
})

const mutations = {
  SET_SNACKBAR(state, payload) {
    state.snackbar = payload
  },
  CLEAR_SNACKBAR(state) {
    state.snackbar = null
  },
  TOGGLE_DRAWER(state) {
    state.sidebar.drawer = !state.sidebar.drawer;
    Cookies.set('sidebar_drawer', +!!state.sidebar.drawer)
  },
  SET_DRAWER(state, value) {
    state.sidebar.drawer = !!+value;
    Cookies.set('sidebar_drawer', +!!value)
  },
  TOGGLE_CLIPPED(state) {
    state.sidebar.clipped = !state.sidebar.clipped;
    Cookies.set('sidebar_clipped', +!!state.sidebar.clipped)
  },
  SET_CLIPPED(state, value) {
    state.sidebar.clipped = !!+value;
    Cookies.set('sidebar_clipped', +!!value)
  },
  TOGGLE_MINIVARIANT(state) {
    state.sidebar.minivariant = !state.sidebar.minivariant;
    Cookies.set('sidebar_minivariant', +!!state.sidebar.minivariant)
  },
  SET_MINIVARIANT(state, value) {
    state.sidebar.minivariant = !!+value;
    Cookies.set('sidebar_minivariant', +!!value)
  },
}

const actions = {
  showSnackMessage({ commit }, payload) {
    return new Promise((resolve, reject) => {
      try {
        commit('SET_SNACKBAR', payload)
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  clearSnackMessage({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('CLEAR_SNACKBAR')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  toggleSidebarDrawer({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('TOGGLE_DRAWER')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  toggleSidebarClipped({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('TOGGLE_CLIPPED')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  toggleSidebarMinivariant({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('TOGGLE_MINIVARIANT')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const getters = {
  drawer: state => state.sidebar.drawer,
  clipped: state => state.sidebar.clipped,
  minivariant: state => state.sidebar.minivariant,
  snackbar: state => state.snackbar,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
