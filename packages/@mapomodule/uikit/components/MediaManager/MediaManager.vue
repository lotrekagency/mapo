<template>
  <div class="d-flex fill-height flex-column-reverse flex-sm-row" style="position: relative">
    <MediaFolders v-show="!editMedia" v-if="!noFolders" />
    <v-card elevation="0" class="flex-grow-1 d-flex flex-column rounded-0" :class="{ transparent: !fillBackgroud }">
    <v-card-title class="d-flex flex-wrap pa-0">
      <div>
        <v-tabs v-model="tab" right background-color="transparent">
          <v-tab>{{ $t("mapo.mediaManager.gallery") }}</v-tab>
          <v-tab>{{ $t("mapo.mediaManager.uploader") }}</v-tab>
        </v-tabs>
      </div>
      <v-btn v-show="$vuetify.breakpoint.xs" class="ma-2 ml-auto" @click="getRoot" icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
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
      <v-btn v-show="!$vuetify.breakpoint.xs" class="ma-2" @click="getRoot" icon>
        <v-icon>mdi-update</v-icon>
      </v-btn>
      </div>
    </v-card-title>
    <MediaBreadcrumbs/>
    <v-card-text class="pa-0 flex-grow-1">
      <v-tabs-items v-model="tab" class="transparent fill-height">
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
    <v-card-actions>
      <!-- Slot to provide custom button actions inside the media manager -->
      <slot name="actions"></slot>
    </v-card-actions>
  </v-card>
  </div>
  
</template>
<style lang="scss">
.fpath__button {
  padding-left: 7px;
  color: grey;
  a {
    margin-left: 7px;
  }
  &:last-child {
    a {
      color: unset;
      cursor: auto;
      pointer-events: none;
    }
  }
}
</style>

<script>
import { debounce } from "@mapomodule/utils/helpers/debounce";
import { mapGetters, mapActions } from "vuex"

const initialData = () => ({
  tab: 0,
  searchValue: "",
  loadingSearch: false,
});

export default {
  name: "MediaManager",
  data: initialData,
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
    reset() {
      Object.assign(this.$data, initialData());
      this.getRoot();
    },
  },
  async fetch() {
    await this.getRoot();
  },
};
</script>
