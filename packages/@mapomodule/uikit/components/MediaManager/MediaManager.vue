<template>
  <div class="media-manager--wrapper">
    <MediaFolders v-show="!editMedia" v-if="!noFolders" />
    <v-card elevation="0" class="d-flex flex-column flex-grow-1 rounded-0" :class="{ transparent: !fillBackgroud }">
    <v-card-title class="d-flex flex-wrap pa-0 pb-2">
      <div class="d-flex flex-grow-1">
        <v-tabs v-model="tab" background-color="transparent" :show-arrows="false">
          <v-tab>{{ $t("mapo.mediaManager.gallery") }}</v-tab>
          <v-tab>{{ $t("mapo.mediaManager.uploader") }}</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-btn v-show="$vuetify.breakpoint.xs" class="ma-2 ml-auto" @click="getRoot" icon>
          <v-icon>mdi-update</v-icon>
        </v-btn>
      </div>
      <div class="d-flex ma-auto mr-0" :style="$vuetify.breakpoint.xs ? 'width: 100%' : ''">
        <v-text-field
        v-show="!editMedia && tab == 0"
        v-model="searchValue"
        @input="
          loadingSearch = true;
          search();
        "
        prepend-inner-icon="mdi-magnify"
        :label="$t('mapo.search')"
        single-line
        hide-details
        outlined
        dense
        clearable
        :loading="loadingSearch"
        class="mx-2 mt-2"
      ></v-text-field>
      <v-btn v-show="!$vuetify.breakpoint.xs" class="ma-2 ml-0" @click="getRoot" icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
      </div>
    </v-card-title>
    <MediaBreadcrumbs/>
    <v-card-text class="media-manager--card-text pb-0">
      <v-tabs-items touchless v-model="tab" class="transparent fill-height">
        <v-tab-item class="fill-height">
          <MediaGallery
            v-show="!editMedia"
            v-bind="{ select }"
            :selection="$attrs.selection"
            @update:selection="$emit('update:selection', $event)"
            @selectionChange="selectionChange($event)"
          />
          <MediaEditor/>
        </v-tab-item>
        <v-tab-item class="fill-height">
          <MediaUploader
            @Upload="
              tab = 0;
              getRoot({ page: 1 });
            "
          />
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    <v-card-actions class="py-0">
      <!-- Slot to provide custom button actions inside the media manager -->
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
  </div>
  
</template>
<style lang="scss">
.v-slide-group__next--disabled, .v-slide-group__prev--disabled{
  display: none !important;
}
.media-manager--card-text{
  max-height: calc(90vh - 20px);
  flex-grow: 1;
  @media (max-width: 600px){
    max-height: calc(90vh - 130px);
  }
}
.v-dialog .media-manager--card-text{
  max-height: calc(90vh - 240px);
}
.media-manager--wrapper{
  display: flex;
  height: inherit;
  flex-direction: column-reverse;
  position: relative;
  justify-content: flex-end;
  @media (min-width: 600px){
    flex-direction: row;
  }
}
</style>

<script>
import { debounce } from "@mapomodule/utils/helpers/debounce";
import { mapGetters, mapActions } from "vuex"


export default {
  name: "MediaManager",
  data(){
    return {
      tab: 0,
      searchValue: "",
      loadingSearch: false,
    }
  },
  props: {
    select: {
      type: String,
      default: "none",
      validator(val) {
        return ["none", "single", "multi"].indexOf(val) !== -1;
      },
    },
    noFolders: {
      type: Boolean,
      default: false,
    },
    mime: {
      type: String,
      required: false,
    },
    fillBackgroud: Boolean
  },
  watch: {
    '$i18n.locale': async function(locale) {
      if (this.editMedia)
        this.openEditor(this.editMedia);
    }
  },
  computed: mapGetters("mapo/media", ["parentFolder", "medias", "folders", "parentFolders", "page", "pages", "loading", "editMedia" ]),
  methods: {
    ...mapActions("mapo/media", ["getRoot", "openEditor", "updateMedia", "updateOrCreateFolder", "deleteFolder", "deleteMedia"]),
    selectionChange(event) {
      this.$emit("selectionChange", event);
    },
    search: debounce(function () {
      this.getRoot({search: this.searchValue}).then(() => (this.loadingSearch = false));
    }, 500),
  },
  async fetch() {
    await this.getRoot();
  },
};
</script>
