
export default ($axios) => (endpoint) => ({
  
    list(config) {
        return $axios.$get(`/${endpoint}`, config)
    },

    create(payload, config) {
        return $axios.$post(`/${endpoint}`, payload, config)
    },

    detail(id, config) {
        return $axios.$get(`/${endpoint}/${id}`, config)
    },

    update(payload, id, config) {
        return $axios.$put(`/${endpoint}/${id}`, payload, config)
    },

    delete(id, config) {
        return $axios.$delete(`/${endpoint}/${id}`, config)
    }
})