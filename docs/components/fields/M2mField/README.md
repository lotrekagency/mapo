# M2mField

This component is made to simplify Many To Many associations. With this component you can modify an array selecting items from a list of checkboxes.

## Props

<!-- @vuese:M2mField:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|value|V-model property. It is the array to be modified.|`Array`|`true`|-|
|items|This is the array of options from which you can choose.|`Array`|`false`|[]|
|itemText|-|`String`|`false`|text|
|itemValue|-|`String`|`false`|*|
|lookup|-|`String`|`false`|id|
|endPoint|-|`String`|`false`|-|
|mapping|-|`Function`|`false`|items => items|

<!-- @vuese:M2mField:props:end -->


## Events

<!-- @vuese:M2mField:events:start -->

|Event Name|Description|Parameters|
|---|---|---|
|input|-|-|

<!-- @vuese:M2mField:events:end -->


