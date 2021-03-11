<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <h1>This is the setting page</h1>
      </v-col>
    </v-row>

    <v-row>
      <MediaElement/>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>
<script>
export default {
  meta: { sidebarFooter: true, label: "Impostazioni", icon: "mdi-cog" },
  data() {
    return {
      fakeMedia: {
        file: 'https://tcdn.storeden.com/gallery/5f60ba115fb8e0cbd23c8f82'
      }
    };
  },
  watch: {
    fakeMedia(){
      console.log(this.fakeMedia)
    }
  }
};
</script>
