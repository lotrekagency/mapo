import Middleware from '../../middleware' // little hack to inject middleware in root project :P

Middleware.permissions = Middleware.permissions || async function ({ route, error, store }) {
    route.meta = Array.isArray(route.meta) ? route.meta[0] : route.meta
    if (!route.meta.permissions) return
    const userInfo = store.getters['mapo/user/info']
    if (userInfo.is_superuser) {
        await store.dispatch('mapo/user/addPagePermission', {key: route.name, value: ["add", "change", "delete", "view"]})
        return
    }
    const { model } = route.meta.permissions
    const userPermission = (userInfo.user_permissions || []).filter(perm => perm.codename.endsWith(model)).map(({ codename }) => codename.replace(`_${model}`, ''))
    if (!userPermission.includes('view')) {
        return error({ statusCode: 404, message: 'This page could not be found' })
    } else {
        await store.dispatch('mapo/user/addPagePermission', {key: route.name, value: userPermission})
        return
    }
}