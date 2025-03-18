<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <h1>{{ $t("title") }}</h1>
      </v-col>
      <v-col cols="12">
        <!-- <ThemeToggle/> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n lang="yaml">
en:
  title: "This is the setting page"
it:
  title: "Questa è la pagina delle impostazioni"
</i18n>

<style scoped>
</style>
<script>
export default {
  meta: { sidebarFooter: true, label: {translate: "settings"}, icon: "mdi-cog" },
  data() {
    return {
      fakeMedia: {
        file: 'https://tcdn.storeden.com/gallery/5f60ba115fb8e0cbd23c8f82'
      },
      links: [
        'https://i.picsum.photos/id/559/200/200.jpg?hmac=YMqBxDHO4-upCRoX_Ho2FNQg40ANP2MndFXD8sPsSAc',
        'https://i.picsum.photos/id/822/200/200.jpg?hmac=pXgRn-rbZIan3GYBv9xCVsdyt_Kzq5Q_d0AbLnzeT3k',
        'https://i.picsum.photos/id/337/200/300.jpg?hmac=0CnfGB9OuB4D8IneXqgjPMaGgLSHBKRjSkl_ITBmDxQ',
        'https://i.picsum.photos/id/117/200/200.jpg?hmac=hAXY0lMbkjkxYIKxW0UjtazVquGY1NCu3ruHLJGc4gs',
      ],
      medias: [],

      ids: [4],
      options: [
        {codice: 4, testo: 'ciao'},
        {codice: 10, testo: 'prova'},
        {codice: 20, testo: 'test'},
      ]
    };

  },
  methods:{
    changeFakeMedia(){
      const length = this.links.length;
      const i = Math.floor(Math.random() * length);
      this.fakeMedia={file: this.links[i]}
    },
    update(selection){
      this.medias = selection
      console.log(this.medias)
    }
  },
  watch: {
    fakeMedia(){
      console.log(this.fakeMedia)
    }
  },
};
</script>
