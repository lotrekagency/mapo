<template>
  <div class="container pa-0">
    <div class="d-flex justify-space-between">
      <span class="repeater-label text--secondary">{{ label }}:</span>
      <v-btn v-if="collapsable" outlined tile text small @click="collapseAll">{{
        $t("mapo.collapse")
      }}</v-btn>
    </div>
    <draggable
      v-model="items"
      handle=".repeater-handle-sort"
      animation="150"
      @change="draggableReorder($event)"
      :style="maxHeightStyle"
    >
      <div
        class="repeater-line-wrapper"
        :class="{ expanded: !collapsable || isExpanded(index) }"
        v-for="(model, index) in items"
        :key="index"
      >
        <div class="d-flex">
          <div v-if="collapsable" class="collapsed-preview">
            <v-icon class="expand-icon" @click.native="toggleExpand(index)"
              >mdi-chevron-down</v-icon
            >
            <span
              class="v-label collapsed-label"
              @click="toggleExpand(index, true)"
              v-html="getCollapsedLabel(model, index)"
            ></span>
          </div>
          <div v-if="isExpanded(index)" class="repeater-fields">
            <v-container>
              <Form
                v-model="items[index]"
                :currentLang="translatable ? currentLang : null"
                :languages="langs"
                :fields="getFields(model)"
                :errors="getErrors(index)"
                :readonly="readonly"
                immediate
              >
                <template
                  v-for="(slot, name) in templateSlots(model, $slots)"
                  :slot="slot"
                >
                  <slot :name="name"></slot>
                </template>
                <template
                  v-for="(slot, name) in templateSlots(model, $scopedSlots)"
                  v-slot:[slot]="props"
                >
                  <slot :name="name" v-bind="props" />
                </template>
              </Form>
            </v-container>
          </div>
          <div class="repeater-side-bar grey lighten-2">
            <span class="repeater-counter grey--text text--darken-2 text-truncate">{{
              index + 1
            }}</span>
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
              <span>{{ $t("mapo.repeater.addHere") }}</span>
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
              <span>{{ $t("mapo.remove") }}</span>
            </v-tooltip>
            <v-icon
              v-if="!readonly && sortable"
              color="grey darken-3"
              class="repeater-action repeater-handle-sort"
              >mdi-drag-horizontal</v-icon
            >
          </div>
        </div>
      </div>
    </draggable>
    <v-divider />
    <div class="d-flex justify-end">
      <v-btn
        class="repeater-add-line"
        @click="addItem"
        :disabled="readonly"
        outlined
        tile
        text
      >
        <v-icon>mdi-plus</v-icon> {{ $t("mapo.add") }}</v-btn
      >
    </div>
    <v-dialog v-if="hasTemplates" v-model="tModalOpen" width="600" scrollable>
      <v-card>
        <v-card-title class="text-h5">{{
          $t("mapo.repeater.selectTemplate")
        }}</v-card-title>
        <v-card-text>
          <div class="row mt-4">
            <div v-for="(template, i) in templates" :key="i" class="col-12 col-md-6 pa-0">
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
.repeater-fields {
  display: none;
  overflow: hidden;
  width: 100%;
}
.expand-icon {
  cursor: pointer;
  transform: rotate(0deg);
  transition: transform 225ms cubic-bezier(0.4, 0, 0.2, 1);
}
.collapsed-preview {
  flex-basis: 100%;
  display: flex;
  align-items: flex-start;
}
.collapsed-label {
  cursor: pointer;
  flex-basis: 100%;
  margin: 15px;
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.theme--light .repeater-line-wrapper {
  border-color: rgba(0, 0, 0, 0.12);
}
.repeater-line-wrapper {
  border: 1px solid;
  border-bottom: none;
  border-color: rgba(255, 255, 255, 0.12);
  &:hover {
    .repeater-action {
      display: inline-flex;
    }
    .repeater-counter {
      display: none;
    }
  }
  &.expanded {
    > div > div > .expand-icon {
      transform: rotate(180deg);
    }
    > div > div > .collapsed-label {
      display: none;
    }
    > div > .repeater-fields {
      display: flex;
    }
    > div > .collapsed-preview {
      flex-basis: 0;
    }
  }
}
.repeater-side-bar {
  min-width: 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
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
    bottom: 0px;
    height: 15px;
    overflow: hidden;
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
import { getPointed, deepClone } from "@mapomodule/utils/helpers/objHelpers";
import { titleCase } from "@mapomodule/utils/helpers/formatters";
import { nameSpacedSlots } from "@mapomodule/utils/helpers/slots";

/**
 * This component is made to manage a list of object that can be added/removed/reordered with a simple form.
 */
export default {
  name: "Repeater",
  components: {
    // For recursive dynamic components is better to resolve dependencies at runtime to avoid circular deps
    Form: () => import("@mapomodule/uikit/components/Form/Form.vue"),
    draggable,
  },
  data() {
    return {
      items: this.value ? deepClone(this.value) : [],
      tModalOpen: false,
      tModalCallback: () => {},
      collapsedStack: (this.value || []).map(() => !!this.collapsable),
    };
  },
  props: {
    // V-model of the array needed to edit the objects in realtime.
    value: {
      type: Array,
      default: () => [],
    },
    // The main configuration that determines the arrangement of the fields in each line. It can be an array or an object. More info [here](#how-to-configure-the-repeater)
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
    // Makes the repeater field collapsable.
    collapsable: Boolean,
    // Make the repeater multilanguage. This means that it's going to inherit the languages and the current language from the parent detail component, creating the translations for each line of the repeater.
    translatable: Boolean,
    // This callback is called during sort/add/remove item if the Repeater is sortable. Use this callback to change some prop of the items in the list.
    sortCallback: {
      type: Function,
      default: () => {},
    },
    // With this you can define the output of the collapsed label. You can enter the pointed path of a value in the row or a callback function to extract the label from the row.
    collapsedLabel: {
      type: String | Function,
      default: null,
    },
    // This is mainly an internal property. It is used by DetailField to pass the list of languages inherited from the Detail component.
    langs: {
      // `Array<String>`
      type: Array,
      default() { return this.$mapo.$options?.content?.languages || []; },
    },
    // This is mainly an internal property. It is used by DetailField to pass the active language inherited from the Detail component.
    currentLang: String,
    maxHeight: String | Number,
  },
  watch: {
    value(val) {
      const isEmpty = (v) => !v || Object.keys(v).length == 0;
      if (isEmpty(val) && isEmpty(this.items) || JSON.stringify(val) === JSON.stringify(this.items)) return;
      this.items = (val && deepClone(val)) || [];
      if (val.length != this.collapsedStack.length)
        this.collapsedStack = (val || []).map(() => !!this.collapsable);
    },
    items: {
      handler(val) {
        this.$emit("input", deepClone(val));
      },
      deep: true
    },
    tModalOpen(val) {
      !val && this.tModalCallback();
    },
  },
  methods: {
    isExpanded(index) {
      return !this.collapsedStack[index];
    },
    async addItem(index) {
      const element = {};
      if (this.hasTemplates) {
        const template = await this.chooseTemplate();
        if (!template) return;
        element[template.tCodeField] = template.tCode;
      }
      const newIndex = typeof index == "number" ? index : this.items.length;
      this.items.splice(newIndex, 0, element);
      this.collapsedStack.splice(newIndex, 0, false);
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
      this.collapsedStack.splice(index, 1);
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
    getFields(model) {
      if (this.hasTemplates) {
        const template = this.templates.find((t) => model[t.tCodeField] == t.tCode);
        return template ? template.fields : [];
      }
      return this.fields;
    },
    templateSlots(model, slots) {
      if (this.hasTemplates) {
        const template = this.templates.find((t) => model[t.tCodeField] == t.tCode);
        return nameSpacedSlots(slots, `template.${template.tCode}.`).reduce(
          (acc, v) => ({ [`template.${template.tCode}.${v}`]: v, ...acc }),
          {}
        );
      }
      return Object.keys(slots).reduce((acc, v) => ({ [v]: v, ...acc }), {});
    },
    getCollapsedLabel(model, index) {
      const fallback = this.$t("mapo.repeater.item", { numberItem: index + 1 });
      switch (typeof this.collapsedLabel) {
        case "string":
          return getPointed(model, this.collapsedLabel, fallback);
        case "function":
          return this.collapsedLabel(model);
        default:
          const field = this.getFields(model).find(
            (f) => !f.type || f.type.lower() == "text"
          );
          return getPointed(model, field.value, fallback);
      }
    },
    draggableReorder(event) {
      const { newIndex, oldIndex } = event.moved;
      const stackItem = this.collapsedStack[oldIndex];
      this.collapsedStack.splice(oldIndex, 1);
      this.collapsedStack.splice(newIndex, 0, stackItem);
      this.sortCallback({ ...event, items: this.items, eventType: "move" });
    },
    toggleExpand(index, forceValue) {
      this.collapsedStack[index] =
        forceValue == undefined ? !this.collapsedStack[index] : !forceValue;
      this.collapsedStack = [...this.collapsedStack];
    },
    collapseAll() {
      this.collapsedStack = this.collapsedStack.map(() => true);
    },
  },
  computed: {
    hasTemplates() {
      return typeof this.fields == "object" && !Array.isArray(this.fields);
    },
    templates() {
      const templates = {};
      if (this.hasTemplates) {
        Object.keys(this.fields).forEach((tKey) => {
          const tValue = this.fields[tKey];
          const { preview, description } = tValue;
          templates[tKey] = {
            fields: tValue.fields || tValue,
            name: tValue.name || titleCase(tKey.replace(/_/, " ")),
            tCode: tValue.tCode || tKey,
            tCodeField: tValue.tCodeField || "tCode",
            preview,
            description,
          };
        });
      }
      return Object.values(templates);
    },
    maxHeightStyle() {
      if (this.maxHeight !== undefined) {
        const maxHeight = isNaN(this.maxHeight) ? this.maxHeight : `${this.maxHeight}px`;
        return { maxHeight, paddingTop: "15px", overflowX: "hidden", overflowY: "auto" };
      }
    },
  },
};
</script>

<docs>


## How to configure the repeater

In the Repeater the most important attr is the `fields` attr.
Through the `fields` attr you can configure your repeater. It accepts an array of [`FieldConfiguration`](/components/Detail/Detail/#fieldconfiguration) or an object.
In the case of the [`FieldConfiguration`](/components/Detail/Detail/#fieldconfiguration) array the result will be a **Simple Repeater**: each line will have the same fields as the previous one.
In case we use an object instead of the array we are configuring the Repeater to manage different templates.
A **Template Repeater** is a repeater that allows the user to choose a different template for each line.
Each key of the object represents a different template. Each value of these keys is an array of [`FieldConfiguration`](/components/Detail/Detail/#fieldconfiguration).
In this way we can define how many templates we want and leave the user the choice on the fields to be inserted for each line.
The keys of the "template" configuration can also be objects.
Using objects we can better specify some additional properties of the template.

#### The template configuration

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|name|The name of the template.|`String`|`false`|The key name of the template|
|description|The description of the template.|`String`|`false`|`null`|
|preview|The preview image of the template. It must be an image url.|`String`|`false`|A skeleton boilerplate placeholder|
|tCode|The identifier of the template.|`String`|`false`|The key name of the template|
|tCodeField|The key where the repeater saves the template identifier in the row|`String`|`false`|`tCode`|
|fields|The actual fields of the template.|[`Array<FieldConfiguration>`](/components/Detail/Detail/#fieldconfiguration)|`true`|-|


<br><br>

#### Example of a Simple Repeater configuration:
This is an example of the fields attr.
```js
[ // here we have only the list of fields
  { value: "sku", class: "col-md-6" },
  { value: "name", class: "col-md-6" },
]
```
#### Example of a Template Repeater configuration:
This is an example of the fields attr.
```js
{ // here we have the object that contains the templates
  template_1: [ // This template prvides only the list of fields. Other configurations will falback to defaults.
    { value: "title", class: "col-md-6" },
    { value: "subtitle", class: "col-md-6" },
  ],
  template_2: {
    name: "Custom template", // the name of the template. (by default it takes the key name `temlpate_2`)
    description: "custom description", // additional description.
    preview: "https://blog.openreplay.com/c4052718994cbc8eb6dac8c89c23ba06/img3.gif", // Custom preview image of the template.
    tCode: "titledatecontent", // this is the identifier of the template (by defaults it takes the key name `template_2`)
    tCodeField: "typology", // this is the key where the repeater saves the template type in the row. (by default `tCode`)
    fields: [ // the actual fields of the template.
      { value: "title", class: "col-md-6" },
      { value: "date", type: "date", class: "col-md-6" },
      { value: "content", type: "editor" },
    ],
  },
}
```

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::


::: demo
<template>
  <v-app>
    <div class="d-flex justify-end"><ThemeToggle/></div>
    <div>
      <h3>Simple Repeater:</h3>
      <Repeater v-model="data1" :fields="fields1" label="Contents" sortable />
      <h4>Contents:</h4>
      <pre style="background-color: unset">{{ data1 }}</pre>
    </div>
    <div>
      <h3>Repeater with templates:</h3>
      <Repeater v-model="data2" :fields="fields2" label="Contents" sortable />
      <h4>Contents:</h4>
      <pre style="background-color: unset">{{ data2 }}</pre>
    </div>
    <div>
      <h3>Translatable Repeater:</h3>
      <DetailLangSwitch class="mb-4" v-model="currentLanguage" :langs="languages"/>
      <Repeater v-model="data3" :fields="fields1" :langs="languages" :currentLang="currentLanguage" label="Contents" sortable translatable />
      <h4>Contents:</h4>
      <pre style="background-color: unset">{{ data3 }}</pre>
    </div>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      data1: [],
      data2: [],
      data3: [],
      fields1: [
        { value: "sku", class: "col-md-6" },
        { value: "name", class: "col-md-6" },
      ],
      fields2: {
        template_1: [
          { value: "title", class: "col-md-6" },
          { value: "subtitle", class: "col-md-6" },
        ],
        template_2: {
          name: "Custom template",
          description: "custom description",
          preview:
            "https://blog.openreplay.com/c4052718994cbc8eb6dac8c89c23ba06/img3.gif",
          fields: [
            { value: "title", class: "col-md-6" },
            { value: "date", type: "date", class: "col-md-6" },
            { value: "content", type: "editor" },
          ],
        },
      },
      languages: ['it', 'en'],
      currentLanguage: 'it'
    };
  },
};
</script>
:::



</docs>
