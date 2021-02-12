<template>
  <v-card>
    <v-card-text>
      <div>
        <v-row v-if="selection.length" class="mb-4 selection">
          <v-col
            v-for="media in selection"
            :key="media.file"
            class="d-flex"
            cols="2"
            sm="1"
            md="1"
            @click.stop="selectMedia(media)"
          >
            <v-img
              :src="media.file"
              :lazy-src="media.thumbnail"
              aspect-ratio="1"
              class="grey lighten-2 selection__item"
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
        <v-row
          v-if="!medias.length"
          class="d-flex flex-column"
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
            class="d-flex"
            cols="6"
            sm="3"
            md="2"
            @click.stop="selectMedia(media)"
          >
            <v-img
              v-bind:class="{ selected: isSelected(media) }"
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

<style lang="scss" scoped>
.selection {
  border-bottom: 1px solid #ffffff6b;
  &__confirm {
    margin: auto 0 auto auto;
    display: flex;
    justify-content: center;
    align-content: center;
    height: 100%;
  }
  &__item:hover::before {
    content: "\F0156";
    font: normal normal normal 30px/1 "Material Design Icons";
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background: #00000082;
    border: solid #ffffff6e 2px;
  }
}
.selected {
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
export default {
  data() {
    return {
      selection: [],
    };
  },
  props: {
    medias: {
      type: Array,
      required: true,
    },
    page: {
      type: Number,
      default: 1,
    },
    pages: {
      type: Number,
      default: 1,
    },
    select: {
      defaut: "none",
      type: String,
      validator(value) {
        return ["none", "single", "multi"].indexOf(value) !== -1;
      },
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
    isSelected(media) {
      return this.selection.findIndex((m) => m.id === media.id) !== -1;
    },
    selectMedia(media) {
      if (this.select == "single") {
        this.$emit("selectionChange", media);
      } else if (this.select == "multi") {
        const index = this.selection.findIndex((m) => m.id === media.id);
        index == -1
          ? this.selection.push(media)
          : this.selection.splice(index, 1);
        this.selection = this.selection.slice();
        this.$emit("selectionChange", this.selection);
      }
    },
  },
};
</script>
