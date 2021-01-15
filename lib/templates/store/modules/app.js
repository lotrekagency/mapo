import Cookies from 'js-cookie'

const state = () => ({
  sidebar: {
    clipped: Cookies.get('sidebar_clipped') ? !!+Cookies.get('sidebar_clipped') : false,
    drawer: Cookies.get('sidebar_drawer') ? !!+Cookies.get('sidebar_drawer') : false
  }
})

const mutations = {
  DRAWER_TOGGLE(state) {
    state.sidebar.drawer = !state.sidebar.drawer;
    state.sidebar.drawer ? Cookies.set('sidebar_drawer', 1) : Cookies.set('sidebar_drawer', 0)
  },
  CLIPPED_TOGGLE(state) {
    state.sidebar.clipped = !state.sidebar.clipped;
    state.sidebar.clipped ? Cookies.set('sidebar_clipped', 1) : Cookies.set('sidebar_clipped', 0)
  }
}

const actions = {
  toggleSidebarDrawer({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('DRAWER_TOGGLE')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  },
  toggleSidebarClipped({ commit }) {
    return new Promise((resolve, reject) => {
      try {
        commit('CLIPPED_TOGGLE')
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  }
}

const getters = {
  drawer: state => state.drawer,
  clipped: state => state.clipped,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
