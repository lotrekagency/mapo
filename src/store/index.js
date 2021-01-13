import getters from "./getters";

export default {
  actions: {
    nuxtServerInit({ commit }, { req }) {
      // here put ssr auth
    }
  },
  getters: getters,
  state: {
    sidebar: {
      clipped: false,
      drawer: false
    }
  },
  mutations: {
    drawerReverse (state) {
      state.sidebar.drawer = !state.sidebar.drawer;
    },
    clippedReverse (state) {
      state.sidebar.clipped = !state.sidebar.clipped;
    }
  }
}