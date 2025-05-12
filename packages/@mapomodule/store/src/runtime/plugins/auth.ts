import { useCookie, useHydration } from "#app"

export default defineNuxtPlugin({order: 3, dependsOn: 'pinia', setup: (nuxtApp) => {
  const $store = useNuxtApp().$store;

  const __mapo_session = useCookie('__mapo_session').value
  const sidebar_drawer = useCookie('sidebar_drawer').value
  const sidebar_clipped = useCookie('sidebar_clipped').value
  const sidebar_minivariant = useCookie('sidebar_minivariant').value

  $store?.app?.SET_DRAWER(sidebar_drawer)
  $store?.app?.SET_CLIPPED(sidebar_clipped)
  $store?.app?.SET_MINIVARIANT(sidebar_minivariant)

  console.log('*****************__mapo_session', __mapo_session, $store.app)

  if (__mapo_session) {
    console.log('******ENTROOOOO***********__mapo_session', __mapo_session, $store.user)
    useHydration(
      'user',
      () => $store.user,
      () => $store?.user?.SET_TOKEN(__mapo_session)
    )
    useHydration(
      'user',
      () => $store.user,
      () => $store?.user?.SET_LOGGEDIN(true)
    )
    $store?.user?.SET_TOKEN(__mapo_session)
    $store?.user?.SET_LOGGEDIN(true)
    $store?.user?.getInfo().catch(async (e) => {
      console.error(`Error occurred calling backend app:\n${e.stack || e}\nCannot maintain your session in ssr.`);
      $store?.user?.logout().catch(() => {})
    })
  }
}})
