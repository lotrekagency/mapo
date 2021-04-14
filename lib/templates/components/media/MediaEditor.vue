<template>
  <div v-if="media">
    <div class="d-flex align-center justify-space-between">
      <v-btn class="ma-2" @click="close" icon>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span class="subtitle-2">{{ fileName }}</span>
      <div></div>
    </div>
    <v-container class="px-6">
      <v-img
        :src="media.file"
        :lazy-src="media.thumbnail"
        max-height="300"
        contain
        aspect-ratio="1"
        class="grey lighten-2 mb-4 elevation-2"
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
      <v-row class="flex-md-row-reverse">
        <v-col md="6" cols="12" class="info-media">
          <table class="text-caption fill-height pb-md-10">
            <tr>
              <td class="pr-3"><b>Filename:</b></td>
              <td>{{ fileName }}</td>
            </tr>
            <tr>
              <td class="pr-3"><b>Extension:</b></td>
              <td>{{ extension }}</td>
            </tr>
            <tr>
              <td class="pr-3"><b>Created:</b></td>
              <td>{{ dateCreated }}</td>
            </tr>
            <tr>
              <td class="pr-3"><b>Size:</b></td>
              <td>{{ fileSize }}</td>
            </tr>
            <tr>
              <td class="pr-3"><b>Url:</b></td>
              <td>
                <a :href="media.file" target="_blank">{{ media.file }}</a>
              </td>
            </tr>
            <tr>
              <td class="pr-3"><b>Linked models:</b></td>
              <td>{{ media.liks }}</td>
            </tr>
          </table>
        </v-col>
        <v-col md="6" cols="12">
          <v-row>
            <v-col sm="6" md="12" cols="12">
              <v-text-field
                dense
                v-model="media.name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col sm="6" md="12" cols="12">
              <v-text-field
                dense
                v-model="media.title"
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col sm="6" md="12" cols="12">
              <v-text-field
                dense
                v-model="media.description"
                label="Description"
              ></v-text-field>
            </v-col>
            <v-col sm="6" md="12" cols="12">
              <v-text-field
                dense
                v-model="media.alt_text"
                label="Alt name"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-flex justify-end">
            <v-btn text color="primary" @click="saveMedia">
              <v-icon left> mdi-upload </v-icon>
              save
            </v-btn>
            <v-btn text color="error" @click="deleteDialog = true">
              <v-icon left> mdi-delete </v-icon>
              delete
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="deleteDialog" max-width="300px">
      <v-card>
        <v-card-title> Delete </v-card-title>

        <v-card-text>
          <v-container>
            <p>Are you sure to delelete this file?</p>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">
            Cancel
          </v-btn>
          <v-btn color="green darken-1" text @click="deleteMedia">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped>
table tr td:nth-child(2) {
  overflow-wrap: anywhere;
}
</style>
<script>
import { humanFileSize } from "~mapomodule/utils/formatters.js";

export default {
  data() {
    return {
      media: null,
      deleteDialog: false,
    };
  },
  props: {
    value: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    fileSize() {
      return this.media && humanFileSize(this.media.size);
    },
    dateCreated() {
      return this.media && new Date(this.media.created).toLocaleString();
    },
    extension() {
      return this.media && this.media.file && this.media.file.split(".").pop();
    },
    fileName() {
      return this.media && this.media.file && this.media.file.split("/").pop();
    },
  },
  watch: {
    value(val) {
      this.media = val;
    },
  },
  methods: {
    saveMedia() {
      this.$emit("updateMedia", this.media);
    },
    deleteMedia() {
      this.deleteDialog = false;
      this.$emit("deleteMedia", this.media);
    },
    close() {
      this.$emit("input", null);
    },
  },
};
</script>
