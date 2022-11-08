<template>
  <div v-if="media">
      <div class="img_overlay">
        <v-btn class="img_overlay__button img_overlay__button--back" small icon @click="closeEditor">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn class="img_overlay__button img_overlay__button--href" small icon :href="media.file" target="_blank" >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <MediaPreview
        :media="media"
        contain
        filename
        media-controls
        class="media-editor--preview elevation-2"
      />
      <v-overlay
        absolute
        v-model="editing"
        @click="editing = false"
      ></v-overlay>
      <div class="dialog">
        <div class="dialog__container">
          <v-card flat tile class="dialog__content overflow-y-auto"
            :class="{ 'py-0': !editing }"
            :max-height="editing ? height : '0px'"
          >
            <v-card-text class="flex-grow-0">
              <v-row class="flex-md-row-reverse">
                <v-col md="6" cols="12" class="info-media">
                  <table class="text-caption fill-height pb-md-10">
                    <tr>
                      <td class="pr-3"><b>{{ $t("mapo.fileName") }}:</b></td>
                      <td>{{ fileName }}</td>
                    </tr>
                    <tr>
                      <td class="pr-3"><b>{{ $t("mapo.mime") }}:</b></td>
                      <td>{{ media.mime_type }}</td>
                    </tr>
                    <tr>
                      <td class="pr-3"><b>{{ $t("mapo.created") }}:</b></td>
                      <td>{{ dateCreated }}</td>
                    </tr>
                    <tr>
                      <td class="pr-3"><b>{{ $t("mapo.size") }}:</b></td>
                      <td>{{ fileSize }}</td>
                    </tr>
                    <tr>
                      <td class="pr-3"><b>URL:</b></td>
                      <td>
                        <a :href="media.file" target="_blank">{{ media.file }}</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="pr-3"><b>{{ $t("mapo.linkedModels") }}:</b></td>
                      <td>
                        <ul>
                          <li v-for="link in media.links" :key="link.id">
                            <b>{{link.model}} (id:{{link.id}})</b> - {{link.name}}
                          </li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </v-col>
                <v-col md="6" cols="12">
                  <v-row>
                    <v-col sm="6" md="12" cols="12">
                      <v-text-field
                        dense
                        v-model="media.name"
                        :label="$t('mapo.name')"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6" md="12" cols="12">
                      <v-text-field
                        dense
                        v-model="media.title"
                        :label="$t('mapo.titleTag')"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6" md="12" cols="12">
                      <v-text-field
                        dense
                        v-model="media.description"
                        :label="$t('mapo.description')"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6" md="12" cols="12">
                      <v-text-field
                        dense
                        v-model="media.alt_text"
                        :label="$t('mapo.altTag')"
                      ></v-text-field>
                    </v-col>
                    <v-col sm="6" md="12" cols="12" class="d-flex align-center">
                      <div class="d-flex flex-column flex-grow-1">
                        <v-file-input
                          v-model="newFile"
                          :accept="accept"
                          :label="$t('mapo.mediaEditor.changeFile')"
                          show-size
                          dense
                          prepend-icon
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
                          <v-row
                            class="fill-height ma-0"
                            align="center"
                            justify="center"
                          >
                            <v-progress-circular
                              indeterminate
                              color="grey lighten-5"
                            ></v-progress-circular>
                          </v-row>
                        </template>
                      </v-img>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-btn
            tile
            depressed
            width="100%"
            :class="{ 'pr-0': editing }"
            @click="editing = !editing"
          >
            <span>{{ $t("mapo.edit") }}</span>
            <v-icon :style="rotate">mdi-chevron-up</v-icon>
            <div class="edit_spacer" :class="{ 'flex-grow-1': editing }"></div>
            <v-btn v-if="editing" text tile color="primary" @click="saveMedia">
              {{ $t("mapo.save") }}
            </v-btn>
            <v-btn
              v-if="editing"
              text
              tile
              color="error"
              @click.stop="confirmDelete"
            >
              {{ $t("mapo.delete") }}
            </v-btn>
          </v-btn>
        </div>
      </div>
  </div>
</template>

<style lang="scss" scoped>
table tr td:nth-child(2) {
  overflow-wrap: anywhere;
}
.dialog {
  position: relative;
  height: 56px;
  z-index: 5;
  &__container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  &__content {
    transition-property: max-height, padding;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
}
.media-editor--preview{
  max-height: calc(100vh - 180px);
  flex-grow: 1;
  @media (max-width: 600px){
    max-height: calc(100vh - 260px);
    min-height: calc(100vh - 260px);  }
}
.v-dialog .media-editor--preview{
  max-height: calc(100vh - 510px);
  @media (max-width: 600px){
    max-height: calc(100vh - 375px);
    min-height: unset;
  }
}
.edit_spacer {
  flex-grow: 0;
  transition: flex-grow 0.3s ease-out;
}
.img_overlay {
  position: relative;
  &__button {
    position: absolute;
    z-index: 1;
    color: #333333 !important;
    background: #e0e0e096;
    top: 10px;
    &--back {
      left: 10px;
    }
    &--href {
      right: 10px;
    }
  }
}
</style>
<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";
import { mapGetters, mapActions } from "vuex"

export default {
  name: "MediaEditor",
  data() {
    return {
      media: null,
      editing: false,
      newFile: null,
      sameUrl: false,
    };
  },
  computed: {
    ...mapGetters("mapo/media", ["editMedia"]),
    fileSize() {
      return this.media && humanFileSize(this.media.size);
    },
    dateCreated() {
      return this.media && new Date(this.media.created).toLocaleString();
    },
    fileName() {
      return this.media && this.media.file && this.media.file.split("/").pop();
    },
    rotate() {
      return {
        transform: this.editing ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .3s cubic-bezier(0.25, 0.8, 0.5, 1)",
      };
    },
    height() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "50vh";
        default:
          return 425;
      }
    },
    accept(){
      switch (this.media.mime_type && this.media.mime_type.split("/")[0]) {
        case "image":
          return "image/*"
        case "video":
          return "video/*"
        case "audio":
          return "audio/*"
        default:
          return "*"
      }
    },
    newFilePreview() {
      return this.newFile.type.startsWith("image/") ? URL.createObjectURL(this.newFile) : null;
    },
  },
  watch: {
    editMedia(val) {
      this.media = val;
      this.editing = false;
      this.newFile = null;
      this.sameUrl = false;
    },
  },
  methods: {
    ...mapActions("mapo/media", ["closeEditor", "deleteMedia", "updateMedia"]),
    saveMedia() {
      this.updateMedia({
        id: this.media.id,
        name: this.media.name,
        title: this.media.title,
        description: this.media.description,
        alt_text: this.media.alt_text,
        file: this.newFile || undefined,
        same_url: (this.newFile && this.sameUrl) || undefined,
        language_code: this.$i18n.locale
      }).then(() => {
        this.newFile = null;
        this.sameUrl = false;
      });
    },
    confirmDelete() {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.mediaEditor.confirmDelete"),
          approveButton: { text: this.$t("mapo.delete"), attrs: { color: "red", text: true } },
        })
        .then((res) => res && this.deleteMedia(this.media));
    }
  },
};
</script>
