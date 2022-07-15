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
          :src="internalValue.is_image && internalValue.file || null"
          :lazy-src="internalValue.is_image && internalValue.thumbnail || null"
          :class="{'grey lighten-2': !internalValue.is_image}"
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
                v-if="internalValue.is_image"
                indeterminate
                color="grey"
              ></v-progress-circular>
              <div class="d-flex flex-column align-center justify-space-between fill-height" style="width: 100%" v-else>
              <div></div>
              <v-icon size="70px" color="grey">mdi-file</v-icon>
              <span class="grey--text text--darken-3 text-truncate pl-1 pr-8" style="width: 100%">{{fileName}}</span>
              </div>
            </v-row>
          </template>
        </v-img>

        <!-- If the media is not avaible, it shows a btn to add new media -->
        <v-card
          v-else-if="!rmAddBtn"
          class="rounded-0"
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
            <v-btn tile :disabled="readonly" @click="editing = true" block :min-height="minHeight">
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
              <v-btn :disabled="readonly" @click="editing = true" fab v-bind="$attrs">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="6">
              <v-btn :disabled="readonly" @click="confirmDelete" fab v-bind="$attrs">
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

      </div>
    </v-hover>
    <v-messages
      v-model="errorMessages"
      color="error"
      class="mt-2"
    />
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
    errorMessages: {
      type: String | Array,
      default: () => []
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
    // This set the component status to readonly, stopping the user interaction.
    readonly: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    mediaExists() {
      return !!this.internalValue?.file;
    },
    overlay() {
      return this.isHovered && this.mediaExists;
    },
    fileName() {
      return this.internalValue && this.internalValue.file && this.internalValue.file.split("/").pop();
    },
  },

  methods: {
    update(val) {
      this.internalValue = val;
    },
    confirmDelete() {
      this.$mapo.$confirm
        .open({
          title: this.$t("remove"),
          question: this.$t("mediaField_confirmRemove"),
          approveButton: { text: this.$t("remove"), attrs: { color: "red", text: true } }
        })
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
  mounted(){
    this.internalValue = this.val
  }
};
</script>
