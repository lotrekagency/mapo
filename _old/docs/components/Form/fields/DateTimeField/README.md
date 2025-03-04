# DateTimeField

This component is used to edit a datetime in iso format. It is a combination of "v-text-field", "v-date-picker" and "v-time-picker". All dates are emitted using UTC timezone.

## Props

<!-- @vuese:DateTimeField:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model property. Is the date to be modified. It can be also array in case of date range.|`String|Array`|`false`|-|
|range|Determines if we need to work with date ranges.|`Boolean`|`false`|false|
|readonly|This set the component status to readonly, stopping the user interaction.|`Boolean`|`false`|false|
|datePickerAttrs|-|`Object`|`false`|-|
|timePickerAttrs|-|`Object`|`false`|-|

<!-- @vuese:DateTimeField:props:end -->


## Events

<!-- @vuese:DateTimeField:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:DateTimeField:events:end -->


