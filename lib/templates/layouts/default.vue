<template>
  <v-app class="app__wrapper">
    <Sidebar />    
    <Topbar :title="$t('panel_title')" :drawer="this.$store.getters['mapo/app/drawer']" />
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';

.app {
  &__wrapper {
    background: $w-1;
  }
}
</style>

<script>

export default {
  data () {
    return {
    }
  },
  mounted: function () {

}
}
</script>
