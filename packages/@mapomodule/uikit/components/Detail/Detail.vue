<template>
  <v-container>
    <!-- Use this to override the title of the detail component. -->
    <slot name="title" v-bind="slotBindings">
      <!-- `<h1> "Create | Edit" + modelName </h1>` -->
      <v-row class="mb-14">
        <h1>{{ isNew ? "Create" : "Edit" }} {{ modelName }}</h1>
      </v-row>
    </slot>
    <v-form ref="form">
      <v-row>
        <v-col cols="12" md="8">
          <!-- Use this to add content at the top of the central layout. -->
          <slot name="body.top" v-bind="slotBindings"></slot>
          <!-- Use this to override the Language Switch panel. -->
          <slot name="body.lang" v-bind="slotBindings">
            <!-- [`DetailLangSwitch`](/components/detail/DetailLangSwitch/)  -->
            <DetailLangSwitch
              v-if="langs && langs.length"
              class="mb-4"
              v-model="currentLang"
              :langs="langs"
              :errors="errors"
          /></slot>
          <!-- Use this to add content under the Language Switch panel. -->
          <slot name="body.top.underlang" v-bind="slotBindings"></slot>
          <!-- Use this to override the content of the main body. -->
          <slot name="body" v-bind="slotBindings">
            <!-- The result of the [`DetailConfiguration`](#detailconfiguration) contained in the main body. -->
            <div v-for="(field, index) in mainFields" :key="index">
              <v-card v-if="field.group" class="my-2">
                <v-card-title>
                  <v-icon left> {{ field.group.icon }} </v-icon>
                  <span>{{ field.group.name }}</span>
                </v-card-title>
                <v-card-text>
                  <div
                    v-for="(fields, fieldsI) in field.fields"
                    :key="fieldsI"
                    class="mb-4"
                  >
                    <!-- This is a dynamic slot. You can use it to override a field component. For example use `fields.title` to override the component of the field with value `title`. -->
                    <slot
                      :name="fields.slotName"
                      v-bind="{
                        conf: fields,
                        ...slotBindings,
                      }"
                    >
                      <!-- A [`DetailField`](/components/detail/DetailField/) configured by a [`FieldConfiguration`](#fieldconfiguration). -->
                      <DetailField
                        v-model="model"
                        :conf="fields"
                        :errors="errors"
                      />
                    </slot>
                  </div>
                </v-card-text>
              </v-card>
              <slot
                v-else
                :name="field.slotName"
                v-bind="{
                  conf: field,
                  ...slotBindings,
                }"
              >
                <DetailField v-model="model" :conf="field" :errors="errors" />
              </slot>
            </div>
          </slot>
          <!-- Use this to add content under the main body. -->
          <slot name="body.bottom" v-bind="slotBindings"></slot>
        </v-col>
        <v-col cols="12" md="4">
          <div class="d-flex flex-column" :style="stickySide">
            <!-- Use this to add content on the top of the sidebar button panel. -->
            <slot name="side.buttons.top" v-bind="slotBindings"></slot>
            <!-- Use this to override the the sidebar button panel. -->
            <slot name="side.buttons" v-bind="slotBindings">
              <!-- Save, Save and continue, Back, and Delete buttons. -->
              <div class="mt-4 mt-md-0 mb-md-4 mb-0 order-1 order-md-0">
                <!-- Use this to override the Save button. -->
                <slot name="button.save" v-bind="slotBindings">
                  <!-- The Save button. -->
                  <v-btn class="mb-2" tile block @click="saveItem(true)">{{
                    isNew ? "Create" : "Save"
                  }}</v-btn>
                </slot>
                <!-- Use this to override the Save and continue button. -->
                <slot name="button.savecontinue" v-bind="slotBindings">
                  <!-- The Save and continue button. -->
                  <v-btn class="mb-2" tile block @click="saveItem(false)"
                    >{{ isNew ? "Create" : "Save" }} and continue</v-btn
                  >
                </slot>
                <!-- Use this to override the Back button. -->
                <slot name="button.back" v-bind="slotBindings">
                  <!-- The Back button. -->
                  <v-btn class="mb-2" tile block @click="$router.back()"
                    >Back</v-btn
                  >
                </slot>
                <!-- Use this to override the Delete button. -->
                <slot name="button.delete" v-bind="slotBindings">
                  <!-- The Delete button. -->
                  <v-btn
                    v-if="!isNew"
                    class="mb-2"
                    color="error"
                    tile
                    block
                    @click="deleteItem"
                    >Delete</v-btn
                  >
                </slot>
              </div>
            </slot>
            <!-- Use this to add content on the top of the sidebar fields (or under sidebar buttons). -->
            <slot name="side.top" v-bind="slotBindings"></slot>
            <div v-for="(field, index) in sideFields" :key="index">
              <v-card v-if="field.group" class="mb-4">
                <v-card-title>
                  <v-icon left> {{ field.group.icon }} </v-icon>
                  <span>{{ field.group.name }}</span>
                </v-card-title>
                <v-card-text>
                  <div
                    v-for="(fields, fieldsI) in field.fields"
                    :key="fieldsI"
                    class="mb-4"
                  >
                    <!-- @vuese-ignore -->
                    <slot
                      :name="fields.slotName"
                      v-bind="{
                        conf: fields,
                        ...slotBindings,
                      }"
                    >
                      <DetailField
                        v-model="model"
                        :conf="fields"
                        :errors="errors"
                      />
                    </slot>
                  </div>
                </v-card-text>
              </v-card>
              <slot
                v-else
                :name="field.slotName"
                v-bind="{
                  conf: field,
                  ...slotBindings,
                }"
              >
                <DetailField v-model="model" :conf="field" :errors="errors" />
              </slot>
            </div>
            <!-- 	Use this to add content under the sidebar fields. -->
            <slot name="side.bottom" v-bind="slotBindings"></slot>
          </div>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>


<script>
/**
 * The purpose of this component is to provide you with a very quick way to create an edit page for a payload to send to the server.
 * A use case example could be "build a page that allows you to change the specifications of a product for an ecommerce".<br> <h4>Index:</h4> [[toc]]
 */
export default {
  name: "Detail",
  data() {
    return {
      model: {},
      currentLang: null,
      errors: null
    };
  },
  props: {
    // The main configuration that determines the arrangement of the fields in the detail layout.
    fields: {
      // [`DetailConfiguration`](#detailconfiguration)
      type: Object | Array,
      required: true
    },
    // A list of languages into which the payload needs to be translated.
    languages: {
      type: Array,
      default: () => []
    },
    // The url of the endpoint to which the payload is to be sent. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.
    endpoint: String,
    // The identifier of the object you need to retrieve and edit. It can be "new" if you need to create a new payload.
    identifier: {
      // `String|Number`.
      type: String | Number,
      default: "new"
    },
    // The title of the detail page.
    modelName: String,
    // This determines the style of the sidebar. If set to true the sidebar will remain sticky during the scroll.
    sticky: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    saveItem(back = false) {
      this.errors = null;
      this.$refs.form?.resetValidation();
      this.crud
        .updateOrCreate(this.model)
        .then(() => back && this.$router.back())
        .catch(error => {
          this.errors =
            (error.response.status == 400 && error.response.data) || null;
          this.$mapo.$snack.open({
            message: "Something whent bad, please try again later...",
            color: "error"
          });
        });
    },
    deleteItem() {
      this.$mapo.$confirm
        .open({
          title: "Delete",
          question: "Are you sure you want to delete this item?",
          approveButton: { text: "Delete", attrs: { color: "red" } }
        })
        .then(res => {
          if (res) {
            this.crud
              .delete(this.identifier)
              .then(() => this.$router.back())
              .catch(error =>
                this.$mapo.$snack.open({
                  message: "Something whent bad, please try again later...",
                  color: "error"
                })
              );
          }
        });
    },
    parseConf(field) {
      const conf = typeof field === "string" ? { value: field } : field;
      conf.value = conf.value.replace(/^translations\..*\./, "");
      conf.slotName = `fields.${conf.value}`;
      if (this.currentLang && !field.synci18n) {
        conf.value = `translations.${this.currentLang}.${conf.value}`;
      }
      return conf;
    },
    mapConf(fields) {
      const icon = "mdi-cube-outline";
      const parseGroup = group =>
        typeof group === "string"
          ? { name: group, icon }
          : { ...group, icon: group.icon || icon };
      return fields.map(f =>
        f.group
          ? { group: parseGroup(f.group), fields: this.mapConf(f.fields) }
          : this.parseConf(f)
      );
    }
  },
  watch: {
    currentLang(val) {
      if (val && !this.model.translations) {
        this.model.translations = {};
      }
      if (val && !this.model.translations[val]) {
        this.model.translations[val] = {};
      }
    }
  },
  computed: {
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
    mainFields() {
      return this.mapConf(
        this.fields instanceof Array ? this.fields : this.fields.main || []
      );
    },
    sideFields() {
      return this.mapConf(
        (this.fields instanceof Object && this.fields.sidenav) || []
      );
    },
    isNew() {
      return this.identifier && this.identifier == "new";
    },
    loading() {
      if (this.identifier === "new") {
        return false;
      }
      return !Object.keys(this.model).length;
    },
    langs() {
      return (
        this.model?.active_languages?.languages.map(l => l.id) || this.languages
      );
    },
    slotBindings() {
      return {
        model: this.model,
        currentLang: this.currentLang,
        crud: this.crud,
        isNew: this.isNew,
        langs: this.langs,
        loading: this.loading,
        form: this.$refs.form,
        saveItem: this.saveItem,
        deleteItem: this.deleteItem
      };
    },
    stickySide() {
      return this.sticky
        ? {
            position: "sticky",
            top: "60px"
          }
        : {};
    }
  },
  mounted() {
    if (this.identifier && this.identifier !== "new") {
      this.crud.detail(this.identifier).then(res => (this.model = res));
    }
  }
};
</script>

<docs>

## DetailConfiguration

The DetailConfiguration determines the behavior of the main form and is an `Array` of [`FieldConfiguration`](#fieldconfiguration). 
Each field configuration represents a field of the form.
The configuration can also consist of an object with two keys `{ main sidenav }`.
Each key is an `Array` of [`FieldConfiguration`](#fieldconfiguration) and will modify a different part of the component:
 - The main body
 - The sidebar


### FieldConfiguration

The `FieldConfiguration` is a `String` containing the dottedPath of a value inside the payload we want to modify.  
So, for example, if we have the payload: `{ image: { name: "...", url: "..." } }` we can modify the image name using the dottedPath `"image.name"`.

The default component used to render a field of a form is a [`v-text-field`](https://vuetifyjs.com/en/components/text-fields/).
If you want more control over the generated component you can use an `Object` with this attributes:

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|The dottedPath of the value we want to modify.|`String`|`true`|-| 
|synci18n|Determines if the field is translatable or not. If set to true the value will remain the same in all translations (untranslatable).|`Boolean`|`false`|`false`| 
|type|Type of the field. This determines which component will be rendered. The list of possible choices can be found [here](#field-types) |`String`|`false`|`text`| 
|accessor|[`Accessor`](#accessor) object to specify the setter and the getter of the field.|`Object`|`false`|`{set: x=>x, get: x=>x}`| 
|attrs|The attributes that will be passed to the component.|`Object`|`false`|-| 
|is|The component to be rendered in the form. This has a higher priority than the "type" attribute. Here you can pass in any regitered Vue component instance or name. [Learn more](https://vuejs.org/v2/guide/components.html#Dynamic-Components).|`String | VueComponent`|`false`|-| 

#### Accessor

The accessor object contains two funcition `get` and `set`. Each function will be called with a ctx as argument. The ctx contains the val (value) and the model (the payload).
If you want to change the value as it is being processed by the component, you can set one or both of the accessors.
Each function must return the processed value.

#### Field types

Here the list of the FieldConfiguration type association. 

 - `text` ==> [v-text-field](https://vuetifyjs.com/en/components/text-fields/),
 - `select` ==> [v-select](https://vuetifyjs.com/en/components/selects/),
 - `date` ==> [date-field](/components/fields/DateField/),
 - `textarea` ==> [v-textarea](https://vuetifyjs.com/en/components/textareas/),
 - `switch` ==> [v-switch](https://vuetifyjs.com/en/components/switches/),
 - `slider` ==> [v-slider](https://vuetifyjs.com/en/components/sliders/),
 - `file` ==> [v-file-input](https://vuetifyjs.com/en/components/file-inputs/),
 - `editor` ==> [tiny-mce](/components/fields/TinyMce/TinyMce/),
 - `media` ==> [media-field](/components/fields/MediaField/),
 - `m2m` ==> [m2m-field](/components/fields/M2mField/),
 - `mediaList` ==> [media-m2m-field](/components/fields/MediaM2mField/)


#### Example of a [`FieldConfiguration`](#fieldconfiguration):

```js
{
  value: "pubblicationDate",
  accessor: {
    set: ({ val }) => val && new Date(val).toISOString()
  },
  type: "date",
  synci18n: true,
  attrs: { color: "purple" }
}
```

### FieldGroup

You can use this mixed with `FieldConfiguration` to group multiple fields in one card with a title and an icon.  
The `FieldGroup` has the key group that is a string repreenting the name of the group and the key fields that is an `Array` of [`FieldConfiguration`](#fieldconfiguration).  
The group key can also be an `Object`. In that case it contains the name and the icon for the group `{name: "...", icon: "..."}`. For a list of all available icons, visit the official [Material Design Icons](https://materialdesignicons.com/) page.

<br><br>

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::


::: demo
<template>
  <v-app>
    <Detail
      endpoint="api/camomilla/articles"
      identifier="new"
      :fields="fields"
      :languages="['it', 'en', 'de']"
      modelName="article"
    />
  </v-app>
</template>

<script>
export default {
  data: () => ({
    fields: {
      main: [
        { value: "identifier", synci18n: true },
        { value: "content", type: "editor" },
        {
          group: "Seo",
          fields: [
            "title",
            { value: "description", type: "textarea" },
            "permalink",
          ]
        }
      ],
      sidenav: [
        {
          group: "Status",
          fields: [
            { value: "trash", type: "switch", synci18n: true },
            {
              value: "status",
              type: "select",
              attrs: {
                items: [
                  { text: "Draft", value: "DRF" },
                  { text: "Published", value: "PUB" },
                  { text: "Trash", value: "TRS" }
                ]
              },
              synci18n: true
            },
            {
              value: "pubblication_date",
              accessor: {
                set: ({ val }) => val && new Date(val).toISOString()
              },
              type: "date",
              synci18n: true
            }
          ]
        },
        { value: "highlight_image", type: "media", synci18n: true }
      ]
    }
  })
};
</script>
:::



</docs>