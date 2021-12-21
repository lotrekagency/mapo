const trimslashes = (str) => (str || "").replace(/^\/|\/$/g, '')
const endpointError = "This crud is badly configured. No endpoint was passed"

/**
 * This function generates a fully functional crud helper given the endpoint.
 * 
 * @alias $api.crud
 * @param {string} endpoint This is the endpoint that will be used for all the methods exposed by this function.
 * @param {external:AxiosRequestConfig} [higherConf={}] This is an axios configuration object that allows you to inject all the additional options you want.
 * 
 */
const createRepository = ($axios) => (endpoint, higherConf = {}) => ({
    /**
     * This makes a GET http call to the crud endpoint. Returns as a promise the server response.
     * @alias $api.crud.list
     * @param {external:AxiosRequestConfig} [config]
     * @returns {Promise<external:AxiosResponse>}
     */
    list(config) {
        const func = $axios.$get(`/${trimslashes(endpoint)}/`, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },

    /**
     * This makes a POST http call with the data specified in the payload to the crud endpoint. Returns as a promise the server response.
     * @alias $api.crud.create
     * @param {Object} payload The payload containing the data that we want to send.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    create(payload, config) {
        const func = $axios.$post(`/${trimslashes(endpoint)}/`, payload, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },

    /**
     * This makes a GET http call to the crud endpoint slash the given id. Returns as a promise the server response.
     * @alias $api.crud.detail
     * @param {String} id The id of the data we want to get from the server.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    detail(id, config) {
        const func = $axios.$get(`/${trimslashes(endpoint)}/${id}/`, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },

    /**
     * This shortcut calls the update method or the create method depending on the presence of the id field in the payload.
     * @alias $api.crud.updateOrCreate
     * @param {Object} payload The payload containing the data that we want to send.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    updateOrCreate(payload, config) {
        const func = payload.id ? this.update(payload.id, payload, { ...higherConf, ...config }) : this.create(payload, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },

    /**
     * This makes a PUT http call to the crud endpoint slash the given id, sending the payload. Returns as a promise the server response.
     * @alias $api.crud.update
     * @param {String} id The id of the data we want to update.
     * @param {Object} payload The payload containing the data that we want to send.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    update(id, payload, config) {
        const func = $axios.$put(`/${trimslashes(endpoint)}/${id}/`, payload, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },

    /**
     * This makes a PATCH http call to the crud endpoint slash the given id, sending the payload. Returns as a promise the server response.
     * @alias $api.crud.partialUpdate
     * @param {String} id The id of the data we want to partially update.
     * @param {Object} payload The payload containing the data that we want to send.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    partialUpdate(id, payload, config) {
        const func = $axios.$patch(`/${trimslashes(endpoint)}/${id}/`, payload, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    },
    /** 
     * This makes a DELETE http call to the crud endpoint slash the given id. Returns as a promise the server response.
     * @alias $api.crud.delete
     * @param {String} id The id of the data we want to delete from the server.
     * @param {external:AxiosRequestConfig} [config] This is a further axios configuration object that allows you to override the options previously setted.
     * @returns {Promise<external:AxiosResponse>}
     */
    delete(id, config) {
        const func = $axios.$delete(`/${trimslashes(endpoint)}/${id}/`, { ...higherConf, ...config })
        return endpoint !== null ? func : Promise.reject(endpointError)
    }
})
/**
 * @external AxiosResponse
 * @see https://axios-http.com/docs/res_schema
 */

/** 
 * @external AxiosRequestConfig
 * @see https://axios-http.com/docs/req_config
 */

module.exports = createRepository