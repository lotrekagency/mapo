<template>
  <v-tabs v-model="tab">
    <v-tab v-for="lang in langs" :key="lang">
      {{ lang }}
    </v-tab>
  </v-tabs>
</template>

<script>
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
  },
  mounted() {
    this.tab = this.langs.indexOf(this.$route.query.lang);
  },
};
</script>