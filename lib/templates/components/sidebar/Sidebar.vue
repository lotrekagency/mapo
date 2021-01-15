<template>
  <v-navigation-drawer
    v-model="drawerSetter"
    :mini-variant="miniVariant"
    :clipped="this.$store.clipped"
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
        return this.$store.state.bossa.sidebar.drawer;
      },
      set() {
        return this.$store.state.bossa.sidebar.drawer;
      }
    }
  },
  methods: {
    drawerReverse () {
      return this.drawer = !this.drawer
    },
  },
  mounted: function () {
    
  }
}
</script>
