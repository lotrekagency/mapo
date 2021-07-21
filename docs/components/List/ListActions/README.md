# ListActions

This components renders the select box in the upper-left. This select box contains a list of actions that can be used on a selection of items. By default the only action mapo provides is a bulk delete. But with the proper configuration you can do any action you want.

## Props

<!-- @vuese:ListActions:props:start -->

|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|lookup|The key used to identify each object passed to the action.|`String`|`false`|id|
|actions|This is the main configuration of the component. It contains a list of actions.|[`Array<Action>`](#action-config)|`false`|The bulk delete action.|
|selection|❌ This is an internal prop. Sorry..|-|`false`|-|
|crud|❌ This is an internal prop. Sorry..|-|`true`|-|

<!-- @vuese:ListActions:props:end -->



## Action config


The actions prop is a list of `Action` objects made of two keys: 

- **"label"** `String` ==> The name of the action that will be renered inside the select button.
- **"handler"** `Function` ==> The callback function that will be executed once the user confirms the action.

The handler function will be called with a ctx containing:
 - **"selection"** `Array<Object>`==> The list of selected objects.
 - **"lookup"** `String` ==> The lookup prop.
 - **"crud"** [`Crud`](/core/#api.crud) ==> The inherited crud from [List](../List/) component.


## Example
Here the "bulk delete" action provided by default, you can use it as a basis to write other custom actions:

```js
const actions = [
  {
    label: "Permanent delete",
    handler: function ({ selection, lookup, crud }) {
      return Promise.all(
        selection.map((i) => crud.delete(i[lookup]))
      );
    },
  }
]
```
