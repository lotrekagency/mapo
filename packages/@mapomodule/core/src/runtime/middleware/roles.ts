import { createError, defineNuxtRouteMiddleware, useNuxtApp } from "#app"

export default defineNuxtRouteMiddleware((to, from) => {
  to.meta = (Array.isArray(to.meta) ? to.meta?.[0] : to.meta) || {}
  const $store = useNuxtApp()?.$store

  console.log('[MAPOMODULE CORE] Roles Middleware:', { to, $store })

  return (
      to.meta?.roles && !$store?.user?.isSuperUser &&
      !to.meta?.roles?.includes?.($store?.user?.role) &&
      createError({ statusCode: 404, message: 'This page could not be found' })
  )
})
