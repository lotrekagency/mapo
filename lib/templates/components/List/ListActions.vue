<template>
  <div v-if="isActive" class="d-flex flex-row align-center fill-height">
    <v-select
      label="Group Actions"
      v-bind="$attrs"
      v-model="action"
      :items="actions"
      item-text="label"
      item-value="handler"
      outlined
      dense
      hide-details
      clearable
    ></v-select>
    <v-btn
      class="rounded-0 elevation-0 ml-2"
      outlined
      color="primary"
      :disabled="!action"
      @click="handleAction"
      >Apply</v-btn
    >
  </div>
</template>
<script>
/**
 * This components renders the select box in the upper-left. This select box contains a list of actions that can be used on a selection of items.
 * By default the only action mapo provides is a bulk delete. But with the proper configuration you can do any action you want.
 */
export default {
  name: "ListActions",
  data() {
    return {
      action: null,
    };
  },
  props: {
    // The key used to identify each object passed to the action.
    lookup: {
      type: String,
      default: "id",
    },
    // This is the main configuration of the component. It contains a list of actions.
    actions: {
      // [`Array<Action>`](#action-config)
      type: Array,
      // The bulk delete action.
      default() {
        return [
          {
            label: "Permanent delete",
            handler: function ({ selection, lookup, crud }) {
              return Promise.all(
                selection.map((i) => crud.delete(i[lookup]))
              );
            },
          },
        ];
      },
    },
    // ❌ This is an internal prop. Sorry..
    selection: {
      // - 
      type: Array,
      // - 
      default: () => [],
    },
    // ❌ This is an internal prop. Sorry..
    crud: {
      // - 
      type: Object,
      required: true,
    },
  },
  computed:{
    isActive(){
      return this.$attrs['show-select'] !== undefined
    }
  },
  methods: {
    handleAction() {
      if (!this.selection.length) {
        return this.$mapo.$snack.open({
          message: "You need to select at least one item.",
          color: "error",
        });
      }
      const ctx = { selection: this.selection, lookup: this.lookup, crud: this.crud }
      return this.action ? this.action(ctx).then((res) => this.$emit('actionCompleted', res)) : () => {};
    },
  },
};
</script>

<docs>
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
</docs>