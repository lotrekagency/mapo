<template>
  <div>
    <drop-area @change="updateMediaList($event)" multiple>
      <template v-slot:actions="{ clearList }">
        <v-btn @click="clearList" icon>
          <v-icon ref="closeButton">mdi-close</v-icon>
        </v-btn>
        <v-btn @click="updateAll" icon>
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </template>
      <template v-slot:editContent="{ editedItem }">
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-select
                v-model="editedItem.folder"
                :items="folderOptions"
                label="Folder"
              ></v-select>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.name"
                label="Name"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.title"
                label="Title"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.description"
                label="Description"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="editedItem.alt_text"
                label="Alt name"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
      progress: 0,
      mediaList: [],
      _mediaFileCrud: null,
    };
  },
  props: {
    parentFolder: {
      type: Object,
    },
    folders: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    mediaFileCrud() {
      this._mediaFileCrud =
        this._mediaFileCrud ||
        this.$mapo.$api.crud("api/camomilla/media/upload");
      return this._mediaFileCrud;
    },
    completed() {
      return `${this.count}/${this.mediaList.length}`;
    },
    folderOptions() {
      return this.folders.map((folder) => ({
        text: folder.slug,
        value: folder.id,
      }));
    },
  },
  methods: {
    updateMediaList(mediaList) {
      this.mediaList = mediaList;
      this.mediaList.forEach((media) => {
        media.info.title = media.info.title || media.info.name;
        media.info.alt_text = media.info.alt_text || media.info.name;
        media.info.description = media.info.description || media.info.name;
      });
      this.count = 0;
      this.progress = 0;
    },
    updateAll() {
      return Promise.all(
        this.mediaList.map((media) =>
          this.uploadMedia(
            Object.assign(
              { file: media.blob },
              {
                title: media.info.title,
                alt_text: media.info.alt_text,
                description: media.info.description,
                folder:
                  media.info.folder ||
                  (this.parentFolder && this.parentFolder.id),
              }
            )
          )
        )
      ).then((response) => {
        this.$mapo.$snack.open({
          message: `${
            response.length || this.mediaList.length
          } files succesfully uploaded`,
        });
        this.$emit("Upload", (response.length && response) || this.mediaList);
        this.$refs.closeButton.$el.click();
      });
    },
    uploadMedia(media) {
      const index = this.mediaList.findIndex((el) => el.blob === media.file);
      const payload = this.$mapo.$api.multipart(media, ["file"]);
      const conf = {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: function (event) {
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
        }.bind(this),
      };
      return this.mediaFileCrud.create(payload, conf);
    },
  },
};
</script>
