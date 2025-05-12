export default defineNuxtRouteMiddleware(async (to, from) => {
  to.meta = Array.isArray(to.meta) ? to.meta?.[0] : to.meta;
  if (!to.meta?.permissions) return;

  const $store = useNuxtApp()?.$store
  const userInfo = $store?.user?.info;
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

  if (!userPermission?.includes("view")) {
    return createError({
      statusCode: 404,
      message: "This page could not be found",
    });
  } else {
    await $store?.user?.addPagePermission({
      key: to.name?.toString()!,
      value: userPermission,
    });
    return;
  }
})
