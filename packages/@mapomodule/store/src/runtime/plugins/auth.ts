import { defineNuxtPlugin, useCookie } from "#app";
import { useCustomFetch } from "#imports";

export default defineNuxtPlugin({
  order: 3,
  setup: async (nuxtApp) => {
    console.log("☠️ Setting up custom auth plugin");
    const { $store: { app, user }, $mapo } = nuxtApp;


    const __mapo_session = useCookie("__mapo_session").value;
    const sidebar_drawer = useCookie("sidebar_drawer").value;
    const sidebar_clipped = useCookie("sidebar_clipped").value;
    const sidebar_minivariant = useCookie("sidebar_minivariant").value;

    app?.SET_DRAWER(sidebar_drawer)
    app?.SET_CLIPPED(sidebar_clipped)
    app?.SET_MINIVARIANT(sidebar_minivariant)

    if (__mapo_session) {
      console.log('🚨 SETTING SESSION FROM COOKIE', __mapo_session);
      user?.SET_TOKEN(__mapo_session)
      user?.SET_LOGGEDIN(true)
      await $mapo?.$auth?.getInfo()
      // const url = process.env.USER_INFO_API || "/api/profiles/me/";
      // const resp = await useCustomFetch(url, { method: 'GET', headers: { "Cache-Control": "no-cache" } })
      // console.log('🚨 GET INFO RESPONSE', resp.data)
      // user.SET_INFO(resp.data)
      // user.UPDATE_PERMISSIONS(resp.data)
      // console.log('🚨 AFTER GET INFO', resp)
    }



    // console.log('*****************__mapo_session', __mapo_session)

  },
});
