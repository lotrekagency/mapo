<template>
  <v-navigation-drawer
    v-model="drawerSetter"
    :mini-variant.sync="miniVariant"
    width="300"
    :clipped="this.$store.getters['mapo/app/clipped']"
    fixed
    app
  >
    <div class="menu_container">
      <div>
        <v-list-item>
          <v-list-item-avatar v-if="avatar">
            <v-img :src="avatar"></v-img>
          </v-list-item-avatar>
          <v-list-item-icon v-else>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{
            this.$mapo.$auth.user.username
          }}</v-list-item-title>
          <v-btn icon @click.stop="miniVariant = !miniVariant">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
        </v-list-item>
        <v-divider></v-divider>
      </div>
      <div class="menu_container">
        <SidebarList :force-collapse="miniVariant" />
        <SidebarFooter />
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
  data() {
    return {
      miniVariant: false
    };
  },
  computed: {
    drawerSetter: {
      get() {
        return this.$store.getters["mapo/app/drawer"];
      },
      set(value) {
        if (this.$store.getters["mapo/app/drawer"] !== value)
          this.$store.dispatch("mapo/app/toggleSidebarDrawer");
        return value;
      }
    },
    username() {
      return this.$mapo.$auth.user.username;
    },
    avatar() {
      return this.$mapo.$auth.user.avatar;
    }
  },
  methods: {
    drawerReverse() {
      return (this.drawer = !this.drawer);
    }
  }
};
</script>
