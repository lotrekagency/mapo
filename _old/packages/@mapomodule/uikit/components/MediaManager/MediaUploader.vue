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
        <v-chip dense v-if="isTooLarge(item)" color="error">{{ $t("mapo.mediaUploader.tooLarge") }}</v-chip>
      </template>
      <template v-slot:editContent="{ editedItem }">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select v-model="editedItem.folder" :items="folderOptions" :label="$t('mapo.folder')"></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.title" :label="$t('titleTag')"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.description" :label="$t('mapo.description')"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field v-model="editedItem.alt_text" :label="$t('mapo.altTag')"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </template>
    </drop-area>
    <div v-if="mediaList.length" class="mt-3">
      <p class="text-right mr-3 mb-2">{{ bufferProgress >= 100 ? $t('mapo.mediaUploader.optimizingFiles') : (progress > 0 ? $t('mapo.mediaUploader.uploadingFiles'):'')}} {{ completed }}</p>
      <v-progress-linear :stream="stream" :indeterminate="progress == 100" :value="progress" :buffer-value="bufferProgress"></v-progress-linear>
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
      buffer : 0,
      stream: false,
      responses: [],
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
      return `${this.responses.length}/${this.mediaList.length}`;
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
    },
    progress(){
      return this.responses.length/this.mediaList.length * 100;
    },
    bufferProgress(){
      return this.buffer/this.mediaList.length * 100;
    }
  },
  methods: {
    isTooLarge({ info }) {
      const { type } = info;
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
      this.responses = [];
      this.buffer = 0;
      this.stream = false
    },
    async updateAll() {
      this.stream = true
      for (const media of this.mediaList) {
        await this.uploadMedia(
          Object.assign(
            { file: media.blob },
            {
              title: media.info.title,
              alt_text: media.info.alt_text,
              description: media.info.description,
              folder: media.info.folder
            }
          )
        ).then(r => this.responses.push(r)).catch(error => {
          this.$mapo.$snack.open({
            message: error.response?.data?.detail || this.$t("mapo.genericError"),
            color: "error",
          })
        })
      }
      if (this.mediaList && this.mediaList.length) {
        this.$mapo.$snack.open({
          message: this.$t("mapo.mediaUploader.success", { numberFiles: this.responses.length || this.mediaList.length })
        });
        this.$emit("Upload", (this.responses.length && this.responses) || this.mediaList);
        this.$refs.closeButton.$el.click();
      }
    },
    async uploadMedia(media) {
      const payload = this.$mapo.$api.multipart(media, ["file"]);
      const conf = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function(event) {
          this.buffer = Math.ceil(this.buffer) + (event.loaded / event.total)
        }.bind(this)
      };
      return await this.mediaFileCrud.create(payload, conf);
    }
  }
};
</script>
