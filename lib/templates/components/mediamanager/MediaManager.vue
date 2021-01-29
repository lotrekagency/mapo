<template>
  <v-card>
    <v-tabs color="green accent-4" right>
      <v-tab>Gallery</v-tab>
      <v-tab>Uploader</v-tab>

      <v-tab-item>
        <MediaGallery />
      </v-tab-item>
      <v-tab-item>
        <MediaUploader />
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  data() {
    return {
      mediaFolderCrud: this.$mapo.$api.crud("api/camomilla/media-folders"),
      mediaFileCrud: this.$mapo.$api.crud("api/camomilla/media"),
    };
  },
  methods: {
    getRoot() {
      return this.mediaFolderCrud.list();
    },

    goToFolder(folder_id) {
      return this.mediaFolderCrud.detail(folder_id);
    },

    updateFolder(folder) {
      return this.mediaFolderCrud.update(folder.id, folder);
    },

    deleteFolder(folder_id) {
      return this.mediaFolderCrud.delete(folder_id);
    },

    detailMedia(media_id) {
      return this.mediaFileCrud.detail(media_id);
    },

    updateMedia(media) {
      const files = ["file", "reader_url", "thumbnail"];
      const payload = this.$mapo.$api.multipart(media, files);
      const conf = { headers: { "Content-Type": "multipart/form-data" } };
      return this.mediaFileCrud.update(media.id, payload, conf);
    },
  },
};
</script>
