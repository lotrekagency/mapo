import createRepository from '~bossamodule/api/core/api.crud'
import transformRequestInMultipart from '~bossamodule/api/core/api.multipart'

export default ({ $axios, store, route }, inject) => {
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
                isLoggedIn: store.getters['bossa/user/isLoggedIn'],
                token: store.getters['bossa/user/token'],
                info: store.getters['bossa/user/info'],
                username: store.getters['bossa/user/username'],
                permissions: store.getters['bossa/user/pagePermission'](route.path)
            }
        }
    })
}