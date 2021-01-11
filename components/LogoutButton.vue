<template>
  <v-btn @click.native="logout" rounded dark> Logout </v-btn>
</template>

<script>
export default {
  methods: {
    async logout() {
      await this.$store.dispatch("modules/user/logout");
      this.$router.push(`/login?redirect=${this.$route.fullPath}`);
    },
  },
};
</script>