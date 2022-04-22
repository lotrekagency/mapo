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
              v-for="(field, i) in parseFields(model)"
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
    <v-dialog v-if="hasTemplates" v-model="tModalOpen" width="600" scrollable>
      <v-card>
        <v-card-title class="text-h5"> Select template </v-card-title>
        <v-card-text>
          <div class="row mt-4">
            <div
              v-for="(template, i) in templates"
              :key="i"
              class="col-12 col-md-6 pa-0"
            >
              <div @click="tModalCallback(template)" class="template-button">
                <span class="text-h5">{{ template.name }}</span
                ><br />
                <span>{{ template.description }}</span>
                <v-img
                  v-if="template.preview"
                  max-height="150"
                  min-width="250px"
                  :src="template.preview"
                />
                <v-skeleton-loader
                  v-else
                  boilerplate
                  min-width="250px"
                  type="list-item-avatar-three-line"
                />
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
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
.template-button {
  padding: 0.5rem;
  margin: 3px;
  border: solid 1px #393939;
  cursor: pointer;
}
.theme--light .template-button {
  border-color: #e0e0e0;
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
    DetailField: () => import("@mapomodule/uikit/components/Detail/DetailField.vue"),
    draggable,
  },
  data() {
    return {
      items: null,
      tModalOpen: false,
      tModalCallback: () => {},
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
      type: Array | Object,
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
    // Make the repeater multilanguage. This means that it's going to inherit the languages and the current language from the parent detail component, creating the translations for each line of the repeater.
    multilang: Boolean,
    // This callback is called during sort/add/remove item if the Repeater is sortable. Use this callback to change some prop of the items in the list.
    sortCallback: {
      type: Function,
      default: () => {},
    },
    langs: {
      type: Array,
      default: () => [],
    },
    currentLang: String,
  },
  watch: {
    value(val) {
      this.items = val;
    },
    items(val) {
      this.$emit("input", val);
    },
    tModalOpen(val) {
      !val && this.tModalCallback();
    },
  },
  methods: {
    async addItem(index) {
      const element = {};
      if (this.hasTemplates) {
        const template = await this.chooseTemplate();
        if (!template) return;
        element[template.tCodeField] = template.tCode;
      }
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
    async chooseTemplate() {
      this.tModalOpen = true;
      return new Promise((resolve) => {
        this.tModalCallback = function (template) {
          resolve(template);
          this.tModalCallback = () => {};
          this.tModalOpen = false;
        };
      });
    },
    getErrors(index) {
      return (this.errorMessages || [])[index] || {};
    },
    parseConf(field, i) {
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value || "";
      conf.value = this.multilang ? conf.value.replace(new RegExp(`^translations\.(${this.langs.join("|")})\.?`), "") : conf.value;
      conf.slotName = `fields.${conf.value || i}`;
      if (this.multilang && this.currentLang && !field.synci18n) {
        const base = `translations.${this.currentLang}`;
        conf.value = (conf.value && `${base}.${conf.value}`) || base;
      }
      if (this.readonly) {
        conf.attrs = { ...conf.attrs, readonly: true };
      }
      return conf;
    },
    mapConf(fields) {
      fields = JSON.parse(JSON.stringify(fields)); // this hack fixes rendering loop on multilang scenario. :/
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
    parseFields(model) {
      if (this.hasTemplates) {
        const template = this.templates.find(t => model[t.tCodeField] == t.tCode)
        return template ? this.mapConf(template.fields) : [];
      }
      return this.mapConf(this.fields);
    },
  },
  computed: {
    hasTemplates() {
      return typeof this.fields == "object" && !Array.isArray(this.fields);
    },
    templates() {
      const templates = {};
      if (this.hasTemplates) {
        const titleCase = (string) => (string && string[0].toUpperCase() + string.slice(1).toLowerCase()) || "";
        Object.keys(this.fields).forEach((tKey) => {
          const tValue = this.fields[tKey];
          const { preview, description } = tValue;
          templates[tKey] = {
            fields: tValue.fields || tValue,
            name: tValue.name || titleCase(tKey.replace(/_/, " ")),
            tCode: tValue.tCode || tKey,
            tCodeField: tValue.tCodeField || "tCode",
            preview, description,
          };
        });
      }
      return Object.values(templates);
    },
  },
  mounted() {
    this.items = this.value;
  },
};
</script>