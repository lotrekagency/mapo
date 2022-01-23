import createRepository from '@mapomodule/core/api/crud'
import transformRequestInMultipart from '@mapomodule/core/api/multipart'
import initInterceptors from '@mapomodule/core/interceptor'

function getRouteMiddlewares(route) {
    const meta = Array.isArray(route?.meta) ? route.meta[0] : route.meta
    const { middleware } = meta || {}
    return (typeof middleware === "string" ? [middleware] : middleware) || []
}


export default (ctx, inject) => {

    initInterceptors(ctx)

    inject('mapo', {
        /**
         * From here you can reach some utilities that simplify the interaction with the backend api.
         */
        $api: {
            crud: createRepository(ctx.$axios),
            multipart: transformRequestInMultipart
        },
        /**
         * From here you can reach some utilities that simplify the interaction with the user authentication flow.
         */
        $auth: {
            /**
             * Here you can submit your login credentials to the vuex store.
             * 
             * @param { Object } payload { username, password } aka user credentials for the login request.
             */
            login: payload => ctx.store.dispatch("mapo/user/login", payload),
            /**
             * 
             * This simply commits a logout to the vuex store.
             */
            logout: () => ctx.store.dispatch("mapo/user/login"),
            /**
             * This refresh user informations present in vuex store and returns them.
             * @returns {UserData}
             */
            getInfo: () => ctx.store.dispatch("mapo/user/getInfo"),
            user: {
                get isLoggedIn() { return ctx.store.getters['mapo/user/isLoggedIn'] },
                get token() { return ctx.store.getters['mapo/user/token'] },
                get info() { return ctx.store.getters['mapo/user/info'] },
                get username() { return ctx.store.getters['mapo/user/username'] },
                get permissions() { return ctx.store.getters['mapo/user/pagePermission'](ctx.app?.context?.route?.name || "") },
                get role() { return ctx.store.getters['mapo/user/role'] }
            },
            /**
             * 
             * This returns the current route middlewares if routemeta is enabled.
             */
            get routeMiddlewares() {
                return getRouteMiddlewares(ctx.app?.context?.route || {})
            },
            /**
             * 
             * This returns the middlewares of a given route if routemeta is enabled.
             * @param { Object } route { meta } the route object with meta info.
             * @returns { Array } 
             */
            getRouteMiddlewares: getRouteMiddlewares
        },
        /**
         * From here you can manage the default popup messaging system of mapo.
         */
        $snack: {
            /**
             * This send a message to the snack vuex store bringing up the component that carries the message to the user.
             * 
             * @param {SnackMessage} payload The payload containing the message.
             * @returns {Promise}
             */
            open: payload => ctx.store.dispatch("mapo/app/showSnackMessage", payload),
            /**
             * This closes all the opened snack instances.
             */
            close: () => ctx.store.dispatch("mapo/app/clearSnackMessage"),
        },
        /**
         * From here you can manage the default confirm dialog of mapo.
         */
        $confirm: {
            /**
             * This open the Confirm dialog component showing to the user a question. Returns a promise with the user response.
             * @function
             * @param {ConfirmDialogOptions} payload The payload containing the information to show to the user in the confirm dialog.
             * @returns {Promise<boolean>} The response from the user interaction.
             */
            open: null,

            /**
             * This forces the dialog to close, giving a positive response.
             * @function
             */
            accept: null,
            /**
             * This forces the dialog to close, giving a negative response.
             * @function
             */
            close: null
        }
    })
}

/**
 * The payload that need to be sent to the store in order to make the snack appear.
 * @typedef {SnackMessage} SnackMessage
 * @property {string} message - Contains the message to show.
 * @property {string} color - Indicates the color of the close button.
 */

/**
 * The payload for the open function of the ConfirmDialog.
 * @typedef {ConfirmDialogOptions} ConfirmDialogOptions
 * @property {string} title - The title of the dialog.
 * @property {string} question - The text in the body of the dialog.
 * @property {string} dismissButton - The text in the dismiss Button.
 * @property {string} approveButton - The text in the approve Button.
 * @property {Object} attrs - An object with {@link https://vuetifyjs.com/en/api/v-dialog/|props} you want to inject into the confirm dialog.
 */