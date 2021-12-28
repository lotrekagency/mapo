<template>
  <div v-if="media">
    <v-container class="px-md-6">
      <div class="img_overlay">
        <v-btn class="img_overlay__button img_overlay__button--back" small icon @click="close">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-btn class="img_overlay__button img_overlay__button--href" small icon :href="media.file" target="_blank" >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </div>
      <v-img
        :src="media.file"
        :lazy-src="media.thumbnail"
        height="400"
        contain
        aspect-ratio="1"
        class="grey lighten-2 elevation-2"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              v-if="media.is_image"
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
            <v-icon v-else size="70px" color="grey">mdi-file</v-icon>
          </v-row>
        </template>
      </v-img>
      <v-overlay
        absolute
        v-model="editing"
        @click="editing = false"
      ></v-overlay>
      <h4 class="text-truncate mt-2">{{ fileName }}</h4>
      <div class="dialog">
        <div class="dialog__container">
          <v-card flat tile class="dialog__content"
            :class="{ 'py-0': !editing }"
            :max-height="editing ? '425px' : '0px'"
          >
            <v-card-text class="overflow-y-auto flex-grow-0">
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
            <span>Edit</span>
            <v-icon :style="rotate">mdi-chevron-up</v-icon>
            <v-spacer v-if="editing"></v-spacer>
            <v-btn v-if="editing" text tile color="primary" @click="saveMedia">
              save
            </v-btn>
            <v-btn
              v-if="editing"
              text
              tile
              color="error"
              @click.stop="deleteMedia"
            >
              delete
            </v-btn>
          </v-btn>
        </div>
      </div>
    </v-container>
  </div>
</template>
<style lang="scss" scoped>
table tr td:nth-child(2) {
  overflow-wrap: anywhere;
}
.dialog {
  position: relative;
  height: 56px;
  z-index: 6;
  &__container {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  &__content {
    overflow-y: hidden;
    transition-property: max-height, padding;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
  }
}
.img_overlay {
  position: relative;
  &__button {
    position: absolute;
    z-index: 1;
    color: #333333 !important;
    background: #e0e0e096;
    top: 10px;
    &--back{
      left: 10px;
    }
    &--href{
      right: 10px;
    }
  }
}
</style>
<script>
import { humanFileSize } from "@mapomodule/utils/helpers/formatters";

export default {
  name: "MediaEditor",
  data() {
    return {
      media: null,
      editing: false
    };
  },
  props: {
    value: {
      type: Object,
      default: () => null
    }
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
    rotate() {
      return {
        transform: this.editing ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .3s cubic-bezier(0.25, 0.8, 0.5, 1)"
      };
    }
  },
  watch: {
    value(val) {
      this.media = val;
      this.editing = false;
    }
  },
  methods: {
    saveMedia() {
      this.$emit("updateMedia", this.media);
    },
    deleteMedia() {
      this.$mapo.$confirm
        .open({
          title: "Delete",
          question: "Are you sure you want to delete this media?",
          approveButton: { text: "Delete", attrs: { color: "red" } }
        })
        .then(res => res && this.$emit("deleteMedia", this.media));
    },
    close() {
      this.$emit("input", null);
    }
  }
};
</script>
