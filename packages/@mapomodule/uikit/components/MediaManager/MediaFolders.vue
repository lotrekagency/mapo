<template>
  <div class="media-navigation">
    <div class="media-navigation--spacer">
      <v-btn
        class="open-button"
        v-if="isMobile"
        tile
        block
        @click="mobileOpened = !mobileOpened"
        ><v-icon>mdi-chevron-up-circle-outline</v-icon></v-btn
      >
    </div>
    <v-navigation-drawer
      v-model="mobileOpened"
      v-bind="drawnerProps"
      absolute
      bottom
    >
      <template v-slot:prepend>
        <v-list-item class="py-1" dense @click.stop="createFolder">
          <v-list-item-icon>
            <v-icon>mdi-folder-plus</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{
            $t("mapo.mediaFolders.newFolder")
          }}</v-list-item-title>
        </v-list-item>
        <v-divider></v-divider>
      </template>
      <template v-if="parentFolder" v-slot:append>
        <v-divider></v-divider>
        <v-list-item
          class="py-1"
          dense
          @click.stop="getRoot({ folder: parentParentFolder })"
        >
          <v-list-item-icon>
            <v-icon>mdi-chevron-double-left</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ $t("mapo.mediaFolders.goBack") }}
          </v-list-item-title>
        </v-list-item>
      </template>

      <v-list class="py-0" v-if="folders && folders.length" dense>
        <v-list-item
          v-for="folder in folders"
          :key="folder.id"
          @click.stop="getRoot({ folder })"
        >
          <v-list-item-icon dense>
            <v-icon>mdi-folder-image</v-icon>
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
      <div v-else class="media-folders--empty text--secondary body-2">
        <v-icon size="60"> mdi-folder-information-outline</v-icon>
        <p>{{ $t("mapo.mediaFolders.noFolders") }}</p>
      </div>
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
  z-index: 2;
  &--spacer {
    width: 56px;
  }
  @media (max-width: 600px) {
    &--spacer {
      width: 100%;
    }
  }
}

.media-folders--empty {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
}

.v-navigation-drawer--close {
  display: none;
}
.v-navigation-drawer--open-on-hover {
  .v-navigation-drawer__content {
    overflow-y: hidden;
  }
  .media-folders--empty {
    opacity: 0;
  }
}
.v-navigation-drawer--is-mouseover {
  z-index: 100;
  .v-navigation-drawer__content {
    overflow-y: auto;
  }
  .media-folders--empty {
    opacity: 1;
  }
}
</style>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "MediaFolders",
  data() {
    return {
      mobileOpened: false,
      expanded: false,
      dialog: false,
      folderEdit: {},
    };
  },
  methods: {
    ...mapActions("mapo/media", [
      "getRoot",
      "deleteFolder",
      "updateOrCreateFolder",
    ]),
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
    ...mapGetters("mapo/media", [
      "folders",
      "parentFolders",
      "loading",
      "parentFolder",
    ]),
    isMobile() {
      return this.$vuetify.breakpoint.xs;
    },
    parentParentFolder() {
      return this.parentFolders[this.parentFolders.length - 2] || { path: "/" };
    },
    drawnerProps() {
      return {
        permanent: !this.isMobile,
        expandOnHover: !this.isMobile,
      };
    },
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
