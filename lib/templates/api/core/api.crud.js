const trimslashes = (str) => str.replace(/^\/|\/$/g, '')

export default ($axios) => (endpoint, higherConf = {}) => ({
    list(config) {
        return $axios.$get(`/${trimslashes(endpoint)}/`, { ...higherConf, ...config })
    },

    create(payload, config) {
        return $axios.$post(`/${trimslashes(endpoint)}/`, payload, { ...higherConf, ...config })
    },

    detail(id, config) {
        return $axios.$get(`/${trimslashes(endpoint)}/${id}/`, { ...higherConf, ...config })
    },

    updateOrCreate(payload, config) {
        return payload.id ? this.update(payload.id, payload, { ...higherConf, ...config }) : this.create(payload, { ...higherConf, ...config })
    },

    update(id, payload, config) {
        return $axios.$put(`/${trimslashes(endpoint)}/${id}/`, payload, { ...higherConf, ...config })
    },

    partialUpdate(id, payload, config) {
        return $axios.$patch(`/${trimslashes(endpoint)}/${id}/`, payload, { ...higherConf, ...config })
    },

    delete(id, config) {
        return $axios.$delete(`/${trimslashes(endpoint)}/${id}/`, { ...higherConf, ...config })
    }
})