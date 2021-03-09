export default ({ $axios, store }) => {

    $axios.onRequest((config) => {
        const token = store.getters['mapo/user/token']
        if (token && token !== 'undefined') {
            config.headers['Authorization'] = `Token ${token}`
        }
        return config
    })

    $axios.onResponse((response) => {
        if (response.status !== 200) {
            if (response.status === 401 || response.status === 402 || response.status === 403) {
                store.dispatch('mapo/user/logout').then(() => {
                    location.reload()
                })
            }
        }
        return response
    })

    $axios.onError((error) => {
        const { status } = error.response || {}
        if (status === 401 || status === 402 || status === 403) {
            store.dispatch('mapo/user/logout').then(() => {
                location.reload()
            })
        }
        return Promise.reject(error)
    })
}