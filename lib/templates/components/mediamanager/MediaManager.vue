<template>
  <v-card>
    <v-tabs v-model="tab" color="green accent-4" right>
      <v-btn class="ma-2" @click="getRoot" icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
      <v-btn
        v-if="parentFolder"
        class="ma-2"
        @click="getRoot({ folder: { id: parentFolder.updir } })"
        icon
      >
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <span class="ma-2 d-flex align-center">{{
        parentFolder ? parentFolder.path : "/"
      }}</span>
      <v-spacer></v-spacer>
      <v-tab>Gallery</v-tab>
      <v-tab>Uploader</v-tab>
    </v-tabs>

    <FolderGallery
      v-if="!noFolders"
      v-bind="{ folders, parentFolder }"
      @updateFolder="updateOrCreateFolder($event)"
      @deleteFolder="deleteFolder($event)"
      @goToFolder="
        parentFolder = $event;
        getRoot();
      "
    />
    <v-divider class="mb-4"></v-divider>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <MediaGallery
          v-bind="{ select, page, pages, medias }"
          @selectionChange="selectionChange($event)"
          @pageChange="getRoot({ page: $event })"
        />
      </v-tab-item>
      <v-tab-item>
        <MediaUploader
          v-bind="{ folders, parentFolder }"
          @Upload="getRoot({ page: 1 })"
        />
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<style lang="scss" scoped>
</style>

<script>
export default {
  data() {
    return {
      _mediaFolderCrud: null,
      _mediaFileCrud: null,
      medias: [],
      folders: [],
      parentFolder: null,
      page: 1,
      pages: 1,
      tab: null,
    };
  },
  props: {
    select: {
      type: String,
      default: "none",
      validator(val) {
        return ["none", "single", "multi"].indexOf(val) !== -1;
      },
    },
    noFolders: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    mediaFolderCrud() {
      this._mediaFolderCrud =
        this._mediaFolderCrud ||
        this.$mapo.$api.crud("api/camomilla/media-folders");
      return this._mediaFolderCrud;
    },
    mediaFileCrud() {
      this._mediaFileCrud =
        this._mediaFileCrud || this.$mapo.$api.crud("api/camomilla/media");
      return this._mediaFileCrud;
    },
  },
  methods: {
    getRoot: async function (info) {
      const { page, folder } = info || {};
      const { id } = folder || this.parentFolder || {};
      let response;
      this.page = page || this.page;
      const params = { page: this.page };
      if (id) {
        response = await this.mediaFolderCrud.detail(id, {
          params,
        });
      } else {
        response = await this.mediaFolderCrud.list({ params });
      }
      this.processResponse(response);
    },

    updateOrCreateFolder(folder) {
      return this.mediaFolderCrud
        .updateOrCreate(folder)
        .then(() => this.getRoot());
    },

    deleteFolder(folder) {
      return this.mediaFolderCrud.delete(folder.id).then(() => this.getRoot());
    },

    deleteMedia(media_id) {
      return this.mediaFileCrud.delete(media_id);
    },

    detailMedia(media_id) {
      return this.mediaFileCrud.detail(media_id);
    },

    updateMedia(media) {
      const files = ["file", "objectURL", "thumbnail"];
      const payload = this.$mapo.$api.multipart(media, files);
      const conf = { headers: { "Content-Type": "multipart/form-data" } };
      return this.mediaFileCrud.update(media.id, payload, conf);
    },

    processResponse(resp) {
      this.medias = resp.media.items;
      this.folders = resp.folders;
      this.parentFolder = resp.parent_folder;
      this.page = resp.media.paginator.page;
      this.pages = resp.media.paginator.page_range.pop();
    },
    selectionChange(event) {
      this.$emit("selectionChange", event);
    },
  },
  async fetch() {
    await this.getRoot();
  },
};
</script>
