<template>
  <v-card elevation="0">
    <v-card-title class="d-flex flex-wrap-reverse pa-0">
      <div>
        <v-tabs v-model="tab" right background-color="transparent">
          <v-tab>Gallery</v-tab>
          <v-tab>Uploader</v-tab>
        </v-tabs>
      </div>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="searchValue"
        @input="
          loadingSearch = true;
          search();
        "
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        outlined
        dense
        clearable
        :loading="loadingSearch"
        class="mx-2 shrink"
      ></v-text-field>
      <v-btn class="ma-2" @click="getRoot" icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
    </v-card-title>
    <v-card-text class="pa-0">
      <MediaFolders
        v-if="!noFolders"
        v-bind="{ folders, parentFolders, loading }"
        @updateFolder="updateOrCreateFolder($event)"
        @deleteFolder="deleteFolder($event)"
        @goToFolder="
          parentFolder = $event;
          getRoot();
        "
      />
      <v-tabs-items v-model="tab" class="transparent">
        <v-tab-item>
          <MediaGallery
            v-bind="{ select, page, pages, medias }"
            :selection="$attrs.selection"
            @update:selection="$emit('update:selection', $event)"
            @selectionChange="selectionChange($event)"
            :class="{ 'd-none': editMedia }"
            @pageChange="getRoot({ page: $event })"
            @editMedia="openEditor($event)"
          />
          <MediaEditor
            v-model="editMedia"
            @deleteMedia="deleteMedia($event)"
            @updateMedia="updateMedia($event)"
          />
        </v-tab-item>
        <v-tab-item>
          <MediaUploader
            v-bind="{ folders, parentFolder }"
            @Upload="
              tab = 0;
              getRoot({ page: 1 });
            "
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions>
      <!-- Slot to provide custom button actions inside the media manager -->
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
</template>

<script>
import { debounce } from "@mapomodule/utils/helpers/debounce";

const initialData = () => ({
  _mediaFolderCrud: null,
  _mediaFileCrud: null,
  medias: [],
  folders: [],
  parentFolders: [],
  page: 1,
  pages: 1,
  tab: 0,
  editMedia: null,
  loading: false,
  searchValue: "",
  loadingSearch: false,
});

export default {
  name: "MediaManager",
  data() {
    return initialData();
  },
  props: {
    select: {
      type: String,
      default: "none",
      validator(val) {
        return ["none", "single", "multi"].indexOf(val) !== -1;
      }
    },
    noFolders: {
      type: Boolean,
      default: false
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
    parentFolder: {
      get() {
        return (
          (this.parentFolders.length &&
            this.parentFolders[this.parentFolders.length - 1]) ||
          null
        );
      },
      set(val) {
        if (!val || !val.path) {
          this.parentFolders = [];
        } else {
          const index = this.parentFolders.findIndex(f => f.path == val.path);
          if (index == -1) {
            this.parentFolders.push(val);
          } else {
            this.parentFolders.splice(
              index + 1,
              this.parentFolders.length - (index + 1)
            );
          }
        }
      }
    }
  },
  methods: {
    async getRoot(context) {
      this.loading = true
      const { page, folder } = context || {};
      const { id } = folder || this.parentFolder || {};
      let response;
      this.page = page || this.page;
      const params = { page: this.page, search: this.searchValue || undefined };
      if (id) {
        response = await this.mediaFolderCrud.detail(id, {
          params
        });
      } else {
        response = await this.mediaFolderCrud.list({ params });
      }
      this.processResponse(response);
      this.loading = false
      this.editMedia = null
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

    async updateMedia(media) {
      const files = ["file", "objectURL", "thumbnail"];
      const payload = this.$mapo.$api.multipart(media, files);
      const conf = { headers: { "Content-Type": "multipart/form-data" } };
      const res = await this.mediaFileCrud.partialUpdate(media.id, payload, conf)
      if (media.file){
        this.medias = []
        await this.getRoot()
      }
      this.editMedia = res
      this.$mapo.$snack.open({
        message: "file info succesfully updated."
      })
      return res
    },
    processResponse(resp) {
      this.medias = resp?.media?.items || [];
      this.folders = resp?.folders || [];
      this.parentFolder = resp?.parent_folder;
      this.page = resp?.media?.paginator?.page;
      this.pages = resp?.media?.paginator?.pages;
    },
    selectionChange(event) {
      this.$emit("selectionChange", event);
    },
    async openEditor(event) {
      this.searchValue = "";
      this.getRoot();
      this.editMedia = await this.detailMedia(event.id);
    },
    search: debounce(function () {
      this.getRoot().then(() => this.loadingSearch = false);
    }, 500),
    reset() {
      Object.assign(this.$data, initialData());
      this.getRoot();
    }
  },
  async fetch() {
    await this.getRoot();
  }
};
</script>
