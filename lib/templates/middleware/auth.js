import Middleware from '../middleware' // little hack to inject middleware in root project :P

Middleware.auth = Middleware.auth || function ({ route, redirect, query, store }) {
    const hasToken = store.getters['mapo/user/token']
    if (!hasToken) {
        query['redirect'] = route.fullPath
        return redirect('/login', query)
    }
}