<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="miniVariant"
    width="300"
    :clipped="this.$store.getters['mapo/app/clipped']"
    fixed
    app
  >
    <div class="menu_container">
      <div>
        <SidebarProfile />
        <v-divider></v-divider>
      </div>
      <div class="menu_container">
        <SidebarList :force-collapse="miniVariant" />
        <SidebarFooter :force-collapse="miniVariant" />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import "@mapomodule/uikit/assets/variables.scss";
.menu_container {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  flex: 1;
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
};
</script>
