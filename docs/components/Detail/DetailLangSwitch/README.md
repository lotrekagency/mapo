# DetailLangSwitch

This is mainly an internal component. It is used by the [`DetailComponent`](/components/detail/Detail) in order to render and manage all the language choices for the payload.

## Props

<!-- @vuese:DetailLangSwitch:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model representing the current selected language.|`String`|`false`|-|
|langs|A list of languages into which the payload needs to be translated.|`Array`|`false`|[]|
|errors|An object representing all the errors of all fields. This component will find errors in each language and will display a little dot in the tab if there are any errors.|`Object`|`false`|-|

<!-- @vuese:DetailLangSwitch:props:end -->


## Events

<!-- @vuese:DetailLangSwitch:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes.|Emits the current language choice.|

<!-- @vuese:DetailLangSwitch:events:end -->


