<template>
  <v-dialog v-model="dialog" width="90vw">
    <template v-slot:activator="{ on, attrs }">
      <v-btn tile block @click="openPreview(true)" color="primary" class="mb-2">
        {{ $t("mapo.showPreview") }}</v-btn
      >
    </template>
    <v-card class="iframe-card">
      <iframe :src="computedUrl" class="iframe-preview"></iframe>
    </v-card>
  </v-dialog>
</template>

<style lang="scss" scoped>
.iframe-card {
  height: 90vh;
  min-height: 90vh;
}
.iframe-preview {
  width: 100%;
  height: 100%;
  border: none;
}
</style>

<script>
export default {
  name: "PagePreview",
  props: {
    pageUrl: {
      type: String,
      reruired: true,
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    openPreview() {
      this.dialog = true;
    },
  },
  computed: {
    checkifUrlIsAbsolute() {
      return this.pageUrl.startsWith("http");
    },
    computedUrl() {
      if (this.checkifUrlIsAbsolute) {
        return this.pageUrl;
      } else {
        return `/${this.pageUrl}`;
      }
    },
  },
};
</script>
