# List

The purpose of this component is to provide you with a very quick way to create a page that can show a list of resources retrieved from the server. A use case example could be "build a page that lists all the products of an ecommerce". <br><br> This component is a wrapper and is made up of several parts. The props and slots of this component are passed to its childs. For detailed explanations see [Transparent Wrapping](#transparent-wrapping). <br> <h4>Index:</h4> [[toc]]

## Props

<!-- @vuese:List:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|endpoint|The url of the endpoint that provides the data to display. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.|`String`|`false`|-|
|canSelectAll|Add option to select all items in all pages|`Boolean`|`false`|-|

<!-- @vuese:List:props:end -->


## Events

<!-- @vuese:List:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|selectionChange|Fires when you select some row of the table.|Emit "all" if all items are selected, else the list of the selected rows.|

<!-- @vuese:List:events:end -->


## Slots

<!-- @vuese:List:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|item-counter|Overrides counter for selected items.|-|

<!-- @vuese:List:slots:end -->




## Transparent Wrapping


This component, as we said, is a wrapper and is made up of several parts:
 - [ListActions](../ListActions/)
 - [ListFilters](../ListFilters/)
 - [ListHead](../ListHead/)
 - [ListQuickEdit](../ListQuickEdit/)
 - [ListTable](../ListTable/)

Each component within it inherits its props and slots.

### Props
For the list of available prop refer to the documentation of each single part.

### Slots
Other slots related to sub-components can be reached through these namespaces:
 - `"filter"` is the namespace of [`ListFilters`](../ListFilters/#slots) slots.
 - `"dtable"` is the namespace of [`ListTable`](../ListTable/#slots) slots.
 - `"qedit"` is the namespace of [`ListQuickEdit`](../ListQuickEdit/#slots) slots.

<br><br>

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::

::: demo
<template>
  <List
    show-select
    lookup="name"
    :headers="headers"
    :editFields="editFields"
    :filters="availableFilters"
    multi-sort
    can-select-all
    searchable
    :data.sync="desserts"
    :actions="[]"
  >
  </List>
  <br>
  <h3> Data: </h3>
  <pre>{{ desserts }}</pre>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Protein (g)", value: "protein" },
        { text: "Gluten-Free", value: "glutenfree" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editFields: [
        { attrs: { rules: [(v) => !!v || "Name is required"] }, value: "name" },
        { value: "protein" }
      ],
      availableFilters: [
        {
          text: "Gluten Free",
          value: "glutenfree",
          choices: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
        },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          protein: 4.0,
          glutenfree: true,
        },
        {
          name: "Ice cream sandwich",
          protein: 4.3,
          glutenfree: false,
        },
        {
          name: "Eclair",
          protein: 6.0,
          glutenfree: false,
        },
        {
          name: "Jelly bean",
          protein: 0.0,
          glutenfree: true,
        },
        {
          name: "Lollipop",
          protein: 0,
          glutenfree: true,
        },
        {
          name: "KitKat",
          protein: 7,
          glutenfree: false,
        },
        {
          name: "KitKat2",
          protein: 77,
          glutenfree: false,
        },
      ],
    };
  },
};
</script>
:::


