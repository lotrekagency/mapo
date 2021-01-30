<template>
  <v-card>
    <v-card-actions>
      <v-menu top offset-x>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, index) in actions[current]" :key="index">
            <v-list-item-title @click.prevent="item.action">{{
              item.label
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-badge
        v-if="current !== 'folders'"
        color="green"
        overlap
        v-model="folders.length"
        :content="folders.length"
      >
        <v-btn @click.stop="current = 'folders'" icon>
          <v-icon>mdi-folder</v-icon>
        </v-btn>
      </v-badge>
      <v-badge
        v-if="current !== 'medias'"
        color="green"
        overlap
        v-model="medias.length"
        :content="medias.length"
      >
        <v-btn @click.stop="current = 'medias'" icon>
          <v-icon>mdi-image</v-icon>
        </v-btn>
      </v-badge>
    </v-card-actions>
    <v-card-text>
      <div v-if="current == 'folders'">
        <v-row
          v-if="!folders.length"
          class="d-flex flex-column cursor-pointer"
          dense
          align="center"
          justify="center"
        >
          <v-icon size="60"> mdi-alert-circle-outline </v-icon>
          <p>No folder fund...</p>
        </v-row>
        <v-row v-if="folders.length">
          <v-col
            v-for="folder in folders"
            :key="folder.id"
            class="d-flex child-flex"
            cols="6"
            sm="3"
            md="2"
          >
            <div>
              <v-icon @click.stop="goToFolder(folder)" size="100">
                mdi-folder
              </v-icon>
              <div>
                {{ folder.slug }}
                <v-btn
                  class="ma-auto mr-0"
                  @click.stop="createFolder(folder)"
                  icon
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-btn
                  class="ma-auto mr-0"
                  @click.stop="createFolder(folder)"
                  icon
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
      </div>
      <div v-if="current == 'medias'">
        <v-row
          v-if="!medias.length"
          class="d-flex flex-column cursor-pointer"
          dense
          align="center"
          justify="center"
        >
          <v-icon size="60"> mdi-alert-circle-outline </v-icon>
          <p>No media fund...</p>
        </v-row>
        <v-row v-if="medias.length">
          <v-col
            v-for="media in medias"
            :key="media.file"
            class="d-flex child-flex"
            cols="6"
            sm="3"
            md="2"
          >
            <v-img
              :src="media.file"
              :lazy-src="media.thumbnail"
              aspect-ratio="1"
              class="grey lighten-2"
            >
              <template v-slot:placeholder>
                <v-row class="fill-height ma-0" align="center" justify="center">
                  <v-progress-circular
                    indeterminate
                    color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-col>
        </v-row>
      </div>
      <v-row>
        <v-col cols="12">
          <v-pagination
            v-if="pages > 1"
            v-model="currentPage"
            :length="pages"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-card-text>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card v-if="folderEdit">
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
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      folderEdit: null,
      current: "medias",
      actions: {
        medias: [{ label: "", action() {} }],
        folders: [
          {
            label: "Create folder",
            action: this.createFolder,
          },
        ],
      },
    };
  },
  props: {
    medias: {
      required: true,
    },
    folders: {
      default: [],
    },
    page: {
      default: 1,
    },
    pages: {
      default: 1,
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
    goToFolder(folder) {
      this.$emit("goToFolder", folder);
    },
    createFolder(folder) {
      this.folderEdit = folder || {};
      this.dialog = true;
    },

    saveFolder() {
      this.$emit("updateFolder", this.folderEdit);
      this.closeEdit();
    },
    closeEdit() {
      this.dialog = false;
      this.folderEdit = null;
    },
  },
};
</script>
