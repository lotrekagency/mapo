export default defineNuxtRouteMiddleware((to, from) => {
  const $mapo = useNuxtApp()?.$mapo;
  const isLoggedIn = $mapo?.$auth?.user?.isLoggedIn;

  if (!isLoggedIn) {
      const query = { redirect: to.fullPath }
      return navigateTo({ path: `/login`, query })
  }
})
