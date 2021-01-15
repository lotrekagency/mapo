<template>
  <v-app-bar
    :clipped-left="this.$store.state.bossa.sidebar.clipped"
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
        Ciao, Utente
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
@import '~bossamodule/assets/variables.scss';

.topbar {
  &__wrapper {
    background: $black!important;
    color: $white;
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
  data() {
    return {
      drawer: true
    };
  },
  props: {
    title: String,
    clipped: Boolean
  },
  methods: {
    drawerReverse () {
      this.$store.dispatch("toggleSidebarDrawer");
    },
  },
  mounted: function () {
    
  },
};
</script>
