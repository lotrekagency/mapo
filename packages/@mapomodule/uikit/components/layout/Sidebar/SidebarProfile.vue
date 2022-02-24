<template>
  <v-list-item>
    <v-list-item-avatar v-if="avatar">
      <v-img :src="avatar"></v-img>
    </v-list-item-avatar>
    <v-list-item-icon v-else>
      <v-icon>mdi-account</v-icon>
    </v-list-item-icon>
    <v-list-item-title>{{ this.$mapo.$auth.user.username }}</v-list-item-title>
    <v-btn icon @click.stop="miniVariant = !miniVariant">
      <v-icon>mdi-chevron-left</v-icon>
    </v-btn>
  </v-list-item>
</template>


<script>
// @vuese
export default {
  computed: {
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
    username() {
      return this.$mapo.$auth.user.username;
    },
    avatar() {
      return this.$mapo.$auth.user.avatar;
    },
  },
};
</script>