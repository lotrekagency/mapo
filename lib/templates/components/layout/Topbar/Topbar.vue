<template>
  <v-app-bar
    :clipped-left="this.$store.getters['mapo/app/clipped']"
    fixed
    app
    flat
    dense
    class="topbar__wrapper"
  >
    <v-app-bar-nav-icon @click.stop="drawerReverse()" />
    <v-toolbar-title v-text="title" />
    <v-spacer />

    <div class="topbar__user">
      <span class="topbar__user__name">
        Ciao, {{ this.$mapo.$auth.user.username }}
      </span>
      <v-btn
        class="topbar__user__btn"
        icon
      >
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>
  </v-app-bar>
</template>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';

.topbar {
  &__wrapper {
    // background: $black!important;
    // color: $white;
  }
  &__user {
    display: flex;
    align-items: center;
    &__name {
      margin-right: 0.5rem;
    }
  }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Topbar",
  props: {
    title: String
  },
  methods: {
    drawerReverse () {
      this.$store.dispatch("mapo/app/toggleSidebarDrawer");
    },
  },
};
</script>
