<template>
  <v-app>
    <Sidebar />
    <Topbar :title="title" :drawer="this.$store.getters['mapo/app/drawer']" />
    <v-main>
      <nuxt />
      <root-components />
    </v-main>
  </v-app>
</template>


<script>
export default {
  data() {
    return {
      title: "Pannello"
    };
  }
};
</script>
