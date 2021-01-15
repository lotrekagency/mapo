import app from '~bossamodule/store/modules/app.js'
import user from '~bossamodule/store/modules/user.js'

// Vue.use(Vuex)
export default (ctx) => {
  const {store} = ctx
  const storeOptions = {
    state: Object.assign(app.state, user.state),
    getters: Object.assign(app.getters, user.getters),
    mutations: Object.assign(app.mutations, user.mutations),
    actions: Object.assign(app.actions, user.actions)
  }
  // return new Vuex.Store(storeOptions)
  // app.store = store
  store.registerModule('bossa', Object.assign({}, storeOptions), {
    preserveState: !!store.state.bossa // important to preserve the state client/server
  })
}