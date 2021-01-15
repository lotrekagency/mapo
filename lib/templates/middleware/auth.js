import { getToken } from '~bossamodule/utils/auth';
import Middleware from '../middleware' // little hack to inject middleware in root project :P

Middleware.auth = Middleware.auth || function ({ route, redirect, query }) {
    const hasToken = getToken()
    if (!hasToken) {
        query['redirect'] = route.fullPath
        return redirect('/login', query)
    }
}