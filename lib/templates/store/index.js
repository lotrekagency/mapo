import app from '~bossamodule/store/modules/app.js'
import user from '~bossamodule/store/modules/user.js'

const storeModules = { app, user }

const cookieparser = process.server ? require('cookieparser') : undefined

export default ({ store }) => {
  const storeOptions = {
    modules: storeModules,
    actions: {
      nuxtServerInit: {
        root: true,
        handler: async ({ commit, dispatch }, { req }) => new Promise((resolve, reject) => {
          if (req.headers.cookie) {
            try {
              const parsed = cookieparser.parse(req.headers.cookie)
              commit('user/SET_TOKEN', parsed['__camomilla_session'])
              commit('app/SET_DRAWER', parsed['sidebar_drawer'])
              commit('app/SET_CLIPPED', parsed['sidebar_clipped'])
              dispatch('user/getInfo').then(() => resolve()).catch(err => reject(err))
            } catch (error) {
              reject(error)
            }
          } else {
            resolve()
          }
        })
      }
    },
    namespaced: true,
  }

  store.registerModule('bossa', Object.assign({}, storeOptions), { preserveState: process.browser })
}