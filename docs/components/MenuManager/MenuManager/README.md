# MenuManager

## Props

<!-- @vuese:MenuManager:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model of the object we are editing.|`Object`|`false`|-|
|translatable|Set the current lang to value.|`Boolean`|`false`|true|
|lang|Set the current lang to value.|`String`|`false`|-|
|languages|-|`Array`|`false`|-|
|usePatch|-|`Boolean`|`false`|-|
|endpoint|-|`String`|`false`|null|
|identifier|-|`String|Number`.|`false`|new|
|maxDepth|-|`Number`|`false`|-1|

<!-- @vuese:MenuManager:props:end -->


## Events

<!-- @vuese:MenuManager:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|Fired when the v-model changes.|Emits the entire payload modified.|

<!-- @vuese:MenuManager:events:end -->


## Slots

<!-- @vuese:MenuManager:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|`editor.${slot}`|-|-|
|`editor.${slot}`|-|-|

<!-- @vuese:MenuManager:slots:end -->


