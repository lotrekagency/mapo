<template>
  <v-card>
    <v-card-actions class="flex-wrap">
      <div
        v-for="folder in folders"
        :key="folder.id"
        class="d-flex child-flex mx-2"
      >
        <div>
          <v-tooltip :disabled="expanded" bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click.stop="goToFolder(folder)"
                :size="expanded ? 100 : 40"
                v-bind="attrs"
                v-on="on"
              >
                mdi-folder
              </v-icon>
            </template>
            <span>{{ folder.slug }}</span>
          </v-tooltip>

          <div>
            <div class="d-flex" :style="hideSlug">
              <span class="folder_slug">
                {{ folder.slug }}
              </span>
              <v-icon
                size="20"
                class="ma-0 ml-auto"
                @click.stop="createFolder(folder)"
                >mdi-pencil</v-icon
              >
              <v-icon size="20" class="ma-0" @click.stop="confirmDelete(folder)"
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
    <v-dialog v-model="deleteDialog" max-width="300px">
      <v-card>
        <v-card-title> Delete </v-card-title>

        <v-card-text>
          <v-container>
            <p>Are you sure to delelete this folder and all its content?</p>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="closeEdit"> Cancel </v-btn>
          <v-btn color="green darken-1" text @click="deleteFolder">
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<style lang="scss" scoped>
.folder_slug {
  width: 65px;
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<script>
export default {
  data() {
    return {
      expanded: false,
      dialog: false,
      deleteDialog: false,
      folderEdit: {},
      actions: [
        {
          label: "Create folder",
          action: this.createFolder,
        },
      ],
    };
  },
  computed: {
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
    hideSlug() {
      return {
        maxWidth: this.expanded ? null : 0,
        maxHeight: this.expanded ? null : 0,
        overflow: "hidden",
        transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1)",
      };
    },
  },
  props: {
    folders: {
      default: () => [],
    },
    parentFolder: {
      default: {},
    },
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
    confirmDelete(folder) {
      this.folderEdit = Object.assign({}, folder);
      this.deleteDialog = true;
    },
    deleteFolder() {
      this.$emit("deleteFolder", this.folderEdit);
      this.closeEdit();
    },
    saveFolder() {
      this.$emit("updateFolder", this.folderEdit);
      this.closeEdit();
    },
    closeEdit() {
      this.dialog = false;
      this.deleteDialog = false;
      this.folderEdit = {};
    },
  },
};
</script>
