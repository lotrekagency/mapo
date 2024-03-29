<template>
  <div class="mapo-detail--wrapper">
    <div class="mapo-detail--loader" v-if="loading">
      <v-progress-linear color="primary" indeterminate absolute></v-progress-linear>
      <span class="detail-component-loading">
        <v-icon size="30">mdi-timer-sand</v-icon>
        {{ $t("mapo.fetchingData") }}
      </span>
    </div>
    <div class="mapo-detail--loaded" v-else>
      <!-- Use this to override the title of the detail component. -->
      <slot name="title" v-bind="slotBindings">
        <!-- `<h1> "Create | Edit" + modelName </h1>` -->
        <h1 class="mapo-detail--title">
          {{ isNew ? $t("mapo.create") : $t("mapo.edit") }} {{ modelName }}
        </h1>
      </slot>
      <v-form class="mapo-detail--form" ref="form">
        <v-row>
          <v-col class="mapo-detail--main" cols="12" :md="12 - sidenavCol">
            <!-- Use this to add content at the top of the central layout. -->
            <slot name="body.top" v-bind="slotBindings"></slot>
            <!-- Use this to override the Language Switch panel. -->
            <slot name="body.lang" v-bind="slotBindings">
              <!-- [`DetailLangSwitch`](/components/detail/DetailLangSwitch/)  -->
              <DetailLangSwitch
                v-if="langs && langs.length"
                v-show="langs.length > 1"
                class="mapo-detail--language-tabs"
                v-model="currentLang"
                :langs="langs"
                :errors="errors"
            /></slot>
            <!-- Use this to add content under the Language Switch panel. -->
            <slot name="body.top.underlang" v-bind="slotBindings"></slot>
            <!-- Use this to override the content of the main body. -->
            <slot name="body" v-bind="slotBindings">
              <Form
                v-model="model"
                :currentLang="currentLang"
                :languages="langs"
                :errors="errors"
                :fields="mainFields"
                :moreSlotBindings="slotBindings"
                :readonly="isReadonly"
              >
                <template v-for="(_, slot) in $slots" :slot="slot">
                  <!-- @vuese-ignore -->
                  <slot :name="slot"></slot>
                </template>
                <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
                  <!-- @vuese-ignore -->
                  <slot :name="slot" v-bind="props" />
                </template>
              </Form>
            </slot>
            <!-- Use this to add content under the main body. -->
            <slot name="body.bottom" v-bind="slotBindings"></slot>
          </v-col>
          <v-col class="mapo-detail--sidenav" cols="12" :md="sidenavCol">
            <div class="mapo-detail--sidenav-col" :style="stickySide">
              <!-- Use this to add content on the top of the sidebar button panel. -->
              <slot name="side.buttons.top" v-bind="slotBindings"></slot>
              <!-- Use this to override the the sidebar button panel. -->
              <slot name="side.buttons" v-bind="slotBindings">
                <!-- Save, Save and continue, Back, and Delete buttons. -->
                <div class="mapo-detail--buttons">
                  <!-- Use this to override the Save button. -->
                  <slot name="button.save" v-bind="slotBindings">
                    <!-- The Save button. -->
                    <v-btn
                      v-show="canGoBack"
                      :loading="buttonClicked == 'saveAndBackBtn'"
                      :disabled="isReadonly"
                      tile
                      block
                      @click="saveItem(true)"
                      >{{ isNew ? $t("mapo.create") : $t("mapo.save") }}</v-btn
                    >
                  </slot>
                  <!-- Use this to override the Save and continue button. -->
                  <slot name="button.savecontinue" v-bind="slotBindings">
                    <!-- The Save and continue button. -->
                    <v-btn
                      :loading="buttonClicked == 'saveBtn'"
                      :disabled="isReadonly"
                      tile
                      block
                      @click="saveItem(false)"
                      >{{
                        isNew ? $t("mapo.createContinue") : $t("mapo.saveContinue")
                      }}</v-btn
                    >
                  </slot>
                  <!-- Use this to override the Back button. -->
                  <slot name="button.back" v-bind="slotBindings">
                    <!-- The Back button. -->
                    <v-btn v-show="canGoBack" tile block @click="back">{{
                      $t("mapo.back")
                    }}</v-btn>
                  </slot>
                  <!-- Use this to override the Delete button. -->
                  <slot
                    name="button.delete"
                    :loading="buttonClicked == 'deleteBtn'"
                    v-bind="slotBindings"
                  >
                    <!-- The Delete button. -->
                    <v-btn
                      v-if="!isNew"
                      color="error"
                      tile
                      block
                      :disabled="!canDelete"
                      @click="deleteItem"
                      >{{ $t("mapo.delete") }}</v-btn
                    >
                  </slot>
                   <!-- Use this to override the Preview Page button. -->
                   <slot name="button.preview" v-bind="slotBindings">
                    <!-- The Preview Page button. Needs a preview field from model. Declare it in the props. -->
                    <PagePreview
                      v-if="previewUrl"
                      :pageUrl="previewUrl"
                    />                    
                  </slot>
                </div>
              </slot>
              <!-- Use this to add content on the top of the sidebar fields (or under sidebar buttons). -->
              <slot name="side.top" v-bind="slotBindings"></slot>
              <Form
                v-model="model"
                :currentLang="currentLang"
                :languages="langs"
                :errors="errors"
                :fields="sideFields"
                :moreSlotBindings="slotBindings"
                :readonly="isReadonly"
              >
                <template v-for="(_, slot) in $slots" :slot="slot">
                  <!-- @vuese-ignore -->
                  <slot :name="slot"></slot>
                </template>
                <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
                  <!-- @vuese-ignore -->
                  <slot :name="slot" v-bind="props" />
                </template>
              </Form>
              <!-- 	Use this to add content under the sidebar fields. -->
              <slot name="side.bottom" v-bind="slotBindings"></slot>
            </div>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.mapo-detail--loader {
  .v-progress-linear {
    top: 0;
  }
  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
.mapo-detail--title {
  margin-bottom: 20px;
  font-weight: normal;
}
.mapo-detail--language-tabs {
  margin-bottom: 20px;
}
.mapo-detail--sidenav-col {
  display: flex;
  flex-direction: column;
}
.mapo-detail--buttons {
  margin-top: 16px;
  margin-bottom: 0px;
  order: 1;
  @media (min-width: 960px) {
    margin-bottom: 16px;
    margin-top: 0px;
    order: 0;
  }
  .v-btn {
    margin-bottom: 8px;
  }
}
</style>

<script>
import { diffObjs, deepClone } from "@mapomodule/utils/helpers/objHelpers";

/**
 * The purpose of this component is to provide you with a very quick way to create an edit page for a payload to send to the server.
 * A use case example could be "build a page that allows you to change the specifications of a product for an ecommerce".<br> <h4>Index:</h4> [[toc]]
 */
export default {
  name: "Detail",
  data() {
    return {
      model: {},
      modelLanguages: [],
      currentLang: this.lang,
      errors: null,
      buttonClicked: null,
    };
  },
  props: {
    // V-model of the object we are editing.
    value: {
      type: Object,
      required: false,
    },
    // Set the current lang to value.
    lang: {
      type: String,
      required: false,
    },
    // The main configuration that determines the arrangement of the fields in the detail layout.
    fields: {
      // [`DetailConfiguration`](#detailconfiguration)
      type: Object | Array,
      required: true,
    },
    usePatch: {
      type: Boolean,
      default() {
        return this.$mapo.$options?.content?.usePatch || false;
      },
    },
    // A list of languages into which the payload needs to be translated.
    languages: {
      type: Array,
      default() {
        return this.$mapo.$options?.content?.languages || [];
      },
    },
    // Forces use of languages passed as prop, instead of those loaded with model
    forceLanguages: {
      type: Boolean,
      default() {
        return this.$mapo.$options?.content?.forceLanguages || false;
      },
    },
    // The url of the endpoint to which the payload is to be sent. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.
    endpoint: {
      type: String,
      default: null,
    },
    // This determines the width of the sidebar in desktop view in a 12 col grid.
    sidenavCol: {
      type: Number | String,
      default: "4",
      validator: function (value) {
        // The value must be a number between 0 and 12
        return [...Array(12).keys()].indexOf(+value) !== -1;
      },
    },
    // The identifier of the object you need to retrieve and edit. It can be "new" if you need to create a new payload.
    identifier: {
      // `String|Number`.
      type: String | Number,
      default: "new",
    },
    // The title of the detail page.
    modelName: String,
    // This determines the style of the sidebar. If set to true the sidebar will remain sticky during the scroll.
    sticky: {
      type: Boolean,
      default: true,
    },
    // Set the multipart politic. Accepts `'auto'|'force|'disable'`. If auto is set the request is transformed in multipart if any file is in the payload. If set to force the request is transformed in multipart no matter if files are found. If set to `'disable'` the request is never transformed in multipart.
    multipart: {
      type: String,
      default: "auto",
      validator: function (value) {
        // The value must match one of these strings
        return ["auto", "force", "disable"].indexOf(value) !== -1;
      },
    },
    // The name of the field that contains the url of the page preview. [optional]
    previewField: {
      type: String,
      required: false,
    },
    // This forces the detail page to be readonly.
    readonly: Boolean
  },
  methods: {
    back() {
      this.$nuxt.context?.from?.name == "login"
        ? this.$router.go(-3)
        : this.$router.back();
    },
    saveItem(back = false) {
      this.buttonClicked = back ? "saveAndBackBtn" : "saveBtn";
      this.errors = null;
      this.$refs.form?.resetValidation();
      this.apiSendPayload()
        .then((resp) => {
          Object.assign(this.model, resp);
          this.modelBkp = deepClone(this.model);
          this.$mapo.$snack.open({
            message: this.isNew
              ? this.$t("mapo.createSuccess")
              : this.$t("mapo.saveSuccess"),
            color: "success",
          });
          this.isNew && this.$router.replace({ params: { detail: resp.id } });
          back && this.back();
        })
        .catch((error) => {
          this.errors = (error.response.status == 400 && error.response.data) || null;
          this.$mapo.$snack.open({
            message: error.response?.data?.detail || this.$t("mapo.genericError"),
            color: "error",
          });
        })
        .finally(() => {
          this.buttonClicked = null;
        });
    },
    deleteItem() {
      this.$mapo.$confirm
        .open({
          title: this.$t("mapo.delete"),
          question: this.$t("mapo.confirmDelete"),
          approveButton: {
            text: this.$t("mapo.delete"),
            attrs: { color: "red", text: true },
          },
        })
        .then((res) => {
          if (res) {
            this.buttonClicked = "deleteBtn";
            this.crud
              .delete(this.identifier)
              .then(() => {
                this.unsetRouterGuard();
                this.back();
              })
              .catch((error) =>
                this.$mapo.$snack.open({
                  message: error.response?.data?.detail || this.$t("mapo.genericError"),
                  color: "error",
                })
              )
              .finally(() => {
                this.buttonClicked = null;
              });
          }
        });
    },
    async checkUnsavedHook(to, from, next) {
      if (to.name !== from.name && this.hasDiff) {
        this.$mapo.$confirm
          .open({
            title: this.$t("mapo.unsavedData"),
            question: this.$t("mapo.confirmLeaveChanges"),
            approveButton: { text: this.$t("mapo.confirm"), attrs: { text: true } },
          })
          .then(next);
      } else {
        next();
      }
    },
    setRouterGuard() {
      this.$router.beforeHooks.push(this.checkUnsavedHook);
      window?.addEventListener("beforeunload", this.preventWindowClose);
    },
    preventWindowClose(event) {
      const text = this.$t("mapo.confirmLeaveChanges");
      if (this.hasDiff) {
        event.returnValue = text;
        return text;
      }
    },
    unsetRouterGuard() {
      window?.removeEventListener("beforeunload", this.preventWindowClose);
      this.$router.beforeHooks = this.$router.beforeHooks.filter(
        (f) => f != this.checkUnsavedHook
      );
    },
  },
  watch: {
    currentLang(val) {
      // Fired when the current language changes.
      // @arg Emits the language name as a string.
      this.$emit("update:lang", val);
    },
    model(val) {
      // Fired when the v-model changes.
      // @arg Emits the entire payload modified.
      this.$emit("input", val);
    },
    lang(val) {
      if (val && this.langs.includes(val)) {
        this.currentLang = val;
      }
    },
    value(val) {
      if (val) {
        this.model = val;
      }
    },
  },
  computed: {
    canGoBack() {
      if (typeof window !== "undefined") {
        return (
          (this.$nuxt?.context?.from?.name !== "login" && window.history.length > 1) ||
          window.history.length > 3
        );
      }
      return true;
    },
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
    apiSendPayload() {
      let method, args;
      if (!this.model.id) {
        method = this.crud.create;
        args = [this.model, {}, { multipart: this.multipart }];
      } else if (this.usePatch) {
        method = this.crud.partialUpdate;
        args = [this.model.id, this.modelDiff, {}, { multipart: this.multipart }];
      } else {
        method = this.crud.update;
        args = [this.model.id, this.model, {}, { multipart: this.multipart }];
      }
      return async () => method(...args);
    },
    isReadonly() {
      if (this.readonly) return this.readonly;
      if (this.$mapo.$auth.routeMiddlewares.includes("permissions")) {
        return !this.$mapo.$auth.user.permissions.includes(this.isNew ? "add" : "change");
      }
      return !!this.buttonClicked;
    },
    canDelete() {
      if (this.readonly) return false;
      if (this.$mapo.$auth.routeMiddlewares.includes("permissions")) {
        return this.$mapo.$auth.user.permissions.includes("delete");
      }
      return true;
    },
    mainFields() {
      return this.fields instanceof Array ? this.fields : this.fields.main || [];
    },
    sideFields() {
      return (this.fields instanceof Object && this.fields.sidenav) || [];
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
      return !this.forceLanguages && (this.modelLanguages || []).length
        ? this.modelLanguages
        : this.languages;
    },
    slotBindings() {
      return {
        model: this.model,
        errors: this.errors,
        currentLang: this.currentLang,
        crud: this.crud,
        isNew: this.isNew,
        langs: this.langs,
        loading: this.loading,
        form: this.$refs.form,
        saveItem: this.saveItem,
        deleteItem: this.deleteItem,
      };
    },
    stickySide() {
      return this.sticky
        ? {
            position: "sticky",
            top: "60px",
          }
        : {};
    },
    modelDiff() {
      return diffObjs(this.modelBkp, this.model) || {};
    },
    hasDiff() {
      return !!(this.modelDiff && Object.keys(this.modelDiff).length > 0);
    },
    previewUrl() {
      return this.previewField ? this.model[this.previewField] : null;
    },
  },
  async mounted() {
    if (this.identifier && this.identifier !== "new") {
      try {
        this.model = await this.crud.detail(this.identifier);
        this.modelLanguages = this.model?.lang_info?.site_languages.map((l) => l.id);
      } catch (error) {
        this.$nuxt.error({
          statusCode: error.response.status,
          message: error.response.data?.detail || this.$t("mapo.genericError"),
        });
      }
    } else if (this.value) {
      this.model = this.value;
      this.modelLanguages = this.model?.lang_info?.site_languages.map((l) => l.id);
    }
    this.modelBkp = deepClone(this.model);
    this.setRouterGuard();
  },
  destroyed() {
    this.unsetRouterGuard();
  },
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
 - `date` ==> [date-field](/components/Form/fields/DateField/),
 - `textarea` ==> [v-textarea](https://vuetifyjs.com/en/components/textareas/),
 - `switch` ==> [v-switch](https://vuetifyjs.com/en/components/switches/),
 - `slider` ==> [v-slider](https://vuetifyjs.com/en/components/sliders/),
 - `file` ==> [file-field](/components/Form/fields/FileField/),
 - `editor` ==> [wyg-editor](/components/Form/fields/wygEditor/wygEditor/),
 - `media` ==> [media-field](/components/Form/fields/MediaField/),
 - `enhancedMedia` ==> [enhanced-media-field](/components/Form/fields/EnhancedMediaField/),
 - `mediaList` ==> [media-m2m-field](/components/Form/fields/MediaM2mField/)
 - `m2m` or `fks` ==> [fks-field](/components/Form/fields/FksField/),
 - `repeater` ==> [repeater](/components/Form/fields/Repeater/),


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
    <div class="d-flex justify-end"><ThemeToggle/></div>
    <Detail
      endpoint="api/articles"
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
        { value: "sections", type: "repeater", attrs: {
          sortable: true,
          fields: [
            { value: "title", class: "col-md-6" },
            { value: "subtitle", class: "col-md-6" },
            { value: "content", type: "textarea" },
          ]}
        },
        {
          group: "Seo",
          fields: [
            "title",
            { value: "description", type: "textarea" },
            "permalink",
            { type: "seoPreview" }
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
