<template>
    <MenuManager
      endpoint="api/camomilla/menus"
      :identifier="$route.params.detail"
    />
</template>

<script>
export default {
  meta: { sidebarHide: true, permissions: { model: "menu" } },
  middleware: ["auth", "permissions"],
};
</script>