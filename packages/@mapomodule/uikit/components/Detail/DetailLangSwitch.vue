<template>
  <v-tabs v-model="tab">
    <v-tab v-for="lang in langs" :key="lang">
      <v-badge :value="hasErrors(lang)" color="error" dot>
        {{ lang }}
      </v-badge>
    </v-tab>
  </v-tabs>
</template>

<script>
import { getPointed } from "@mapomodule/utils/helpers/objHelpers";
/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render and manage all the language choices for the payload.
 */
export default {
  name: "DetailLangSwitch",
  data() {
    return {
      tab: null,
    };
  },
  props: {
    // V-model representing the current selected language.
    value: String,
    // A list of languages into which the payload needs to be translated.
    langs: {
      type: Array,
      default: () => [],
    },
      // An object representing all the errors of all fields. This component will find errors in each language and will display a little dot in the tab if there are any errors.
    errors: Object,
  },
  computed: {
    currentLang() {
      return this.langs[this.tab];
    },
  },
  watch: {
    tab(val) {
      this.saveQparams();
      // Fired when the v-model changes.
      // @arg Emits the current language choice.
      this.$emit("input", this.langs[val]);
    },
    value(val) {
      this.tab = this.langs.indexOf(val);
    },
  },
  methods: {
    saveQparams() {
      const { lang } = this.$route.query;
      if (lang !== this.currentLang) {
        this.$router.replace({
          query: { ...this.$route.query, lang: this.currentLang },
        });
      }
    },
    hasErrors(lang) {
      const error = getPointed(
        this.errors || {},
        `translations.${lang}`,
        false
      );
      return error && Object.keys(error).length;
    },
  },
  mounted() {
    this.tab = this.langs.indexOf(this.$route.query.lang);
  },
};
</script>