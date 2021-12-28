<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <h1>This is the setting page</h1>
      </v-col>
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
