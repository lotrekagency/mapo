import app from '~mapomodule/store/modules/app.js'
import user from '~mapomodule/store/modules/user.js'

const storeModules = { app, user }

const cookieparser = process.server ? require('cookieparser') : undefined

export default ({ store }) => {
  const storeOptions = {
    modules: storeModules,
    actions: {
      nuxtServerInit: {
        root: true,
        handler: async ({ commit, dispatch }, { req }) => {
          if (req.headers.cookie) {
            const { __camomilla_session, sidebar_drawer, sidebar_clipped } = cookieparser.parse(req.headers.cookie)
            commit('app/SET_DRAWER', sidebar_drawer)
            commit('app/SET_CLIPPED', sidebar_clipped)
            if (__camomilla_session) {
              commit('user/SET_TOKEN', __camomilla_session)
              await dispatch('user/getInfo')
            }
          }
        }
      }
    },
    namespaced: true,
  }

  store.registerModule('mapo', Object.assign({}, storeOptions), { preserveState: process.browser })
}