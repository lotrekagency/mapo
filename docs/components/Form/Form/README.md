# Form

## Props

<!-- @vuese:Form:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the object we are editing.|`Object`|`true`|-|
|currentLang|Set the current lang to value.|`String`|`false`|-|
|errors|An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.|`Object`|`false`|-|
|moreSlotBindings|-|`Object`|`false`|-|
|fields|The main configuration that determines the arrangement of the fields in the detail layout.|[`DetailConfiguration`](#detailconfiguration)|`true`|-|
|languages|A list of languages into which the payload needs to be translated.|`Array`|`false`|[]|

<!-- @vuese:Form:props:end -->


## Events

<!-- @vuese:Form:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:Form:events:end -->


## Slots

<!-- @vuese:Form:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|`group.${field.group.slug}.title.before`|-|-|
|`group.${field.group.slug}.title`|-|-|
|`group.${field.group.slug}.title.after`|-|-|
|`group.${field.group.slug}.${slot}`|-|-|
|`group.${field.group.slug}.${slot}`|-|-|
|field.slotName + '.before'|-|-|
|field.slotName|-|-|
|`fields.${field.value}.${slot}`|-|-|
|`fields.${field.value}.${slot}`|-|-|
|field.slotName + '.after'|-|-|

<!-- @vuese:Form:slots:end -->


