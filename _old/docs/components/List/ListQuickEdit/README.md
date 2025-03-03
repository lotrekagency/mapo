# ListQuickEdit

This components renders a dialog that let the user quick edit (or add) an element of the list. The dialog provides several fields that will edit a payload that will be sent to the server. <br> The component checks for editFields config or dedicated slots to decide if it should be available to the user.

## Props

<!-- @vuese:ListQuickEdit:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model|`Boolean`|`false`|-|
|editFields|The main configuration that determines the arrangement of the fields in the detail layout.|`Array`|`false`|[]|
|languages|A list of languages into which the payload needs to be translated.|`Array`|`false`|-|
|lookup|-|`String`|`false`|id|
|crud|-|`Object`|`true`|-|
|dialogProps|-|`Object`|`false`|{"width":600,"scrollable":true}|
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
|lang|-|[`DetailLangSwitch`](/components/detail/DetailLangSwitch/)|
|title|-|-|
|body.top|Use this to add content on top of body.|-|
|body|-|-|
|body.bottom|Use this to add content under the main body.|-|
|actions|-|-|

<!-- @vuese:ListQuickEdit:slots:end -->


