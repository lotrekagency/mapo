<template>
  <v-app class="app__wrapper">
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <div class="sidebar__core">

        <SidebarList />

        <SidebarFooter />

      </div>

    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      flat
      dense
      class="topbar__wrapper"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
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
.app {
  &__wrapper {
    background: $w-1;
  }
}
</style>

<script>
import LogoutButton from '../components/LogoutButton.vue'
export default {
  components: { LogoutButton, },
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
  }
}
</script>
