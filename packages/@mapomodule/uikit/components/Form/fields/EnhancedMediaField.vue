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

    <!-- If the media is not avaible, it shows a btn to add new media -->
    <v-card
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
      <MediaPreview
        class="media-preview"
        :key="childKey"
        v-if="mediaExists"
        :media="internalValue"
        :video-preview="internalValue.is_image ? false : true"
      />

      <v-card-title>{{ label }}</v-card-title>
      <v-card-text v-show="internalValue">
        <h4>{{ $t("mapo.fileName") }}:</h4>
        {{ fileName }}
        <h4>{{ $t("mapo.created") }}:</h4>
        {{ fileInfo.created }}
      </v-card-text>
      <v-card-actions>
        <template v-if="!internalValue">
          <v-btn
            tile
            :disabled="readonly"
            @click="editing = true"
            block
            :min-height="minHeight"
          >
            <v-icon size="80"> mdi-plus-circle-outline </v-icon>
          </v-btn>
        </template>
        <template v-else>
          <v-row>
            <v-col align="center">
              <v-btn
                :disabled="readonly"
                @click="editing = true"
                block
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-col>
            <v-col align="center">
              <v-btn
                :disabled="readonly"
                @click="confirmDelete"
                color="error"
                block
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </template>
      </v-card-actions>
    </v-card>
    <!-- Select media dialog -->
    <media-manager-dialog
      v-model="editing"
      select="single"
      v-on:selectionChange="update"
      v-bind="$attrs"
    >
    </media-manager-dialog>

    <v-messages v-model="errorMessages" color="error" class="mt-2" />
  </div>
</template>

<style scoped>
.media-preview {
  cursor: pointer;
}
</style>

<script>
export default {
  name: "EnhancedMediaField",
  data() {
    return {
      internalValue: null,
      editing: false,
      childKey: 0,
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
      default: () => [],
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
    fileInfo() {
      return {
        title: this.internalValue?.title,
        created: new Date(this.internalValue?.created).toLocaleDateString(
          this.internalValue?.language_code
        ),
      };
    },
    fileName() {
      return (
        this.internalValue &&
        this.internalValue.file &&
        this.internalValue.file.split("/").pop()
      );
    },
  },

  methods: {
    update(val) {
      this.updateChild();
      this.internalValue = val;
    },
    confirmDelete() {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.remove"),
          question: this.$t("mapo.mediaField.confirmRemove"),
          approveButton: {
            text: this.$t("mapo.remove"),
            attrs: { color: "red", text: true },
          },
        })
        .then((res) => (res ? (this.internalValue = null) : null));
    },
    updateChild() {
      this.childKey += 1;
    },
    isImage(val) {
      if (!val?.is_image && val?.mime_type.includes("image")) {
        Object.assign(val, { is_image: true });
      }
    },
  },
  watch: {
    value(val) {
      if (val !== this.internalValue) {
        this.internalValue = val;
      }
    },
    internalValue(val) {
      this.isImage(val);
      this.$emit("input", val);
    },
  },
  mounted() {
    this.internalValue = this.value;
  },
};
</script>
