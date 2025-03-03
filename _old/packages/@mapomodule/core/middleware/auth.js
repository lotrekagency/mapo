import Middleware from '../../middleware' // little hack to inject middleware in root project :P

Middleware.auth = Middleware.auth || function ({ route, redirect, query, store, app }) {
    const { router: { options } } = app;
    const isLoggedIn = store.getters['mapo/user/isLoggedIn']
    if (!isLoggedIn) {
        query['redirect'] = route.path
        return redirect(`${options.base || '/'}login`, query)
    }
}