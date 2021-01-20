import createRepository from '~bossamodule/api/core/api.crud'
import transformRequestInMultipart from '~bossamodule/api/core/api.multipart'

export default ({ $axios, store, app }, inject) => {
    inject('bossa', {
        $api: {
            crud: createRepository($axios),
            multipart: transformRequestInMultipart
        },
        $auth: {
            login: payload => store.dispatch("bossa/user/login", payload),
            logout: () => store.dispatch("bossa/user/login"),
            getInfo: () => store.dispatch("bossa/user/getInfo"),
            user: {
                get isLoggedIn() { return store.getters['bossa/user/isLoggedIn'] },
                get token() { return store.getters['bossa/user/token'] },
                get info() { return store.getters['bossa/user/info'] },
                get username() { return store.getters['bossa/user/username'] },
                get permissions() { return store.getters['bossa/user/pagePermission'](app.context.route.path) }
            }
        }
    })
}