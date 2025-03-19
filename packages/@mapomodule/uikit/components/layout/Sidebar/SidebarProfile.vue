<template>
  <v-list-item>
    <template v-slot:prepend>
      <v-avatar v-if="avatar">
        <v-img :src="avatar"></v-img>
      </v-avatar>
      <v-icon v-else>mdi-account</v-icon>
      <template v-slot:prepend>
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
  setup(){
    const store = useAppStore()
    const { toggleSidebarMinivariant } = store
    return { toggleSidebarMinivariant }
  },
  computed: {
    username() {
      // return this.isLoggedIn ? this.$mapo.$auth.user.username : "";
      return "username";
    },
    avatar() {
      // return this.$mapo.$auth.user.avatar;
      return null;
    },
    isLoggedIn() {
      // return this.$mapo.$auth.user.isLoggedIn;
      return false;
    },
  },
  methods: {
    toggleMiniVariant() {
      this.toggleSidebarMinivariant()
    },
  },
};
</script>
