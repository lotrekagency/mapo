<template>
  <div>
    <v-text-field
      v-if="title"
      v-model="title"
      class="mb-n8 pb-0"
      solo
      readonly
      v-bind="$attrs"
    ></v-text-field>
    <v-hover v-model="isHovered">
      <div style="position: relative">
        <v-img
          v-if="mediaExists"
          :src="internalValue.file"
          :lazy-src="internalValue.thumbnail"
          v-bind="{
            aspectRatio,
            contain,
            height,
            width,
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
          }"
        >
          <template v-slot:placeholder>
            <v-row
              v-if="internalValue"
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
        <v-card
          v-else-if="!rmAddBtn"
          v-bind="{
            height,
            width,
            maxWidth,
            maxHeight,
            minWidth,
            minHeight,
            ...$attrs,
          }"
        >
          <v-card-title>{{ label }}</v-card-title>

          <v-card-actions>
            <v-btn @click="editing = true" block :min-height="minHeight">
              <v-icon size="80"> mdi-plus-circle-outline </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>

        <!-- Shows darkening overlay on image with buttons on top while hovered -->
        <v-overlay opacity="0.3" absolute :value="overlay">
          <v-row>
            <v-col cols="12">
              <h3>{{ label }}</h3>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-btn @click="editing = true" fab v-bind="$attrs">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn @click="confirmDelete" fab v-bind="$attrs">
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
          v-bind="$attrs"
        >
        </media-manager-dialog>

        <!-- Confirm elimination dialog -->
        <confirm-dialog
          v-bind="{ ...$attrs, value: false }"
          question="Are you sure you want to remove this media?"
          ref="removeModal"
        ></confirm-dialog>
      </div>
    </v-hover>
  </div>
</template>

<style scoped>
</style>

<script>
export default {
  name: "MediaField",
  data() {
    return {
      internalValue: null,
      editing: false,
      isHovered: false,
    };
  },

  props: {
    value: Object,
    label: String,
    title: {
      type: String,
      default: () => "",
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
      return !!this.internalValue?.file;
    },
    overlay() {
      return this.isHovered && this.mediaExists;
    },
  },

  methods: {
    update(val) {
      this.internalValue = val;
    },
    confirmDelete() {
      this.$refs.removeModal
        .open()
        .then((res) => (res ? (this.internalValue = null) : null));
    },
  },

  watch: {
    value(val) {
      if (val !== this.internalValue) {
        this.internalValue = val;
      }
    },
    internalValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>