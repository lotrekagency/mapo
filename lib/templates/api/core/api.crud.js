const trimslashes = (str) => str.replace(/^\/|\/$/g, '')

export default ($axios) => (endpoint) => ({
    list(config) {
        return $axios.$get(`/${trimslashes(endpoint)}/`, config)
    },

    create(payload, config) {
        return $axios.$post(`/${trimslashes(endpoint)}/`, payload, config)
    },

    detail(id, config) {
        return $axios.$get(`/${trimslashes(endpoint)}/${id}/`, config)
    },

    updateOrCreate(payload, config) {
        return payload.id ? this.update(payload.id, payload, config) : this.create(payload, config)
    },

    update(id, payload, config) {
        return $axios.$put(`/${trimslashes(endpoint)}/${id}/`, payload, config)
    },

    delete(id, config) {
        return $axios.$delete(`/${trimslashes(endpoint)}/${id}/`, config)
    }
})