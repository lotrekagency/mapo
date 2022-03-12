<template>
  <v-app-bar
    :clipped-left="this.$store.getters['mapo/app/clipped']"
    fixed
    app
    flat
    dense
  >
    <v-app-bar-nav-icon @click.stop="drawerReverse()" />
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <v-icon @click="toggleTheme">mdi-theme-light-dark</v-icon>
  </v-app-bar>
</template>

<script>
export default {
  name: "Topbar",
  props: {
    title: String,
  },
  methods: {
    drawerReverse() {
      this.$store.dispatch("mapo/app/toggleSidebarDrawer");
    },
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
