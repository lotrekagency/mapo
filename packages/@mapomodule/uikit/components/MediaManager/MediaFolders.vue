<template>
  <div class="media-navigation">
    <div class="media-navigation--spacer"></div>
    <v-navigation-drawer expand-on-hover permanent absolute bottom>
      <div style="position: sticky; top: 0px">
        <v-list nav dense>
          <v-list-item dense @click.stop="createFolder">
            <v-list-item-icon>
              <v-icon>mdi-plus</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Add folder</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>
      </div>

      <v-list nav dense>
        <v-list-item
          dense
          v-for="folder in folders"
          :key="folder.id"
          @click.stop="getRoot({ folder })"
        >
          <v-list-item-icon dense>
            <v-icon>mdi-folder</v-icon>
          </v-list-item-icon>
          <v-list-item-content dense>
            <v-list-item-title v-text="folder.title"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action class="d-flex flex-row" dense>
            <v-icon
              size="16"
              class="folder_grid__editicon ma-0 ml-auto"
              @click.stop="createFolder(folder)"
              >mdi-pencil</v-icon
            >
            <v-icon
              size="16"
              class="folder_grid__editicon ma-0"
              @click.stop="confirmDelete(folder)"
              >mdi-delete</v-icon
            >
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-dialog v-model="dialog" max-width="300px">
      <v-card>
        <v-card-title>
          {{
            folderEdit.id
              ? $t("mapo.mediaFolders.editFolder")
              : $t("mapo.mediaFolders.newFolder")
          }}
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
          <v-btn color="primary" text @click="closeEdit">{{
            $t("mapo.cancel")
          }}</v-btn>
          <v-btn color="primary" text @click="saveFolder">{{
            $t("mapo.create")
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss">
.media-navigation {
  &--spacer {
    width: 56px;
    height: unset;

  }
  @media (max-width: 400px) {
    &--spacer {
      width: 0;
      height: 56px;
    }
  }
}

.v-navigation-drawer--open-on-hover {
  .v-navigation-drawer__content {
    overflow-y: hidden;
  }
}
.v-navigation-drawer--is-mouseover {
  z-index: 100;
  .v-navigation-drawer__content {
    overflow-y: auto;
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex"

export default {
  name: "MediaFolders",
  data() {
    return {
      expanded: false,
      dialog: false,
      folderEdit: {},
    };
  },
  methods: {

    ...mapActions("mapo/media", ["getRoot",  "deleteFolder", "updateOrCreateFolder"]),
    createFolder(folder) {
      this.folderEdit = Object.assign(
        { updir: this.parentFolder && this.parentFolder.id },
        folder
      );
      this.dialog = true;
    },
    confirmDelete(folder) {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.mediaFolders.confirmDelete"),
          approveButton: {
            text: this.$t("mapo.delete"),
            attrs: { color: "red", text: true },
          },
        })
        .then((res) => res && this.deleteFolder(folder));
    },
    saveFolder() {
      this.folderEdit.slug = this.slugify(this.folderEdit.title);
      this.updateOrCreateFolder(this.folderEdit);
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
    },
  },
  computed: {
    ...mapGetters("mapo/media", ["folders", "parentFolders", "loading"]),
    rotate() {
      return {
        transform: this.expanded ? "rotate(180deg)" : "rotate(0deg)",
        transition: "transform .3s cubic-bezier(0.25, 0.8, 0.5, 1)",
      };
    },
    hideSlug() {
      return {
        maxWidth: this.expanded ? "105px" : "50px",
        maxHeight: this.expanded ? "24px" : "18px",
        opacity: this.expanded ? 0.8 : 0.8,
        transform: this.expanded ? "scale(1)" : "scale(0.7)",
        transition: "all .3s cubic-bezier(0.25, 0.8, 0.5, 1)",
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
    },
  },
};
</script>
