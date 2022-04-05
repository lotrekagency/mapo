<template>
  <div class="container pa-0">
    <span class="repeater-label">{{ label }}:</span>
    <v-divider />
    <draggable
      v-model="items"
      handle=".repeater-handle-sort"
      animation="150"
      @change="sortCallback({ ...$event, items, eventType: 'move' })"
    >
      <div
        class="repeater-wrapper"
        v-for="(model, index) in items"
        :key="index"
      >
        <div class="d-flex">
          <v-divider vertical />
          <div class="row ma-0">
            <div
              v-for="(field, i) in parsedFields"
              :key="i"
              :class="field.class || 'col-12'"
            >
              <DetailField
                v-model="items[index]"
                :conf="field"
                :errors="getErrors(index)"
              />
            </div>
          </div>
          <div class="repeater-side-bar grey lighten-2">
            <span
              class="repeater-counter grey--text text--darken-2 text-truncate"
              >{{ index + 1 }}</span
            >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-icon
                  v-if="!readonly && sortable"
                  v-bind="attrs"
                  v-on="on"
                  color="grey darken-3"
                  class="grey lighten-2 repeater-action repeater-add-line-index"
                  @click="addItem(index)"
                  >mdi-plus-circle-outline</v-icon
                >
              </template>
              <span>Add here</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-hover v-slot="{ hover }">
                  <v-icon
                    v-if="!readonly"
                    v-bind="attrs"
                    v-on="on"
                    :color="hover ? 'error' : 'grey darken-3'"
                    class="repeater-action repeater-remove-line"
                    @click="removeItem(index)"
                    >mdi-minus-circle-outline</v-icon
                  >
                </v-hover>
              </template>
              <span>Remove</span>
            </v-tooltip>
            <v-icon
              v-if="!readonly && sortable"
              color="grey darken-3"
              class="repeater-action repeater-handle-sort"
              >mdi-drag</v-icon
            >
          </div>
        </div>
        <v-divider />
      </div>
    </draggable>
    <div class="d-flex justify-end">
      <v-btn
        class="repeater-add-line"
        @click="addItem"
        :disabled="readonly"
        outlined
        tile
        text
      >
        <v-icon>mdi-plus</v-icon> Add</v-btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.repeater-action {
  display: none;
}
.repeater-side-bar {
  min-width: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  &:hover {
    .repeater-action {
      display: inline-flex;
    }
  }
  .repeater-counter {
    position: absolute;
    align-self: center;
    top: 10px;
  }
  .repeater-add-line-index {
    position: absolute;
    align-self: center;
    top: -11px;
    border-radius: 50%;
  }
  .repeater-handle-sort {
    position: absolute;
    align-self: center;
    bottom: 2px;
    cursor: grab;
  }
}
.repeater-add-line {
  border-top: none;
}
</style>

<script>
import draggable from "vuedraggable";

/**
 * This component is made to manage a list of object that can be added/removed/reordered with a simple form.
 */
export default {
  name: "Repeater",
  components: {
    // For recursive dynamic components is better to resolve dependency tree at runtime :P   
    DetailField: () => import('@mapomodule/uikit/components/Detail/DetailField.vue'),
    draggable,
  },
  data() {
    return {
      items: null,
    };
  },
  props: {
    // V-model of the array needed to edit the objects in realtime.
    value: {
      type: Array,
      default: () => [],
    },
    // The main configuration that determines the arrangement of the fields in each line.
    fields: {
      // [`Array<FieldConfiguration>`](/components/Detail/Detail/#fieldconfiguration)
      type: Array,
      default: () => [],
    },
    // Puts the input in an error state and passes through custom error messages.
    errorMessages: {
      type: Array,
      default: () => [],
    },
    // Sets input label.
    label: String,
    // Makes all the repeater items readonly.
    readonly: Boolean,
    // Makes the repeater field sortable.
    sortable: Boolean,
    // This callback is called during sort/add/remove item if the Repeater is sortable. Use this callback to change some prop of the items in the list.
    sortCallback: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    value(val) {
      this.items = val;
    },
    items(val) {
      this.$emit("input", val);
    },
  },
  methods: {
    addItem(index) {
      const element = {};
      const newIndex = typeof index == "number" ? index : this.items.length;
      this.items.splice(newIndex, 0, element);
      this.sortable &&
        this.sortCallback({
          moved: { element, newIndex },
          items: this.items,
          eventType: "add",
        });
    },
    removeItem(index) {
      const element = this.items[index];
      this.items.splice(index, 1);
      this.sortable &&
        this.sortCallback({
          moved: { element, oldIndex: index },
          items: this.items,
          eventType: "remove",
        });
    },
    getErrors(index) {
      return (this.errorMessages || [])[index] || {};
    },
    parseConf(field, i) {
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value || "";
      conf.slotName = `fields.${conf.value || i}`;
      if (this.readonly) {
        conf.attrs = { ...conf.attrs, readonly: true };
      }
      return conf;
    },
    mapConf(fields) {
      const icon = "mdi-cube-outline";
      const parseGroup = (group) =>
        typeof group === "string"
          ? { name: group, icon }
          : { ...group, icon: group.icon !== undefined ? group.icon : icon };
      return fields.map((f, i) =>
        f.group
          ? { group: parseGroup(f.group), fields: this.mapConf(f.fields) }
          : this.parseConf(f, i)
      );
    },
  },
  computed: {
    parsedFields() {
      return this.mapConf(this.fields);
    },
  },
  mounted() {
    this.items = this.value;
  },
};
</script>