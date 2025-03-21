<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="miniVariant"
    width="300"
    :clipped="this.$store.app.get_clipped"
    fixed
    app
  >
    <div class="menu--container">
      <div class="menu--container-top">
        <component v-if="componentExists('MapoSidebarTitleTopSlot')" :is="'MapoSidebarTitleTopSlot'" />
        <component v-if="componentExists('MapoSidebarTitleSlot')" :is="'MapoSidebarTitleSlot'" />
        <LayoutSidebarTitle v-else />
        <component v-if="componentExists('MapoSidebarTitleBottomSlot')" :is="'MapoSidebarTitleBottomSlot'" />
        <v-divider></v-divider>
      </div>
      <div class="menu--container-center">
        <component v-if="componentExists('MapoSidebarListTopSlot')" :is="'MapoSidebarListTopSlot'" />
        <component v-if="componentExists('MapoSidebarListSlot')" :is="'MapoSidebarListSlot'" />
        <LayoutSidebarList v-else :force-collapse="miniVariant" />
        <component v-if="componentExists('MapoSidebarListBottomSlot')" :is="'MapoSidebarListBottomSlot'" />
      </div>
     <div class="menu--container-bottom">
        <v-divider></v-divider>
        <component v-if="componentExists('MapoSidebarListFooterTopSlot')" :is="'MapoSidebarListFooterTopSlot'" />
        <component v-if="componentExists('MapoSidebarListFooterSlot')" :is="'MapoSidebarListFooterSlot'" />
        <LayoutSidebarList v-else footer :force-collapse="miniVariant" />
        <component v-if="componentExists('MapoSidebarListFooterBottomSlot')" :is="'MapoSidebarListFooterBottomSlot'" />
        <v-divider></v-divider>
        <component v-if="componentExists('MapoLogoutButtonTopSlot')" :is="'MapoLogoutButtonTopSlot'" />
        <component v-if="componentExists('MapoLogoutButtonSlot')" :is="'MapoLogoutButtonSlot'" />
        <LogoutButton v-else />
        <component v-if="componentExists('MapoLogoutButtonBottomSlot')" :is="'MapoLogoutButtonBottomSlot'" />
     </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
.menu--container {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-top{
    justify-self: flex-start;
  }
  &-center{
    flex: 1;
  }
  &-bottom{
    justify-self: flex-end;
  }
}
</style>

<script>
// @vuese
export default {
  setup(){
    const $store = useNuxtApp().$store
    return { $store }
  },
  name: "Sidebar",
  computed: {
    drawer: {
      get() {
        return this.$store.app.drawer;
      },
      set(value) {
        if (this.$store.app.drawer !== value)
          this.$store.app.toggleSidebarDrawer();
        return value;
      },
    },
    miniVariant: {
      get() {
        return this.$store.app.minivariant;
      },
      set(value) {
        if (this.$store.app.minivariant !== value)
          this.$store.app.toggleSidebarMinivariant();
        return value;
      },
    },
  },
  methods:{
    componentExists(name){
      // return name in this.$options.components;
      // TODO: check if is the correct way to check if a component exists
      return name in getCurrentInstance()?.appContext.components;
    }
  }
};
</script>
