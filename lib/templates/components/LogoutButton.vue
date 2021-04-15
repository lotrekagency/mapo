<template>
  <v-btn @click.native="logout" class="logout__btn">
    <v-icon class="logout__icon">mdi-logout</v-icon>
    <span class="logout__text">Logout</span>
  </v-btn>
</template>

<script>
export default {
  name: "LogoutButton",
  methods: {
    logout() {
      this.$store.dispatch("mapo/user/logout");
    },
  },
};
</script>

<style lang="scss" scoped>
.logout {
  &__btn {
    padding: 0.5rem 1rem!important;
    height: auto!important;
  }
  &__icon {
    margin-right: 0.5rem;
    font-size: 1rem;
  }
  &__text {
    text-align: left;
    display: block;
    width: 100%;
    font-size: 1rem;
    text-transform: capitalize;
    font-weight: 400;
    letter-spacing: initial;
  }
}
</style>