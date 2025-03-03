# Repeater

This component is made to manage a list of object that can be added/removed/reordered with a simple form.

## Props

<!-- @vuese:Repeater:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the array needed to edit the objects in realtime.|`Array`|`false`|[]|
|fields|The main configuration that determines the arrangement of the fields in each line. It can be an array or an object. More info [here](#how-to-configure-the-repeater)|[`Array<FieldConfiguration>`](/components/Detail/Detail/#fieldconfiguration)|`false`|[]|
|errorMessages|Puts the input in an error state and passes through custom error messages.|`Array`|`false`|[]|
|label|Sets input label.|`String`|`false`|-|
|readonly|Makes all the repeater items readonly.|`Boolean`|`false`|-|
|sortable|Makes the repeater field sortable.|`Boolean`|`false`|-|
|collapsable|Makes the repeater field collapsable.|`Boolean`|`false`|-|
|translatable|Make the repeater multilanguage. This means that it's going to inherit the languages and the current language from the parent detail component, creating the translations for each line of the repeater.|`Boolean`|`false`|-|
|sortCallback|This callback is called during sort/add/remove item if the Repeater is sortable. Use this callback to change some prop of the items in the list.|`Function`|`false`|() => {}|
|collapsedLabel|With this you can define the output of the collapsed label. You can enter the pointed path of a value in the row or a callback function to extract the label from the row.|—|`false`|null|
|langs|This is mainly an internal property. It is used by DetailField to pass the list of languages inherited from the Detail component.|`Array<String>`|`false`|-|
|currentLang|This is mainly an internal property. It is used by DetailField to pass the active language inherited from the Detail component.|`String`|`false`|-|
|maxHeight|-|—|`false`|-|

<!-- @vuese:Repeater:props:end -->


## Events

<!-- @vuese:Repeater:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:Repeater:events:end -->


## Slots

<!-- @vuese:Repeater:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|name|-|-|
|name|-|-|

<!-- @vuese:Repeater:slots:end -->





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



