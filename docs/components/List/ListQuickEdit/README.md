# ListQuickEdit

This components renders a dialog that let the user quick edit (or add) an element of the list. The dialog provides several fields that will edit a payload that will be sent to the server. <br> The component checks for editFields config or dedicated slots to decide if it should be available to the user.

## Props

<!-- @vuese:ListQuickEdit:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model|`Boolean`|`false`|-|
|editTitle|-|`String`|`false`|-|
|editFields|-|`Array`|`false`|[]|
|lookup|-|`String`|`false`|id|
|crud|-|`Object`|`true`|-|
|offline|-|`Boolean`|`false`|-|

<!-- @vuese:ListQuickEdit:props:end -->


## Events

<!-- @vuese:ListQuickEdit:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:ListQuickEdit:events:end -->


## Slots

<!-- @vuese:ListQuickEdit:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|activator|-|-|
|title|-|-|
|body|-|-|
|actions|-|-|

<!-- @vuese:ListQuickEdit:slots:end -->


