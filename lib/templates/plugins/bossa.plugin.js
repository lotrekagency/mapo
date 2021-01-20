import createRepository from '~bossamodule/api/core/api.crud'
import transformRequestInMultipart from '~bossamodule/api/core/api.multipart'
import initInterceptor from '~bossamodule/api/core/interceptor'

export default (ctx, inject) => {

    initInterceptor(ctx)
    
    inject('bossa', {
        $api: {
            crud: createRepository(ctx.$axios),
            multipart: transformRequestInMultipart
        },
        $auth: {
            login: payload => ctx.store.dispatch("bossa/user/login", payload),
            logout: () => ctx.store.dispatch("bossa/user/login"),
            getInfo: () => ctx.store.dispatch("bossa/user/getInfo"),
            user: {
                get isLoggedIn() { return ctx.store.getters['bossa/user/isLoggedIn'] },
                get token() { return ctx.store.getters['bossa/user/token'] },
                get info() { return ctx.store.getters['bossa/user/info'] },
                get username() { return ctx.store.getters['bossa/user/username'] },
                get permissions() { return ctx.store.getters['bossa/user/pagePermission'](ctx.app.context.route.path) }
            }
        }
    })
}