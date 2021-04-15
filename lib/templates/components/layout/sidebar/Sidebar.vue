<template>
  <v-navigation-drawer
    v-model="drawerSetter"
    :mini-variant="miniVariant"
    :clipped="this.$store.getters['mapo/app/clipped']"
    fixed
    app
  >
    <div class="sidebar__core">
      <SidebarList />
      <SidebarFooter />
    </div>
  </v-navigation-drawer>
</template>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';

.sidebar {
  &__core {
    display: flex;
    flex-direction: column;
    height: 100%;
    // background: $b-1;
    // color: $white;
  }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default {
  name: "Sidebar",
  data () {
    return {
      miniVariant: false,
    }
  },
  computed: {
    drawerSetter: {
      get() {
        return this.$store.getters['mapo/app/drawer'];
      },
      set(value) {
        if (this.$store.getters['mapo/app/drawer'] !== value)
          this.$store.dispatch("mapo/app/toggleSidebarDrawer");
        return value;
      }
    }
  },
  methods: {
    drawerReverse () {
      return this.drawer = !this.drawer
    },
  }
}
</script>
