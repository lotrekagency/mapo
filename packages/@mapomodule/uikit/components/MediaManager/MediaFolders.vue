<template>
  <div>
    <v-card-actions class="flex-wrap">
      <div v-if="parentFolder" class="h-100">
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
        class="d-flex child-flex mx-2"
      >
        <div>
          <v-icon @click.stop="goToFolder(folder)" :size="expanded ? 100 : 40">
            mdi-folder
          </v-icon>

          <div>
            <div class="d-flex justify-item-center" :style="hideSlug">
              <span class="folder_slug">
                {{ folder.slug }}
              </span>
              <v-icon
                v-if="expanded"
                size="20"
                class="ma-0 ml-auto"
                @click.stop="createFolder(folder)"
                >mdi-pencil</v-icon
              >
              <v-icon
                size="20"
                class="ma-0"
                @click.stop="deleteFolder(folder)"
                v-if="expanded"
                >mdi-delete</v-icon
              >
            </div>
          </div>
        </div>
      </div>
      <div class="flex-grow-1 text-center" v-if="!folders.length">
        No folders there.. Create a new one!
      </div>
      <div class="ma-auto mr-2 mb-2">
        <v-tooltip disabled left>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" v-on="on" @click.stop="createFolder">
              mdi-plus
            </v-icon>
          </template>
          <span>Add folder</span>
        </v-tooltip>
        <v-tooltip v-if="folders.length" disabled bottom>
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
          <span>{{ expanded ? "Collapse" : "Expand" }} view</span>
        </v-tooltip>
      </div>
    </v-card-actions>
    <v-progress-linear
      :active="loading"
      indeterminate
      height="2"
    ></v-progress-linear>

    <v-divider></v-divider>
    <div v-if="parentFolders && parentFolders.length">
      <span class="mx-2 mt-1 d-flex align-center">
        <span class="mb-1">
          <v-icon @click="goToFolder()" small>mdi-home</v-icon></span
        >
        <span v-for="(f, i) in parentFolders" :key="i"
          >/<a class="fpath__button" @click="goToFolder(f)">{{ f.slug }}</a>
        </span>
      </span>
    </div>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title>
          {{ folderEdit.id ? "Edit Folder" : "New Folder" }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="folderEdit.title"
                  label="Folder name"
                ></v-text-field>
                <v-text-field
                  v-model="folderEdit.slug"
                  label="Folder slug"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeEdit"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="saveFolder"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<style lang="scss" scoped>
.folder_slug {
  width: 65px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.fpath__button {
  &:hover {
    text-decoration: underline;
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
      folderEdit: {},
      actions: [
        {
          label: "Create folder",
          action: this.createFolder
        }
      ]
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
          title: "Delete",
          question: "Are you sure to delelete this folder and all its content?",
          approveButton: { text: "Delete", attrs: { color: "red" } }
        })
        .then(res => res && this.$emit("deleteFolder", folder));
    },
    saveFolder() {
      this.$emit("updateFolder", this.folderEdit);
      this.closeEdit();
    },
    closeEdit() {
      this.dialog = false;
      this.folderEdit = {};
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
