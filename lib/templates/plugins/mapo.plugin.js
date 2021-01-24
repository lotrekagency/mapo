import createRepository from '~mapomodule/api/core/api.crud'
import transformRequestInMultipart from '~mapomodule/api/core/api.multipart'
import initInterceptor from '~mapomodule/api/core/interceptor'

export default (ctx, inject) => {

    initInterceptor(ctx)

    inject('mapo', {
        $api: {
            crud: createRepository(ctx.$axios),
            multipart: transformRequestInMultipart
        },
        $auth: {
            login: payload => ctx.store.dispatch("mapo/user/login", payload),
            logout: () => ctx.store.dispatch("mapo/user/login"),
            getInfo: () => ctx.store.dispatch("mapo/user/getInfo"),
            user: {
                get isLoggedIn() { return ctx.store.getters['mapo/user/isLoggedIn'] },
                get token() { return ctx.store.getters['mapo/user/token'] },
                get info() { return ctx.store.getters['mapo/user/info'] },
                get username() { return ctx.store.getters['mapo/user/username'] },
                get permissions() { return ctx.store.getters['mapo/user/pagePermission'](ctx.app.context.route.path) },
                get role() { return ctx.store.getters['mapo/user/role'] }
            }
        }
    })
}