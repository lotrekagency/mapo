<template>
  <v-list-item>
    <v-list-item-avatar v-if="avatar">
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-icon v-else>
      <v-icon>mdi-account</v-icon>
    </v-list-item-icon>
    <v-list-item-title>
      <span v-if="isLoggedIn">
        {{ username }}
      </span>
      <NuxtLink v-else to="/login">{{ $t("mapo.login") }}</NuxtLink>
    </v-list-item-title>
    <v-btn icon @click.stop="toggleMiniVariant">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>
</template>


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
