<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="miniVariant"
    width="300"
    :clipped="this.$store.getters['mapo/app/clipped']"
    fixed
    app
  >
    <div class="menu--container">
      <div class="menu--container-top">
        <component v-if="componentExists('MapoSidebarTitleTopSlot')" :is="'MapoSidebarTitleTopSlot'" />
        <component v-if="componentExists('MapoSidebarTitleSlot')" :is="'MapoSidebarTitleSlot'" />
        <SidebarTitle v-else />
        <component v-if="componentExists('MapoSidebarTitleBottomSlot')" :is="'MapoSidebarTitleBottomSlot'" />
        <v-divider></v-divider>
      </div>
      <div class="menu--container-center">
        <component v-if="componentExists('MapoSidebarListTopSlot')" :is="'MapoSidebarListTopSlot'" />
        <component v-if="componentExists('MapoSidebarListSlot')" :is="'MapoSidebarListSlot'" />
        <SidebarList v-else :force-collapse="miniVariant" />
        <component v-if="componentExists('MapoSidebarListBottomSlot')" :is="'MapoSidebarListBottomSlot'" />
      </div>
     <div class="menu--container-bottom">
        <v-divider></v-divider>
        <component v-if="componentExists('MapoSidebarListFooterTopSlot')" :is="'MapoSidebarListFooterTopSlot'" />
        <component v-if="componentExists('MapoSidebarListFooterSlot')" :is="'MapoSidebarListFooterSlot'" />
        <SidebarList v-else footer :force-collapse="miniVariant" />
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
  name: "Sidebar",
  computed: {
    drawer: {
      get() {
        return this.$store.getters["mapo/app/drawer"];
      },
      set(value) {
        if (this.$store.getters["mapo/app/drawer"] !== value)
          this.$store.dispatch("mapo/app/toggleSidebarDrawer");
        return value;
      },
    },
    miniVariant: {
      get() {
        return this.$store.getters["mapo/app/minivariant"];
      },
      set(value) {
        if (this.$store.getters["mapo/app/minivariant"] !== value)
          this.$store.dispatch("mapo/app/toggleSidebarMinivariant");
        return value;
      },
    },
  },
  methods:{
    componentExists(name){
      return name in this.$options.components;
    }
  }
};
</script>
