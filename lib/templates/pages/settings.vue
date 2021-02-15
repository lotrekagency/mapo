<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <div>
        <label for="locales" class="settings__lang-switcher__label">{{
          $t("settings_language")
        }}</label>
        <v-select
          v-model="selectedLanguage"
          :items="this.$i18n.locales"
          color="primary"
          return-object
          item-text="name"
          item-value="code"
          item-color="primary"
          name="locales"
          id="locales"
          outlined
          dense
          hide-details
          light
          @change="changeLocal"
        ></v-select>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "settings",
  meta: { sidebarFooter: true, label: "sidebar_settings", icon: "mdi-cog" },
  data() {
    return {
      selectedLanguage: "en",
    };
  },
  methods:{
    changeLocal({code} = newLocal){
      console.log(code)
      this.$i18n.setLocale(code).then(response => {
        console.log(response)
      }).catch(error => {
        console.error(error)
      })
    }
  },
  mounted() {
    this.selectedLanguage = this.$i18n.getLocaleCookie() || this.i18n.defaultLocale;
  },
};
</script>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';
.settings {
  &__lang-switcher__label{
    color: $black;
  }
}
</style>


