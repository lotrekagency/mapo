<template>
  <v-app class="app__wrapper">
    <Sidebar />    
    <Topbar :title="title" :drawer="this.$store.getters['mapo/app/drawer']" />
    <v-main>
      <v-container>
        <nuxt />
        <SnackBar/>
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';

.app {
  &__wrapper {
    // background: $w-1;
  }
}
</style>

<script>

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
