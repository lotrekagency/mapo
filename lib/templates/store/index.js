import app from '~bossamodule/store/modules/app.js'
import user from '~bossamodule/store/modules/user.js'

const cookieparser = process.server ? require('cookieparser') : undefined

// Vue.use(Vuex)
export default ({ store }) => {
  const storeOptions = {
    modules: { app, user },
    actions: {
      nuxtServerInit: {
        root: true,
        handler({ commit }, { req }) {
          if (req.headers.cookie) {
            const parsed = cookieparser.parse(req.headers.cookie)
            commit('user/SET_TOKEN', parsed['__camomilla_session'])
            commit('app/SET_DRAWER', parsed['sidebar_drawer'])
            commit('app/SET_CLIPPED', parsed['sidebar_clipped'])
          }
        }
      }
    },
    namespaced: true,
  }



  store.registerModule('bossa', Object.assign({}, storeOptions), { preserveState: false })
}