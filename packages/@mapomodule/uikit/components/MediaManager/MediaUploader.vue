<template>
  <v-container class="container">
    <drop-area @change="updateMediaList($event)" multiple>
      <template v-slot:actions="{ clearList }">
        <div v-if="mediaList && mediaList.length">
          <v-btn @click="clearList" icon>
            <v-icon ref="closeButton">mdi-close</v-icon>
          </v-btn>
          <v-btn @click="updateAll" icon>
            <v-icon>mdi-upload</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:list-item.content.after="{ item }">
        <v-chip dense v-if="isTooLarge(item)" color="error">{{$t("mapo.mediaUploader.tooLarge")}}</v-chip>
      </template>
      <template v-slot:editContent="{ editedItem }">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="editedItem.folder"
                :items="folderOptions"
                :label="$t('mapo.folder')"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.name"
                :label="$t('mapo.name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.title"
                :label="$t('titleTag')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.description"
                :label="$t('mapo.description')"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.alt_text"
                :label="$t('mapo.altTag')"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </drop-area>
    <div v-if="mediaList.length" class="mt-3">
      <p class="text-right mr-3 mb-2">{{ completed }}</p>
      <v-progress-linear :value="progress"></v-progress-linear>
    </div>
  </v-container>
</template>

<style scoped>
.container {
  height: 100%;
  overflow: auto;
}
</style>

<script>
import { mapGetters } from "vuex"
const MAX_IMAGE_SIZE = 1000000 // 1mb
const MAX_VIDEO_SIZE = 100000000 // 100mb

export default {
  name: "MediaUploader",
  data() {
    return {
      count: 0,
      progress: 0,
      mediaList: [],
      _mediaFileCrud: null
    };
  },
  computed: {
    ...mapGetters("mapo/media", ["parentFolder", "folders"]),
    mediaFileCrud() {
      this._mediaFileCrud =
        this._mediaFileCrud ||
        this.$mapo.$api.crud("api/media");
      return this._mediaFileCrud;
    },
    completed() {
      return `${this.count}/${this.mediaList.length}`;
    },
    folderOptions() {
      return [
        {
          text: (this.parentFolder && this.parentFolder.path) || "/",
          value: (this.parentFolder && this.parentFolder.id) || null
        },
        ...this.folders.map(folder => ({
          text: folder.path,
          value: folder.id
        }))
      ];
    }
  },
  methods: {
    isTooLarge({ info }){
      const {type} = info;
      switch (type.split("/")[0]) {
        case "image":
          return info.rawsize > MAX_IMAGE_SIZE;
        case "video":
          return info.rawsize > MAX_VIDEO_SIZE;
        default:
          return false;
      }
    },
    updateMediaList(mediaList) {
      this.mediaList = mediaList;
      this.mediaList.forEach(media => {
        media.info.title = media.info.title || media.info.name;
        media.info.alt_text = media.info.alt_text || media.info.name;
        media.info.description = media.info.description || media.info.name;
        media.info.folder =
          media.info.folder ||
          (this.parentFolder && this.parentFolder.id) ||
          null;
      });
      this.count = 0;
      this.progress = 0;
    },
    updateAll() {
      return Promise.all(
        this.mediaList.map(media =>
          this.uploadMedia(
            Object.assign(
              { file: media.blob },
              {
                title: media.info.title,
                alt_text: media.info.alt_text,
                description: media.info.description,
                folder: media.info.folder
              }
            )
          )
        )
      ).then(response => {
        if (this.mediaList && this.mediaList.length) {
          this.$mapo.$snack.open({
            message: this.$t("mapo.mediaUploader.success", {numberFiles: response.length || this.mediaList.length})
          });
          this.$emit("Upload", (response.length && response) || this.mediaList);
          this.$refs.closeButton.$el.click();
        }
      });
    },
    uploadMedia(media) {
      const index = this.mediaList.findIndex(el => el.blob === media.file);
      const payload = this.$mapo.$api.multipart(media, ["file"]);
      const conf = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(event) {
          this.mediaList[index].progress = Math.ceil(
            (event.loaded / event.total) * 100
          );
          this.progress =
            this.mediaList.reduce((acc, media) => acc + media.progress, 0) /
            this.mediaList.length;
          this.count = this.mediaList.reduce(
            (acc, media) => acc + (media.progress === 100),
            0
          );
        }.bind(this)
      };
      return this.mediaFileCrud.create(payload, conf);
    }
  }
};
</script>
