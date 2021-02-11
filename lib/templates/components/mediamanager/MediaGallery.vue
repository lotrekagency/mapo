<template>
  <v-card>
    <v-card-text>
      <div>
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
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    medias: {
      required: true,
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
