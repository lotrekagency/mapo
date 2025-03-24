<template>
  <div class="d-flex">
    <v-list-item dense class="darker__item" link @click.native="login">
      <template v-slot:prepend>
        <!-- <v-icon v-if="$mapo.$auth.user.isLoggedIn">mdi-logout</v-icon> -->
       <v-icon v-if="false">mdi-logout</v-icon>
        <v-icon v-else>mdi-login</v-icon>
      </template>
      <v-list-item-title>{{
        // $mapo.$auth.user.isLoggedIn ? $t("mapo.logout") : $t("mapo.login")
        $t("mapo.login")
      }}</v-list-item-title>
    </v-list-item>
    <v-list-item
      dense
      link
      v-if="$i18n.locales.length > 1"
      class="lang__selector darker__item"
    >
      <LangSwitcher></LangSwitcher>
    </v-list-item>
  </div>
</template>

<style lang="scss" scoped>
.darker__item {
  &.theme--light {
    background: #ffffffd6;
  }
  &.theme--dark {
    background: #121212;
  }
}
.lang__selector {
  max-width: 70px;
  flex-basis: content;
  overflow: hidden;
  padding: 0;
  v-select {
    border-radius: 0px;
  }
}
</style>

<script>
export default {
  name: "LogoutButton",
  methods: {
    login() {
      // this.$mapo.$auth.user.isLoggedIn
      //   ? this.$store.dispatch("mapo/user/logout")
      //   : this.$router.push("/login");
    },
  },
};
</script>
