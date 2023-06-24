# FormTabs

## Props

<!-- @vuese:FormTabs:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the object we are editing.|`Object`|`true`|-|
|currentLang|Set the current lang to value.|`String`|`false`|-|
|readonly|Makes all the fields readonly.|`Boolean`|`false`|-|
|errors|An object representing all the errors of all fields. This means that this component will find the error of its field following the dottedPath of the value in the error dict.|`Object`|`false`|-|
|moreSlotBindings|Additional bindings to indrease slots capabilities|`Object`|`false`|-|
|conf|The main configuration that determines the arrangement of the fields in the detail layout.|`Object`|`true`|-|
|languages|A list of languages into which the payload needs to be translated.|`Array`|`false`|-|

<!-- @vuese:FormTabs:props:end -->


## Events

<!-- @vuese:FormTabs:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:FormTabs:events:end -->


## Slots

<!-- @vuese:FormTabs:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|title.before|-|-|
|title|-|-|
|title.after|-|-|
|expandIcon|-|-|
|`tab.${tab.tab.slug}.before`|-|-|
|`tab.${tab.tab.slug}`|-|-|
|`tab.${tab.tab.slug}.${slot}`|-|-|
|`tab.${tab.tab.slug}.${slot}`|-|-|
|`tab.${tab.tab.slug}.after`|-|-|

<!-- @vuese:FormTabs:slots:end -->


