# DetailField

This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail/) in order to render dinamic fields inside the main form.

## Props

<!-- @vuese:DetailField:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the payload needed to edit the field value in realtime.|`Object`|`true`|-|
|errors|An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.|`Object`|`false`|-|
|conf|The main configuration that determines the rendering of the field. See [FieldConfiguration](/components/detail/Detail/#fieldconfiguration).|[`FieldConfiguration`](/components/detail/Detail/#fieldconfiguration)|`true`|-|

<!-- @vuese:DetailField:props:end -->


## Events

<!-- @vuese:DetailField:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes.|Emits the entire payload modified.|

<!-- @vuese:DetailField:events:end -->


