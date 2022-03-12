# Detail

The purpose of this component is to provide you with a very quick way to create an edit page for a payload to send to the server. A use case example could be "build a page that allows you to change the specifications of a product for an ecommerce".<br> <h4>Index:</h4> [[toc]]

## Props

<!-- @vuese:Detail:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the object we are editing.|`Object`|`false`|-|
|lang|Set the current lang to value.|`String`|`false`|-|
|fields|The main configuration that determines the arrangement of the fields in the detail layout.|[`DetailConfiguration`](#detailconfiguration)|`true`|-|
|languages|A list of languages into which the payload needs to be translated.|`Array`|`false`|[]|
|endpoint|The url of the endpoint to which the payload is to be sent. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.|`String`|`false`|null|
|identifier|The identifier of the object you need to retrieve and edit. It can be "new" if you need to create a new payload.|`String|Number`.|`false`|new|
|modelName|The title of the detail page.|`String`|`false`|-|
|sticky|This determines the style of the sidebar. If set to true the sidebar will remain sticky during the scroll.|`Boolean`|`false`|true|
|multipart|Set the multipart politic. Accepts `'auto'|'force|'disable'`. If auto is set the request is transformed in multipart if any file is in the payload. If set to force the request is transformed in multipart no matter if files are found. If set to `'disable'` the request is never transformed in multipart.|`String`|`false`|auto|

<!-- @vuese:Detail:props:end -->


## Events

<!-- @vuese:Detail:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes.|Emits the entire payload modified.|

<!-- @vuese:Detail:events:end -->


## Slots

<!-- @vuese:Detail:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|title|Use this to override the title of the detail component.|`<h1> "Create | Edit" + modelName </h1>`|
|body.top|Use this to add content at the top of the central layout.|-|
|body.lang|Use this to override the Language Switch panel.|[`DetailLangSwitch`](/components/detail/DetailLangSwitch/)|
|body.top.underlang|Use this to add content under the Language Switch panel.|-|
|body|Use this to override the content of the main body.|-|
|fields.slotName|This is a dynamic slot. You can use it to override a field component. For example use `fields.title` to override the component of the field with value `title`.|A [`DetailField`](/components/detail/DetailField/) configured by a [`FieldConfiguration`](#fieldconfiguration).|
|body.bottom|Use this to add content under the main body.|-|
|side.buttons.top|Use this to add content on the top of the sidebar button panel.|-|
|side.buttons|Use this to override the the sidebar button panel.|Save, Save and continue, Back, and Delete buttons.|
|button.save|Use this to override the Save button.|The Save button.|
|button.savecontinue|Use this to override the Save and continue button.|The Save and continue button.|
|button.back|Use this to override the Back button.|The Back button.|
|button.delete|Use this to override the Delete button.|The Delete button.|
|side.top|Use this to add content on the top of the sidebar fields (or under sidebar buttons).|-|
|side.bottom|Use this to add content under the sidebar fields.|-|

<!-- @vuese:Detail:slots:end -->




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
 - `editor` ==> [wyg-editor](/components/fields/wygEditor/wygEditor/),
 - `media` ==> [media-field](/components/fields/MediaField/),
 - `m2m` or `fks` ==> [fks-field](/components/fields/FksField/),
 - `mediaList` ==> [media-fks-field](/components/fields/MediaM2mField/)


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



