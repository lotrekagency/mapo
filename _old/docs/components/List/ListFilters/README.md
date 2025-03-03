# ListFilters

This components renders the filter menu in the upper-right. The menu provides a selection of filters applicable to the list. The list of applied filters appears next to the menu as a list of chips containing the name of the filter and the applied values. <br> If no filters are passed to the component it will not be rendered.

## Props

<!-- @vuese:ListFilters:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|filters|This is the main configuration of the component. It contains a list of filters.|[`Array<Filter>`](#filter-config)|`false`|[]|
|value|This is the v-model of the component. It contains the active filters.|[`Array<Filter>`](#filter-config)|`false`|[]|

<!-- @vuese:ListFilters:props:end -->


## Events

<!-- @vuese:ListFilters:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|This is an internal event to bind the active filters with other List parts.|-|

<!-- @vuese:ListFilters:events:end -->


## Slots

<!-- @vuese:ListFilters:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|`filter.${filter.value}`|This is a dynamic slot. You can use it to override filters. <br> For example use `filter.status` to completely override the rendering of the filter with `"status"` as value.|-|
|`filter.${filter.value}.title`|This is a dynamic slot. You can use it to override filters title.|-|
|`filter.${filter.value}.content`|This is a dynamic slot. You can use it to override filters content.|-|
|`filter.${filter.value}.icon`|This is a dynamic slot. You can use it to override filters icon.|-|

<!-- @vuese:ListFilters:slots:end -->



## Filter config

The filters prop is a list of `Filter` objects made of several keys:

- **"text"** `String` ==> The name of the filter that will be renered inside the filter menu.
- **"value"** `String` ==> The dotted path of the value we need to filter on.
- **"defaultChoice"** `String` ==> A choice value that is applied on the startup of the component. This lets you start the list with some filter already applied.
- **"choices"** `Array<Choice>` ==> The list of choices rendered inside the filter. The text is the label, the value is the string we use as a filter.
- **"datepicker"** `Boolean` ==> This is a boolean that determines if the filter has a datepicker layout.
- **"multiple"** `Boolean` ==> This is a boolean that determines if the filter is exclusive or inclusive. In other words, if by selecting a choice it is added to the previous one or if it replaces it.

### Choice object

The choice object is used to list all the available choices of a single filter.
It is made of:

- **"text"** `String` ==> The label of the choice.
- **"value"** `String` ==> The value that will be used to filter the list if this choice is active.
- **"icon"** `String` ==> The icon at the left of the choice label, by default we use 'mdi-circle-small'. For a list of all available icons, visit the official [Material Design Icons](https://materialdesignicons.com/) page.


## Example
Here an example of two filters for an article list; one based on article status and the other on the publication date:

```js
const filters = [
  {
    text: "Status",
    value: "status",
    choices: [
      { text: "Draft", value: "DRF" },
      { text: "Published", value: "PUB" },
      { text: "Trash", value: "TRS" },
    ],
  },
  {
    text: "Date",
    value: "date",
    datepicker: true
  },
]
```
