<template>
  <div class="container pa-0">
    <span class="repeater-label">{{ label }}:</span>
    <v-divider />
    <div class="repeater-wrapper" v-for="(model, index) in items" :key="index">
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
        </div>
      </div>
      <v-divider />
    </div>
    <div class="d-flex justify-end">
      <v-btn class="repeater-add-line" @click="addItem" outlined tile text>
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
}
.repeater-add-line {
  border-top: none;
}
</style>

<script>
/**
 * This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic field inside the main form.
 */
export default {
  name: "Repeater",
  data() {
    return {
      items: null,
    };
  },
  props: {
    // V-model of the payload needed to edit the field value in realtime.
    value: {
      type: Array,
      default: () => [],
    },
    errorMessages: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
    },
    fields: {
      type: Array,
      default: () => [],
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
      const obj = {};
      typeof index == "number"
        ? this.items.splice(index, 0, obj)
        : this.items.push(obj);
    },
    removeItem(index) {
      this.items.splice(index, 1);
    },
    getErrors(index) {
      return (this.errorMessages || [])[index] || {};
    },
    parseConf(field, i) {
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value || "";
      conf.slotName = `fields.${conf.value || i}`;
      if (this.isReadonly) {
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