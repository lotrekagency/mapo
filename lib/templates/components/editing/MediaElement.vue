<template>
  <div>
    <v-card
      v-bind="{
        minWidth,
        minHeight,
        height,
        width,
        maxHeight,
        maxWidth,
        dark,
        light: !dark,
      }"
    >
      <v-card-title>Media element</v-card-title>
      <v-card-actions>
        <v-row>
          <v-col>
            <v-hover v-model="isHovered">
              <div style="position: relative">
                <v-img
                  v-if="mediaExists"
                  :src="child_media.file"
                  :lazy-src="child_media.thumbnail"
                  v-bind="{
                    aspectRatio,
                    contain,
                  }"
                >
                  <template v-slot:placeholder>
                    <v-row
                      v-if="child_media"
                      class="fill-height ma-0"
                      align="center"
                      justify="center"
                    >
                      <v-progress-circular
                        indeterminate
                        color="grey"
                      ></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>

                <!-- If the media is not avaible, it shows a btn to add new media -->

                <v-btn
                  v-else-if="!rmAddBtn"
                  @click="editing = true"
                  block
                  outlined
                  :min-height="minHeight"
                >
                  <v-icon size="80"> mdi-plus-circle-outline </v-icon>
                </v-btn>

                <!-- Shows darkening overlay on image with buttons on top while hovered -->
                <v-overlay opacity="0.3" absolute :value="overlay">
                  <v-row>
                    <v-col cols="6">
                      <v-btn
                        @click="editing = true"
                        fab
                        x-large
                        :dark="dark"
                        :light="!dark"
                      >
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>
                    </v-col>

                    <v-col cols="6">
                      <v-btn
                        @click="confirm = true"
                        fab
                        x-large
                        :dark="dark"
                        :light="!dark"
                      >
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-overlay>

                <!-- Select media dialog -->
                <media-manager-dialog
                  v-model="editing"
                  select="single"
                  v-on:selectionChange="update"
                  :dark="dark"
                  :light="!dark"
                >
                </media-manager-dialog>

                <!-- Confirm elimination dialog -->
                <v-dialog
                  v-model="confirm"
                  max-width="290"
                  :light="!dark"
                  :dark="dark"
                >
                  <v-card>
                    <v-card-title class="headline"> You sure? </v-card-title>
                    <v-card-actions>
                      <v-btn
                        color="red darken-1"
                        text
                        @click="confirmDelete(true)"
                      >
                        Yes
                      </v-btn>
                      <v-spacer></v-spacer>
                      <v-btn text @click="confirmDelete(false)"> No </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
            </v-hover>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      child_media: null,

      editing: false,
      confirm: false,

      isHovered: false,
    };
  },

  model: {
    prop: "media",
    event: "changed-media",
  },

  mounted() {
    if (this.media) this.child_media = this.media;
  },

  props: {
    media: {
      type: Object,
      default: () => null,
    },
    dark: {
      type: Boolean,
      default: false,
    },

    rmAddBtn: {
      type: Boolean,
      default: false,
    },

    //image reflections
    aspectRatio: {
      type: String | Number,
      default: undefined,
    },
    contain: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String | Number,
      default: "100%",
    },
    width: {
      type: String | Number,
      default: "100%",
    },
    maxWidth: {
      type: String | Number,
      default: undefined,
    },
    maxHeight: {
      type: String | Number,
      default: undefined,
    },
    minWidth: {
      type: String | Number,
      default: undefined,
    },
    minHeight: {
      type: String | Number,
      default: 300,
    },
  },

  computed: {
    mediaExists() {
      try {
        if (this.child_media.file) return true;
        else return false;
      } catch {
        return false;
      }
    },
    overlay() {
      if (this.isHovered && this.mediaExists) return true;

      return false;
    },
  },

  methods: {
    update(selection) {
      this.child_media = selection;
      this.$emit("changed-media", selection);
    },
    confirmDelete(choice) {
      if (choice) {
        this.child_media = null;
        this.$emit("changed-media", null);
      }
      this.confirm = false;
    },
  },

  watch: {
    media() {
      this.child_media = this.media;
    },
  },
};
</script>