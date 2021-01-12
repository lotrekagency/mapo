<template>
  <v-app class="app__wrapper">
    <v-navigation-drawer
      v-model="drawerSetter"
      :mini-variant="miniVariant"
      :clipped="this.$store.state.sidebar.clipped"
      fixed
      app
    >
      <div class="sidebar__core">
        <SidebarList />
        <SidebarFooter />
      </div>
    </v-navigation-drawer>
    <Topbar :title="title" :drawer="drawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~assets/variables.scss';

.sidebar {
  &__core {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: $b-1;
    color: $white;
  }
}
.app {
  &__wrapper {
    background: $w-1;
  }
}
</style>

<script>
import { mapMutations } from 'vuex'
import Topbar from '~/components/topbar/Topbar.vue'
import LogoutButton from '../components/LogoutButton.vue'

export default {
  components: { LogoutButton, Topbar, },
  data () {
    return {
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Homepage',
          to: '/'
        },
        {
          title: 'Inspire',
          to: '/inspire'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Camomilla'
    }
  },
  computed: {
    drawerSetter: {
      get() {
        return this.$store.state.sidebar.drawer;
      },
      set() {
        return this.$store.state.sidebar.drawer;
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
