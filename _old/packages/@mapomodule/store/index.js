import app from './modules/app.js'
import user from './modules/user.js'
import media from './modules/media.js'


const storeModules = { app, user, media }

const cookieparser = process.server ? require('cookieparser') : undefined

export default ({ store }) => {
  const storeOptions = {
    modules: storeModules,
    actions: {
      nuxtServerInit: {
        root: true,
        handler: async ({ commit, dispatch }, { req }) => {
          if (req.headers.cookie) {
            const { __mapo_session, sidebar_drawer, sidebar_clipped, sidebar_minivariant } = cookieparser.parse(req.headers.cookie)
            commit('app/SET_DRAWER', sidebar_drawer)
            commit('app/SET_CLIPPED', sidebar_clipped)
            commit('app/SET_MINIVARIANT', sidebar_minivariant)
            if (__mapo_session) {
              commit('user/SET_TOKEN', __mapo_session)
              commit('user/SET_LOGGEDIN', true)
              await dispatch('user/getInfo').catch(async (e) => {
                console.error(`Error occurred calling backend app:\n${e.stack || e}\nCannot maintain your session in ssr.`); 
                await dispatch('user/logout').catch(() => {})
              })
            }
          }
        }
      }
    },
    namespaced: true,
  }

  store.registerModule('mapo', Object.assign({}, storeOptions), { preserveState: process.browser })
}