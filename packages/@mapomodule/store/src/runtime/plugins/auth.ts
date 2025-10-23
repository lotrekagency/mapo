import { defineNuxtPlugin, useCookie, useRequestEvent, useRequestHeaders } from "#app";

export default defineNuxtPlugin({
  order: 3,
  setup: async (nuxtApp) => {

    if (import.meta.server === false) return;

    const __mapo_session = useCookie("__mapo_session").value
    const sidebar_drawer = useCookie("sidebar_drawer").value;
    const sidebar_clipped = useCookie("sidebar_clipped").value;
    const sidebar_minivariant = useCookie("sidebar_minivariant").value;

    // @ts-ignore TODO: manage provisioning type
    const { $store: { app } } = nuxtApp;

    app?.SET_DRAWER(sidebar_drawer)
    app?.SET_CLIPPED(sidebar_clipped)
    app?.SET_MINIVARIANT(sidebar_minivariant)

    if (__mapo_session) {

      // @ts-ignore TODO: manage provisioning type
      const { $store: { user } } = nuxtApp;
      user?.SET_TOKEN(__mapo_session)
      user?.SET_LOGGEDIN(true)

      const request = useRequestEvent()
      const headers = useRequestHeaders(['cookie']) // Needed to forward cookies
      const domain = request?.headers.get('host')
      const protocol = request?.headers.get('x-forwarded-proto') || 'http'

      // TODO: manage api url from config ?? or think something better
      const url = `${protocol}://${domain}/api/profiles/me/`;
      const resp = await $fetch(url, { method: 'GET', headers })
      user.SET_INFO(resp)
      user.UPDATE_PERMISSIONS(resp)
    } else {
      // @ts-ignore TODO: manage provisioning type
      const { $store: { user } } = nuxtApp;
      user?.SET_TOKEN(null)
      user?.SET_LOGGEDIN(false)
      user?.SET_INFO({})
      user?.UPDATE_PERMISSIONS({})
    }
  },
});
