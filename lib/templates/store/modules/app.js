import Cookies from 'js-cookie'

const state = () => ({
  sidebar: {
    clipped: Cookies.get('sidebar_clipped') ? !!+Cookies.get('sidebar_clipped') : false,
    drawer: Cookies.get('sidebar_drawer') ? !!+Cookies.get('sidebar_drawer') : false
  }
})

const mutations = {
  TOGGLE_DRAWER(state) {
    state.sidebar.drawer = !state.sidebar.drawer;
    state.sidebar.drawer ? Cookies.set('sidebar_drawer', 1) : Cookies.set('sidebar_drawer', 0)
  },
  SET_DRAWER(state, value) {
    state.sidebar.drawer = !!value;
    Cookies.set('sidebar_drawer', +!!value)
  },
  TOGGLE_CLIPPED(state) {
    state.sidebar.clipped = !state.sidebar.clipped;
    state.sidebar.clipped ? Cookies.set('sidebar_clipped', 1) : Cookies.set('sidebar_clipped', 0)
  },
  SET_CLIPPED(state, value) {
    state.sidebar.clipped = !!value;
    Cookies.set('sidebar_clipped', +!!value)
  },
}

const actions = {
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
  }
}

const getters = {
  drawer: state => state.sidebar.drawer,
  clipped: state => state.sidebar.clipped,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
