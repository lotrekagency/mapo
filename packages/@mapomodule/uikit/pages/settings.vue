<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col cols="12" class="d-flex">
        <h1>{{ $t('mapo.settings.title')}}</h1><v-spacer/><span class="text--secondary">{{version}}</span>
      </v-col>
      <v-divider class="col-12"></v-divider>
      <v-col cols="12" sm="4">
        <v-select outlined class="rounded-0" :value="themeMode" @change="setThemeMode" :label="$t('mapo.settings.themeMode')" :items="['dark', 'light']"></v-select>
      </v-col>
      <v-col cols="12" sm="4">
        <ColorField outlined :label="$t('mapo.settings.primaryColor')"></ColorField>
      </v-col>
      <v-col cols="12" sm="4">
        <ColorField outlined :label="$t('mapo.settings.secondaryColor')"></ColorField>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { version } from "mapomodule/package.json";
import { mapGetters, mapActions } from "vuex"


export default {
  meta: { sidebarHide: true },
  data: () => ({
    version: version
  }),
  computed:{
    ...mapGetters("mapo/app", ["themeMode", "themeColors", "themePrimary", "themeSecondary"])
  },
  methods: {
    ...mapActions("mapo/app", ["setThemeMode"]),
    applyTheme(){
      if (this.themeMode)
        this.$vuetify.theme.dark = this.themeMode == 'dark';
      for (let color in ["primary", "secondary"]){
        if (this.themeColors[color])
          this.$vuetify.theme[color] = this.themeColors[color];
      }
    },
  }

};
</script>
