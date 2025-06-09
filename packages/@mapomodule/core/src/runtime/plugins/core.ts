import { defineNuxtPlugin, useNuxtApp } from '#app'
import { createRepository } from '../api-utils/crud';
import { transformRequestInMultipart } from '../api-utils/multipart';

function getRouteMiddlewares(route) {
  const meta = Array.isArray(route?.meta) ? route.meta[0] : route.meta
  const { middleware } = meta || {}
  return (typeof middleware === "string" ? [middleware] : middleware) || []
}

// The order must be set to 2 to ensure this plugin initializes before the store plugin.
// TODO: Refactor this code to encapsulate everything into a single package and abstract this large object into a dedicated .ts module.
export default defineNuxtPlugin({
  order: 2, setup: (_nuxtApp) => {
    const $store = useNuxtApp().$store

    const mapo = {
      /**
       * From here you can reach some utilities that simplify the interaction with the backend api.
       */
      $api: {
        crud: createRepository(),
        multipart: transformRequestInMultipart,
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
        login: payload => $store?.user?.login(payload),
        /**
         *
         * This simply commits a logout to the vuex store.
         */
        logout: () => $store?.user?.logout(),
        /**
         * This refresh user informations present in vuex store and returns them.
         * @returns {UserData}
         */
        getInfo: () => $store?.user?.getInfo(),
        user: {
          get isLoggedIn() { return $store?.user?.isLoggedIn },
          get token() { return $store?.user?.token },
          get info() { return $store?.user?.info },
          get username() { return $store?.user?.username },
          get permissions() { return $store?.user?.pagePermission(useNuxtApp().$router.currentRoute.value.name || "") },
          get role() { return $store?.user?.role }
        },
        /**
         *
         * This returns the current route middlewares if routemeta is enabled.
         */
        get routeMiddlewares() {
          return getRouteMiddlewares(useNuxtApp().$router.currentRoute.value || {})
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
        open: payload => $store?.app?.showSnackMessage(payload),
        /**
         * This closes all the opened snack instances.
         */
        close: () => $store?.app?.clearSnackMessage(),
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
      },
      // $options: options
    };

    return {
      provide: {
        mapo
      }
    }
  }
})
