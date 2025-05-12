import { useCookie } from "#app"

let token = null

export default defineNuxtPlugin({order: 3, setup: async (nuxtApp) => {
  if (import.meta.server) {
    const $store = nuxtApp.$store;
  
    const __mapo_session = useCookie('__mapo_session').value
    const sidebar_drawer = useCookie('sidebar_drawer').value
    const sidebar_clipped = useCookie('sidebar_clipped').value
    const sidebar_minivariant = useCookie('sidebar_minivariant').value
  
    $store?.app?.SET_DRAWER(sidebar_drawer)
    $store?.app?.SET_CLIPPED(sidebar_clipped)
    $store?.app?.SET_MINIVARIANT(sidebar_minivariant)
  
    token = __mapo_session
    // if (__mapo_session) {
    //       useHydration(
    //   'user',
    //   () => $store.user,
    //   () => $store?.user?.SET_TOKEN(__mapo_session)
    // )
    // useHydration(
    //   'user',
    //   () => $store.user,
    //   () => $store?.user?.SET_LOGGEDIN(true)
    // )
      console.log('******ENTROOOOO***********__mapo_session', __mapo_session, $store.user)
      await $store?.user?.SET_TOKEN(__mapo_session)
      await $store?.user?.SET_LOGGEDIN(true)
      await $store?.user?.getInfo().catch(async (e) => {
        console.error(`Error occurred calling backend app:\n${e.stack || e}\nCannot maintain your session in ssr.`);
        $store?.user?.logout().catch(() => {})
      })
    }
  }

  // if (import.meta.client) {
  //   const $store = nuxtApp.$store;

  //   // const __mapo_session = useState('mapo_session').value

  //   console.log('*******client**********__mapo_session', token)

  //   if (token) {
  //     await $store?.user?.SET_TOKEN(token)
  //     await $store?.user?.SET_LOGGEDIN(true)
  //     await $store?.user?.getInfo().catch(async (e) => {
  //       console.error(`Error occurred calling backend app:\n${e.stack || e}\nCannot maintain your session in ssr.`);
  //       $store?.user?.logout().catch(() => {})
  //     })
  //   }
  // }

  // if (process.server) {
//     const sessionid = useCookie('sessionid').value;
//     if (sessionid) {
//       const { error } = await useCurrentUserStore().fetchCurrentUser();
//       if (error?.value) {
//         if (error.value.statusCode === 401) {
//           useAuthStore().setLoggedInState(false);
//         } else {
//           throw createError(
//             error.value
//           );
//         }
//       } else {
//         useAuthStore().setLoggedInState(true);
//       }
//     }
//   }
})
