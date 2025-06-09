import { defineNuxtRouteMiddleware, navigateTo, useNuxtApp } from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
  const $mapo = useNuxtApp()?.$mapo;
  const isLoggedIn = $mapo?.$auth?.user?.isLoggedIn;

  console.log('[MAPOMODULE CORE] Auth Middleware:', { $mapo })

  if (!isLoggedIn) {
      setTimeout(() => {
        const query = { redirect: to.fullPath }
        return navigateTo({ path: `/login`, query })
      }, 100)
  }
})
