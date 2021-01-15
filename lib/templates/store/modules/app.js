const state = () => ({
  sidebar: {
    clipped: false,
    drawer: false
  }
})

const mutations = {
  DRAWER_TOGGLE(state) {
    state.sidebar.drawer = !state.sidebar.drawer;
  },
  CLIPPED_TOGGLE(state) {
    state.sidebar.clipped = !state.sidebar.clipped;
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
