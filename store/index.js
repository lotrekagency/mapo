import getters from "./getters";

export default {
  actions: {
    nuxtServerInit({ commit }, { req }) {
      // here put ssr auth
    }
  },
  getters: getters
}