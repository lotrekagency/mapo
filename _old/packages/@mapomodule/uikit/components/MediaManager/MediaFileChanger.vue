<template>
  <div>
    <div class="d-flex flex-column flex-grow-1">
      <v-file-input
        v-model="newFile"
        :accept="accept"
        :label="$t('mapo.mediaEditor.changeFile')"
        show-size
        dense
        prepend-icon
        outlined
        class="rounded-0"
      ></v-file-input>
      <v-checkbox
        v-if="newFile"
        v-model="sameUrl"
        :label="$t('mapo.mediaEditor.maintainOldUrl')"
        class="ma-0"
        hide-details
        dense
      ></v-checkbox>
    </div>
    <v-img
      v-if="newFile && newFilePreview"
      :src="newFilePreview"
      aspect-ratio="1"
      min-width="70px"
      max-width="110px"
      class="grey lighten-2 ml-3"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular
            indeterminate
            color="grey lighten-5"
          ></v-progress-circular>
        </v-row>
      </template>
    </v-img>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newFile: null,
      sameUrl: false,
    };
  },
  props: {
    accept: String,
    file: {},
    maintainUrl: Boolean,
  },
  watch: {
    newFile(val) {
      this.$emit("update:file", val);
    },
    file(val) {
      this.newFile = val;
    },
    sameUrl(val) {
      this.$emit("update:maintainUrl", val);
    },
    maintainUrl(val) {
      this.sameUrl = val;
    },
  },
  computed: {
    newFilePreview() {
      return this.newFile?.type?.startsWith("image/")
        ? URL.createObjectURL(this.newFile)
        : null;
    },
  },
};
</script>
