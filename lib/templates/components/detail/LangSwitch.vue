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
import { getPointed } from "~mapomodule/utils/objHelpers";

export default {
  data() {
    return {
      tab: null,
    };
  },
  props: {
    value: String,
    langs: {
      type: Array,
      default: () => [],
    },
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