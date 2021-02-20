<template>
  <div class="detail__dialog">
    <v-dialog max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          New Item
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Titolo</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.name"
                  label="Name label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.first"
                  label="First value label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.second"
                  label="Second value label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.third"
                  label="Third value label"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  v-model="editedItem.fourth"
                  label="Fourth value label"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline"
          >Are you sure you want to delete this item?</v-card-title
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm"
            >OK</v-btn
          >
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";
.detail {
  &__dialog {
  }
}
</style>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    typeSwitcher: Boolean,
    editedItem: {
      name: "",
      first: 0,
      second: 0,
      third: 0,
      fourth: 0,
    },
  }),
  props: {
    title: String,
    permalink: String,
  },
  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },
  methods: {
    initialize() {
      this.placeholderItem = [
        {
          name: "Placeholder Item Name",
          first: 159,
          second: 6.0,
          third: 24,
          fourth: 4.0,
        },
      ];
    },
    editItem(item) {
      this.editedIndex = this.placeholderItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.placeholderItem.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.placeholderItem.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.placeholderItem[this.editedIndex], this.editedItem);
      } else {
        this.placeholderItem.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>