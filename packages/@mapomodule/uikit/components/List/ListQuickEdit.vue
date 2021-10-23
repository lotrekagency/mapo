<template>
  <div>
    <slot v-bind="{ on, attrs }" name="activator"></slot>
    <v-dialog v-model="dialog" width="600">
      <v-card v-bind="$attrs">
        <v-card-title>
          <slot name="title" v-bind="{ formTitle, editedItem }">
            <span class="headline">{{ formTitle }}</span>
          </slot>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form v-if="editedItem" ref="form">
              <slot name="body" v-bind="{ editedItem }">
                <v-row>
                  <v-col
                    v-for="field in computedFields"
                    :key="field.value"
                    cols="12"
                    :md="editFields.length > 1 ? 6 : 12"
                  >
                    <v-text-field
                      v-bind="field.attrs"
                      v-model="editedItem[field.value]"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </slot>
            </v-form>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <slot name="actions" v-bind="{ close, save }">
            <v-spacer></v-spacer>
            <v-btn text @click="close()"> Cancel </v-btn>
            <v-btn text @click="save"> Save </v-btn>
          </slot>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { filterObj } from "@mapomodule/utils/helpers/objHelpers";
/**
 * This components renders a dialog that let the user quick edit (or add) an element of the list.
 * The dialog provides several fields that will edit a payload that will be sent to the server. <br>
 * The component checks for editFields config or dedicated slots to decide if it should be available to the user.
 */
export default {
  name: "ListQuickEdit",
  data() {
    return {
      dialog: false,
      attrs: { ...this.$attrs },
      itemRef: null,
      editedItem: null,
      newItem: false,
      on: {
        click: (event) => {
          event.preventDefault();
          event.stopPropagation();
          this.dialog = !this.dialog;
        },
      },
    };
  },
  props: {
    // V-model
    value: {
      type: Boolean,
    },
    editTitle: {
      type: String,
      default: "",
    },
    editFields: {
      type: Array,
      default: () => [],
    },
    lookup: {
      type: String,
      default: "id",
    },
    crud: {
      type: Object,
      required: true,
    },
  },
  watch: {
    value(val) {
      this.dialog = val;
    },
    dialog(val) {
      this.$emit("input", val);
      this.$emit(val ? "open" : "close");
      if (!val) {
        this.close();
      }
    },
  },
  computed: {
    formTitle() {
      return `${this.newItem ? "Quick add" : "Quick edit"} ${this.editTitle}`;
    },
    computedFields() {
      return this.editFields.map((field, i) => {
        if (typeof field == "object") {
          return {
            ...field,
            attrs: {
              ...field.attrs,
              label: (field.attrs || {}).label || field.value.toUpperCase(),
            },
          };
        } else if (typeof field == "string") {
          return { attrs: { label: field.toUpperCase() }, value: field };
        } else {
          throw `editFields must me string or objects, error at index ${i}!`;
        }
      });
    },
    fieldNames() {
      return this.computedFields.map(({ value }) => value);
    },
  },
  methods: {
    open(item) {
      this.newItem = !item;
      this.itemRef = item;
      this.editedItem = filterObj(item, this.fieldNames);
      this.dialog = true;
      this.$refs.form?.resetValidation();
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    async save() {
      if (this.$refs.form?.validate()) {
        return await (this.newItem ? this.apiCreate() : this.apiEdit());
      }
    },
    close(res) {
      this.$refs.form?.resetValidation();
      this.resolve && this.resolve(res);
      this.dialog = false;
    },
    apiEdit() {
      return this.crud
        .partialUpdate(this.itemRef[this.lookup], this.editedItem)
        .then((res) => this.close(res));
    },
    apiCreate() {
      return this.crud.create(this.editedItem).then((res) => this.close(res));
    },
  },
};
</script>
