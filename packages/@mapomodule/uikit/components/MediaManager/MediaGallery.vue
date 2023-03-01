<template>
  <div class="media-gallery--wrapper">
    <draggable
      v-model="draggableSelection"
      animation="150"
      v-if="selection && selection.length && selectMode == 'multi'"
      class="media-gallery--selection grey darken-2"
    >
      <MediaPreview
        v-for="media in selection"
        :key="media.file"
        @click.native.stop="select(media)"
        :media="media"
        icon-size="20px"
        class="elevation-4 media-gallery--selection-item"
      />
    </draggable>
    <div class="media-gallery--selectAll" v-if="editListSet.size">
      <div class="media-gallery--select-action">
        <v-icon
          v-if="editListState.outside"
          @click="editSelect('__clear__')"
          dense
          left
          color="error"
          >mdi-close-box-outline</v-icon
        >
        <span class="mr-2"
          >{{ editListSet.size }}
          {{ $t("mapo.mediaGallery.selectedAssets") }}</span
        >
        <!-- <v-btn text small> <v-icon left>mdi-image-move</v-icon> Move</v-btn> -->
        <v-btn text small @click="deleteSelected">
          <v-icon left>mdi-delete-sweep</v-icon> {{ $t("mapo.delete") }}</v-btn
        >
      </div>
      <div class="media-gallery--select-action">
        <v-checkbox
          hide-details
          dense
          color="accent"
          :label="
            editListState.value
              ? $t('mapo.mediaGallery.deselectAll')
              : $t('mapo.mediaGallery.selectAll')
          "
          @click="editSelect(medias.map((m) => m.id))"
          :input-value="editListState.value"
          :indeterminate="editListState.indeterminate"
        />
      </div>
    </div>
    <div ref="masonry" class="media-gallery--masonry" v-if="medias.length">
      <div
        v-for="media in medias"
        :key="media.file"
        class="media-gallery--card"
      >
        <v-btn
          v-if="selectMode != 'none'"
          @click.stop="openEditor(media)"
          icon
          small
          :ripple="false"
          color="white"
          class="media-gallery--card-btn"
        >
          <v-icon>mdi-circle-edit-outline</v-icon>
        </v-btn>
        <v-checkbox
          hide-details
          dense
          @click="editSelect(media.id)"
          :input-value="editListSet.has(media.id)"
          color="accent"
          class="media-gallery--card-checkbox"
        />
        <MediaPreview
          class="elevation-4 cursor-pointer"
          :media="media"
          :class="{ 'media-gallery--selected': isSelected(media)}"
          @click.native="select(media)"
          filename
          video-preview
        />
      </div>
    </div>
    <div class="media-gallery--loading" v-else-if="loading">
      <v-icon size="30">mdi-timer-sand</v-icon>
      {{ $t('mapo.fetchingData') }}
    </div>
    <div class="media-gallery--empty" v-else>
      <v-icon size="60"> mdi-image-off-outline </v-icon>
      <p>{{ $t("mapo.mediaGallery.noMediaFound") }}</p>
    </div>
    <v-pagination
      class="mt-2"
      v-if="pages > 1"
      v-model="currentPage"
      :length="pages"
    ></v-pagination>
  </div>
</template>

<style lang="scss">
.cursor-pointer{
  cursor: pointer;
}
.media-gallery--card {
  display: flex;
  position: relative;
  &-btn {
    position: absolute;
    z-index: 1;
    right: 0;
    bottom: 0;
    background: #1e1e1ea1;
    border-radius: 50% 0 0;
  }
  &-checkbox {
    position: absolute;
    z-index: 1;
    right: 0;
    top: 0;
    margin: 0;
    opacity: 0;
    transition: opacity 0.5s;
    &.v-input--is-label-active {
      opacity: 1;
    }
  }
  &:hover {
    .media-gallery--card-checkbox {
      opacity: 1;
    }
  }
}
.media-gallery--selectAll {
  display: flex;
  justify-content: space-between;
  padding: 0 24px 0 10px;
  flex-wrap: wrap;
}
.media-gallery--select-action {
  display: flex;
  align-items: center;
}

.media-gallery--wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
}

$wcol: calc(100% / 6 - 12px);


.media-gallery--masonry {
  width: 100%;
  padding: 10px;
  overflow-y: auto;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: $wcol $wcol $wcol $wcol $wcol $wcol;
  grid-template-rows: auto auto auto ;
  column-gap: 12px;
  row-gap: 12px;
}

@media (max-width: 960px) {
  $wcol: calc(100% / 3 - 12px);
  .media-gallery--masonry{
    grid-template-columns: $wcol $wcol $wcol;
  }
}

@media (max-width: 600px) {
  $wcol: calc(100% / 2 - 6px);
  .media-gallery--masonry{
    grid-template-columns: $wcol $wcol;
  }
} 

.media-gallery--empty{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
}
.media-gallery--loading{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.media-gallery--selection {
  min-height: 60px;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;

  margin-bottom: 10px;
  &-item{
    width: 50px;
    height: 50px;
    flex-grow: 0;
    margin: 5px;
    cursor: pointer;
    &:hover::before {
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
  
}
.media-gallery--selected {
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
import { mapGetters, mapActions } from "vuex"
import draggable from "vuedraggable";

export default {
  name: "MediaGallery",
  components: { draggable },
  computed: {
    ...mapGetters("mapo/media", ["page", "pages", "medias", "selection", "selectMode", "loading", "editListState", "editListSet"]),
    draggableSelection: {
      get() { return this.selection; },
      set(val) { this.setSelection(val); }
    },
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.getRoot({ page: val }).then(() => {
          this.$refs.masonry?.scrollTo({ top: 0, behavior: "smooth" })
        })
      },
    },
  },
  methods: {
    ...mapActions("mapo/media", ["getRoot", "openEditor", "select", "setSelection", "editSelect", "deleteSelected"]),
    isSelected(media) {
      switch (this.selectMode) {
        case "multi":
          return this.selection.findIndex((m) => m.id === media.id) !== -1;
        case "single":
          return this.selection?.id === media.id;
        default:
          return false;
      }
    },
    fileName(media) {
      return media && media.file && media.file.split("/").pop();
    },
  },
};
</script>
