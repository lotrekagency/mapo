import { createError, defineNuxtRouteMiddleware, useNuxtApp } from "#app";

export default defineNuxtRouteMiddleware(async (to, from) => {
  to.meta = Array.isArray(to.meta) ? to.meta?.[0] : to.meta;

  console.log('[MAPOMODULE CORE] Permissions Middleware:', { to })

  if (!to.meta?.permissions) return;

  console.log('[MAPOMODULE CORE] Permissions Middleware with permissions:', { permissions: to.meta?.permissions })

  const $store = useNuxtApp()?.$store
  const $mapo = useNuxtApp()?.$mapo;

  console.log('[MAPOMODULE CORE] Permissions Middleware check store and mapo:', { $store, $mapo })

  const userInfo = $store?.user?.info;
  const userInfoMapo = $mapo?.$auth?.user?.info;

  console.log('[MAPOMODULE CORE] Permissions Middleware user info:', { userInfo, userInfoMapo })

  if (userInfo?.is_superuser) {
    await $store?.user?.addPagePermission({
      key: to.name?.toString()!,
      value: ["add", "change", "delete", "view"],
    });
    return;
  }

  const model = to.meta?.permissions?.model;
  const userPermission = (
    userInfo?.all_permissions ||
    userInfo?.user_permissions ||
    []
  )
    .filter((perm) => perm?.codename?.endsWith(model))
    .map(({ codename }) => codename.replace(`_${model}`, ""));

  console.log('[MAPOMODULE CORE] Permissions Middleware user info:', { userPermission })

  if (!userPermission?.includes("view")) {
    console.log('[MAPOMODULE CORE] Permissions Middleware no view permission, returning error')
    return createError({
      statusCode: 404,
      message: "This page could not be found",
    });
  } else {
    console.log('[MAPOMODULE CORE] Permissions Middleware adding page permission:', { key: to.name?.toString()!, value: userPermission })
    await $store?.user?.addPagePermission({
      key: to.name?.toString()!,
      value: userPermission,
    });
    return;
  }
})
