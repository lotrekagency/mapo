<template>
  <v-list-item class="sidebar-title--container">
    <v-list-item-icon>
      <v-icon color="secondary">mdi-artstation</v-icon>
    </v-list-item-icon>
    <v-list-item-title>
        <b>BACKOFFICE</b>
    </v-list-item-title>
    <v-btn icon @click.stop="toggleMiniVariant">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>
</template>

<style lang="scss">
.sidebar-title--container{
  background: var(--v-primary-base);
  color: var(--v-secondary-base);
}
</style>

<script>
// @vuese
export default {
  computed: {
    username() {
      return this.isLoggedIn ? this.$mapo.$auth.user.username : "";
    },
    avatar() {
      return this.$mapo.$auth.user.avatar;
    },
    isLoggedIn() {
      return this.$mapo.$auth.user.isLoggedIn;
    },
  },
  methods: {
    toggleMiniVariant() {
      this.$store.dispatch("mapo/app/toggleSidebarMinivariant");
    },
  },
};
</script>
