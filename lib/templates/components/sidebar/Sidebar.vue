<template>
  <v-navigation-drawer
    v-model="drawerSetter"
    :mini-variant="miniVariant"
    :clipped="this.$store.getters['bossa/app/clipped']"
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
@import '~bossamodule/assets/variables.scss';

.sidebar {
  &__core {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $b-1;
    color: $white;
  }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      miniVariant: false,
    }
  },
  computed: {
    drawerSetter: {
      get() {
        return this.$store.getters['bossa/app/drawer'];
      },
      set(value) {
        if (this.$store.getters['bossa/app/drawer'] !== value)
          this.$store.dispatch("bossa/app/toggleSidebarDrawer");
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
