# ListTable

## Props

<!-- @vuese:ListTable:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|crud|-|`Object`|`true`|-|
|http|-|`Boolean`|`false`|-|
|navigable|-|`Boolean`|`false`|-|
|lookup|-|`String`|`false`|id|
|detailLink|-|`Function`|`false`|default(item) {
  return {
    path: `${this.$route.path}/${item[this.lookup]}`
  };
}|
|filters|-|`Array`|`false`|[]|

<!-- @vuese:ListTable:props:end -->


## Events

<!-- @vuese:ListTable:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:ListTable:events:end -->


## Slots

<!-- @vuese:ListTable:slots:start -->

|Name|Description|Default Slot Content|
|---|---|---|
|dtable.top.center|-|-|
|dtable.top.under|-|-|
|`dtable.${slot}`|-|-|
|`dtable.${slot}`|-|-|
|`qedit.${slot}`|-|-|
|`qedit.${slot}`|-|-|
|length|-|-|

<!-- @vuese:ListTable:slots:end -->


