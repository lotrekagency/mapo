# Repeater

This component is made to manage a list of object that can be added/removed/reordered with a simple form.

## Props

<!-- @vuese:Repeater:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the array needed to edit the objects in realtime.|`Array`|`false`|[]|
|fields|The main configuration that determines the arrangement of the fields in each line.|[`Array<FieldConfiguration>`](/components/Detail/Detail/#fieldconfiguration)|`false`|[]|
|errorMessages|Puts the input in an error state and passes through custom error messages.|`Array`|`false`|[]|
|label|Sets input label.|`String`|`false`|-|
|readonly|Makes all the repeater items readonly.|`Boolean`|`false`|-|
|sortable|Makes the repeater field sortable.|`Boolean`|`false`|-|
|sortCallback|This callback is called during sort/add/remove item if the Repeater is sortable. Use this callback to change some prop of the items in the list.|`Function`|`false`|() => {}|

<!-- @vuese:Repeater:props:end -->


## Events

<!-- @vuese:Repeater:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:Repeater:events:end -->


