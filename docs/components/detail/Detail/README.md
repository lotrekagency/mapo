# Detail

## Props

<!-- @vuese:Detail:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|fields|-|—|`false`|-|
|languages|-|`Array`|`false`|-|
|endpoint|-|`String`|`false`|-|
|identifier|-|—|`false`|-|
|modelName|-|`String`|`false`|-|
|sticky|-|`Boolean`|`false`|true|

<!-- @vuese:Detail:props:end -->


## Slots

<!-- @vuese:Detail:slots:start -->
|Name|Description|Default Slot Content|
|---|---|---|
|title|-|-|
|body.top|-|-|
|body.lang|-|-|
|body.top.underlang|-|-|
|body|-|-|
|`field.${parseConf(subField, false).value}`|-|-|
|body.bottom|-|-|
|side.buttons.top|-|-|
|side.buttons|-|-|
|button.save|-|-|
|button.savecontinue|-|-|
|button.back|-|-|
|button.delete|-|-|
|side.top|-|-|
|`field.${parseConf(subField, false).value}`|-|-|
|side.bottom|-|-|

<!-- @vuese:Detail:slots:end -->


