<template>
  <v-list-item @click.stop="toggleMiniVariant">
    <template v-slot:prepend>
      <v-avatar v-if="avatar" @click.stop="toggleMiniVariant">
        <v-img :src="avatar"></v-img>
      </v-avatar>
      <v-icon @click.stop="toggleMiniVariant" v-else>mdi-account</v-icon>
    </template>
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
    const $mapo = useNuxtApp()?.$mapo;
    const $store = useNuxtApp()?.$store;
    return { $mapo, $store }
  },
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
      this.$store.app.toggleSidebarMinivariant()
    },
  },
};
</script>
