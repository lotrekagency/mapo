<template>
  <div>
    <v-card :min-width="minWidth" :min-height="minHeight">
        <v-card-actions>
          <v-row justify="center" class="ma-1">
            <v-btn @click="mmdialog = true" block outlined>New Selection</v-btn>
          </v-row>
        </v-card-actions>

        <v-window v-model="page">
          <v-window-item
            class="page"
            v-for="(pageMedias, i) in paginatedMedias"
            :key="i"
          >
            <v-container class="pa-0">
              <v-row
                v-for="row in rows"
                :key="row"
                align="center"
                align-content="center"
                justify="center"
              >
                <v-col v-for="col in cols" :key="col">
                  <MediaElement
                    v-model="pageMedias[getIndexFromGrid(row, col)]"
                    :aspect-ratio="1"
                    rm-add-btn
                    @changed-media="checkDeletion($event, i, row, col)"
                  />
                </v-col>
              </v-row>
            </v-container>
          </v-window-item>
        </v-window>


        <v-card-actions class="my-auto paginator">
          <v-row justify="center" class="py-2 my-auto">
            <v-btn text @click="prev">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-item-group v-model="page" class="text-center mx-1" mandatory>
              <v-item
                v-for="n in pages"
                :key="`btn-${n}`"
                v-slot="{ active, toggle }"
              >
                <v-btn :input-value="active" icon @click="toggle">
                  <v-icon>mdi-record</v-icon>
                </v-btn>
              </v-item>
            </v-item-group>
            <v-btn text @click="next">
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-row>
        </v-card-actions>
    </v-card>

    <media-manager-dialog
      v-model="mmdialog"
      select="multi"
      v-on:selectionChange="update"
    >
    </media-manager-dialog>
  </div>
</template>

<style scoped>
	.paginator{
		position: absolute;
		bottom: 0;
		width: 100%;
	}
</style>

<script>
export default {
  transition: "tasks-transition",
  data() {
    return {
      child_medias: [],

      page: 0,
      mmdialog: false,
    };
  },

  props: {
    medias: {
      type: Array,
      default: () => [],
    },
    cols: {
      type: Number,
      default: 2,
    },
    rows: {
      type: Number,
      default: 2,
    },

    //reflections
    minWidth: {
      type: Number | String,
      default: 500,
    },
    minHeight: {
      type: Number | String,
      default: 500,
    },
  },

  model: {
    prop: "medias",
    event: "changed-selection",
  },

  mounted() {
    if (this.medias) this.child_medias = this.medias;
  },

  computed: {
    mediasPerPage() {
      return this.cols * this.rows;
    },
    pages() {
      return Math.ceil(this.child_medias.length / this.mediasPerPage);
    },
    paginatedMedias() {
      var array = new Array(this.pages);
      for (let i = 0; i < array.length; i++) {
        array[i] = this.child_medias.slice(
          i * this.mediasPerPage,
          (i + 1) * this.mediasPerPage
        );
      }
      return array;
    },
  },

  methods: {
    getIndexFromGrid(row, col) {
      return (row - 1) * this.cols + col - 1;
    },
    update(selection) {
      console.log(selection);
      this.child_medias = [...selection];
      this.$emit("changed-selection", [...selection]);
    },
    checkDeletion(event, page, row, col) {
      //if event is not empty, then exit
      if (event) return;

      let index = this.mediasPerPage * page + this.getIndexFromGrid(row, col);
      this.child_medias.splice(index, 1);
      this.update(this.child_medias);
    },
    next() {
      this.page = this.page + 1 === this.length ? 0 : this.page + 1;
    },
    prev() {
      this.page = this.page - 1 < 0 ? this.length - 1 : this.page - 1;
    },
  },

  watch: {
    medias(val) {
      this.child_medias = val;
    },
  },
};
</script>