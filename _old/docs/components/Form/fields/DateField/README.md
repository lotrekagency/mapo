# DateField

This component is used to edit a date in iso format. It is a combination of "v-text-field" and "v-date-picker".

## Props

<!-- @vuese:DateField:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model property. Is the date to be modified. It can be also array in case of date range.|`String|Array`|`false`|-|
|range|Determines if we need to work with date ranges.|`Boolean`|`false`|false|
|readonly|This set the component status to readonly, stopping the user interaction.|`Boolean`|`false`|false|

<!-- @vuese:DateField:props:end -->


## Events

<!-- @vuese:DateField:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes|Emits the date or the date range edited.|

<!-- @vuese:DateField:events:end -->


