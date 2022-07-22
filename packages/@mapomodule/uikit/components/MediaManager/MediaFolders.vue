<template>
  <div class="media-folders-wrapper">
    <div v-if="parentFolders && parentFolders.length">
      <span class="mx-2 mt-1 d-flex flex-wrap align-center">
        <span class="mb-1">
          <v-icon @click="goToFolder()" small>mdi-home</v-icon></span
        >
        <span class="fpath__button" v-for="(f, i) in parentFolders" :key="i"
          >/<a @click="i !== parentFolders.length - 1 && goToFolder(f)">{{
            f.slug
          }}</a>
        </span>
      </span>
    </div>
    <v-card-actions class="flex-wrap px-0">
      <div v-if="parentFolder" class="d-none d-sm-block">
        <v-btn
          class="px-2"
          tile
          block
          text
          depressed
          @click="goToFolder(updirFolder)"
        >
          <v-icon> mdi-arrow-left </v-icon>
        </v-btn>
      </div>
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="d-flex child-flex"
        :class="{ 'px-1': expanded }"
      >
        <div class="folder_grid d-flex flex-column" :class="{ expanded }">
          <v-icon @click.stop="goToFolder(folder)" :size="expanded ? 100 : 40">
            mdi-folder
          </v-icon>

          <div>
            <div class="d-flex justify-item-center" :style="hideSlug">
              <span class="folder_slug">
                {{ folder.title }}
              </span>
              <v-icon
                size="20"
                class="folder_grid__editicon ma-0 ml-auto"
                @click.stop="createFolder(folder)"
                >mdi-pencil</v-icon
              >
              <v-icon
                size="20"
                class="folder_grid__editicon ma-0"
                @click.stop="deleteFolder(folder)"
                >mdi-delete</v-icon
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex-grow-1 text-center" v-if="!folders.length">
        {{ $t("mapo.mediaFolders.noFolders") }}
      </div>
      <div class="ma-auto mr-2 mb-2">
        <v-tooltip left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click.stop="createFolder">
              mdi-plus
            </v-icon>
          </template>
          <span>{{ $t("mapo.mediaFolders.newFolder") }}</span>
        </v-tooltip>
        <v-tooltip v-if="folders.length" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              v-bind="attrs"
              v-on="on"
              :style="rotate"
              @click.prevent="expanded = !expanded"
            >
              mdi-chevron-down
            </v-icon>
          </template>
          <span>{{ expanded ? $t("mapo.collapse") : $t("mapo.expand") }}</span>
        </v-tooltip>
      </div>
    </v-card-actions>
    <v-progress-linear
      :active="loading"
      indeterminate
      height="2"
    ></v-progress-linear>

    <v-divider></v-divider>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title>
          {{ folderEdit.id ? $t("mapo.mediaFolders.editFolder") : $t("mapo.mediaFolders.newFolder") }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="folderEdit.title"
                  :label="$t('mapo.mediaFolders.folderName')"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="closeEdit">{{ $t('mapo.cancel') }}</v-btn>
          <v-btn color="primary" text @click="saveFolder">{{ $t('mapo.create') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.media-folders-wrapper{
  width: 100%;
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 1.4rem;
}
.folder_grid {
  .folder_slug {
    width: 65px;
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    line-height: 20px;
  }
  &__editicon {
    display: none;
  }
  &.expanded {
    .folder_slug {
      text-align: left;
      padding-left: 5px;
    }
    .folder_grid__editicon {
      display: block;
    }
  }
}

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
    }
  }
}
</style>

<script>
export default {
  name: "MediaFolders",
  data() {
    return {
      expanded: false,
      dialog: false,
      folderEdit: {}
    };
  },
  props: {
    loading: Boolean,
    folders: {
      type: Array,
      default: () => []
    },
    parentFolders: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    goToFolder(folder) {
      this.$emit("goToFolder", folder);
    },
    createFolder(folder) {
      this.folderEdit = Object.assign(
        { updir: this.parentFolder && this.parentFolder.id },
        folder
      );
      this.dialog = true;
    },
    deleteFolder(folder) {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.mediaFolders.confirmDelete"),
          approveButton: { text: this.$t("mapo.delete"), attrs: { color: "red", text: true } }
        })
        .then(res => res && this.$emit("deleteFolder", folder));
    },
    saveFolder() {
      this.folderEdit.slug = this.slugify(this.folderEdit.title);
      this.$emit("updateFolder", this.folderEdit);
      this.closeEdit();
    },
    closeEdit() {
      this.dialog = false;
      this.folderEdit = {};
    },
    slugify(text) {
      return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/[^\w\-]+/g, "") // Remove all non-word chars
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // Trim - from end of text
    }
  },
  computed: {
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .3s cubic-bezier(0.25, 0.8, 0.5, 1)"
      };
    },
    hideSlug() {
      return {
        maxWidth: this.expanded ? "105px" : "50px",
        maxHeight: this.expanded ? "24px" : "18px",
        opacity: this.expanded ? 0.8 : 0.8,
        transform: this.expanded ? "scale(1)" : "scale(0.7)",
        transition: "all .3s cubic-bezier(0.25, 0.8, 0.5, 1)"
      };
    },
    parentFolder() {
      return (
        (this.parentFolders &&
          this.parentFolders.length > 0 &&
          this.parentFolders[this.parentFolders.length - 1]) ||
        null
      );
    },
    updirFolder() {
      return (
        (this.parentFolders &&
          this.parentFolders.length > 1 &&
          this.parentFolders[this.parentFolders.length - 2]) ||
        null
      );
    }
  }
};
</script>
