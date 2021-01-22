import Middleware from '../middleware' // little hack to inject middleware in root project :P

Middleware.roles = Middleware.roles || async function ({ route, error, store }) {
    route.meta = (Array.isArray(route.meta) ? route.meta[0] : route.meta) || {}
    return (
        route.meta.roles && !store.getters['mapo/user/isSuperUser'] &&
        !route.meta.roles.includes(store.getters['mapo/user/role']) &&
        error({ statusCode: 404, message: 'This page could not be found' })
    )
}