<template>
  <div class="pa-4">
    <v-row v-if="internalSelection.length && select == 'multi'" class="selection mb-4 grey darken-2">
      <v-col
        v-for="media in internalSelection"
        :key="media.file"
        class="d-flex"
        cols="2"
        sm="1"
        md="1"
        @click.stop="selectMedia(media)"
      >
        <MediaPreview
          :media="media"
          icon-size="20px"
          class="elevation-4 cursor-pointer selection__item"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="!medias.length"
      class="d-flex flex-column"
      dense
      align="center"
      justify="center"
    >
      <v-icon size="60"> mdi-alert-circle-outline </v-icon>
      <p>{{ $t("mediaGallery_noMediaFound") }}</p>
    </v-row>
    <v-row v-if="medias.length">
      <v-col
        v-for="media in medias"
        :key="media.file"
        class="img-container"
        cols="6"
        sm="3"
        md="2"
      >
        <v-btn
          @click.stop="editMedia(media)"
          icon
          small
          :ripple="false"
          color="white"
          class="img-container__btn"
          :class="{'d-none': select == 'none'}"
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>
        <MediaPreview
          class="elevation-4 cursor-pointer"
          :media="media"
          :selected="isSelected(media)"
          @click.native="selectMedia(media)"
          filename
          video-preview
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-pagination
          v-if="pages > 1"
          v-model="currentPage"
          :length="pages"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.cursor-pointer{
  cursor: pointer;
}
.img-container {
  display: flex;
  position: relative;
  &__btn {
    position: absolute;
    z-index: 1;
    right: 12px;
    bottom: 12px;
    background: #1e1e1ea1;
    border-radius: 50% 0 0;
  }
}
.selection {
  margin: -16px;
  &__confirm {
    margin: auto 0 auto auto;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  &__item:hover::before {
    content: "\F0156";
    font: normal normal normal 30px/1 "Material Design Icons";
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #00000082;
    border: solid #ffffff6e 2px;
    color: white;
  }
}
.selected {
  &::after {
    content: "";
    background: #56be5057;
    border: solid #5bc853 2px;
    width: 100%;
    height: 100%;
  }
}
</style>

<script>
export default {
  name: "MediaGallery",
  data() {
    return {
      internalSelection: [],
    };
  },
  props: {
    medias: {
      type: Array,
      required: true,
      default: () => ({}),
    },
    page: {
      type: Number,
      default: 1,
    },
    pages: {
      type: Number,
      default: 1,
    },
    select: {
      defaut: "none",
      type: String,
      validator(value) {
        return ["none", "single", "multi"].indexOf(value) !== -1;
      },
    },
    selection: {
      type: Array,
      required: false
    },
  },
  watch: {
    selection(value) {
      if (value !== undefined) this.internalSelection = value;
    },
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("pageChange", val);
      },
    },
  },
  methods: {
    isSelected(media) {
      return this.internalSelection.findIndex((m) => m.id === media.id) !== -1;
    },
    selectMedia(media) {
      switch (this.select) {
        case "single":
          this.$emit("selectionChange", media);
          this.internalSelection = [media];
          this.$emit("update:selection", this.internalSelection);
          break;
        case "multi":
          const index = this.internalSelection.findIndex(m => m.id === media.id);
          index == -1
            ? this.internalSelection.push(media)
            : this.internalSelection.splice(index, 1);
          this.internalSelection = this.internalSelection.slice();
          this.$emit("selectionChange", this.internalSelection);
          this.$emit("update:selection", this.internalSelection);
          break;
        default:
          this.editMedia(media);
          break;
      }
    },
    editMedia(media) {
      this.$emit("editMedia", media);
    },
    fileName(media) {
      return media && media.file && media.file.split("/").pop();
    },
  },
  mounted() {
    if (this.selection !== undefined) this.internalSelection = this.selection;
  },
};
</script>
