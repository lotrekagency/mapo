<template>
  <v-card v-bind="{ light, dark, elevation }">
    <div v-if="!editMedia" class="d-flex">
      <div class="d-flex">
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
      </div>
      <v-spacer></v-spacer>
      <div>
        <v-tabs v-model="tab" right background-color="transparent">
          <v-tab>Gallery</v-tab>
          <v-tab>Uploader</v-tab>
        </v-tabs>
      </div>
    </div>

    <div v-if="!editMedia">
      <MediaFolders
        v-if="!noFolders"
        v-bind="{ folders, parentFolder }"
        @updateFolder="updateOrCreateFolder($event)"
        @deleteFolder="deleteFolder($event)"
        @goToFolder="
          parentFolder = $event;
          getRoot();
        "
      />
      <v-divider v-if="!noFolders" class="mb-4"></v-divider>

      <v-tabs-items v-model="tab" class="transparent">
        <v-tab-item>
          <MediaGallery
            v-bind="{ select, page, pages, medias }"
            @selectionChange="selectionChange($event)"
            @pageChange="getRoot({ page: $event })"
            @editMedia="openEditor($event)"
          />
        </v-tab-item>
        <v-tab-item>
          <MediaUploader
            v-bind="{ folders, parentFolder }"
            @Upload="getRoot({ page: 1 })"
          />
        </v-tab-item>
      </v-tabs-items>
    </div>
    <MediaEditor
      v-model="editMedia"
      @deleteMedia="deleteMedia($event)"
      @updateMedia="updateMedia($event)"
    />
  </v-card>
</template>

<style lang="scss" scoped>
</style>

<script>
import MediaFolders from './MediaFolders.vue';
export default {
  components: { MediaFolders },
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
      editMedia: null,
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
    light: {
      type: Boolean,
      default: false,
    },
    dark: {
      type: Boolean,
      default: false,
    },
    elevation: {
      type: Number | String,
      default: undefined,
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
    getRoot: async function (context) {
      const { page, folder } = context || {};
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

    deleteMedia(media) {
      return this.mediaFileCrud.delete(media.id).then(() => {
        (this.editMedia = null), this.getRoot();
      });
    },

    detailMedia(media_id) {
      return this.mediaFileCrud.detail(media_id);
    },

    updateMedia(media) {
      const files = ["file", "objectURL", "thumbnail"];
      const payload = this.$mapo.$api.multipart(media, files);
      const conf = { headers: { "Content-Type": "multipart/form-data" } };
      return this.mediaFileCrud
        .partialUpdate(media.id, payload, conf)
        .then(() =>
          this.$mapo.$snack.open({
            message: "file info succesfully updated.",
          })
        );
    },
    processResponse(resp) {
      this.medias = resp?.media?.items || [];
      this.folders = resp?.folders || [];
      this.parentFolder = resp?.parent_folder;
      this.page = resp?.media?.paginator?.page;
      this.pages = resp?.media?.paginator?.page_range?.pop();
    },
    selectionChange(event) {
      this.$emit("selectionChange", event);
    },
    async openEditor(event) {
      this.editMedia = await this.detailMedia(event.id);
    },
  },
  async fetch() {
    await this.getRoot();
  },
};
</script>
