<template>
  <v-app class="app__wrapper">
    <Sidebar />    
    <Topbar :title="title" :drawer="this.$store.state.sidebar.drawer" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~assets/variables.scss';

.app {
  &__wrapper {
    background: $w-1;
  }
}
</style>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      title: 'Pannello'
    }
  },
  mounted: function () {
    
  }
}
</script>
