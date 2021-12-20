<template>
  <div v-if="isActive" class="d-flex flex-row align-center fill-height">
    <v-select
      label="Group Actions"
      v-bind="$attrs"
      v-model="action"
      :items="filteredActions"
      item-text="label"
      item-value="handler"
      outlined
      dense
      hide-details
      clearable
      no-data-text="No actions available"
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
              return Promise.all(selection.map((i) => crud.delete(i[lookup])));
            },
          },
        ];
      },
    },
    // ❌ This is an internal prop. Sorry..
    selection: {
      // -
      type: [Array, String],
      // -
      default: () => [],
    },
    // ❌ This is an internal prop. Sorry..
    selectionQuery: {
      // -
      type: URLSearchParams,
      // -
      default: () => new URLSearchParams(),
    },
    // ❌ This is an internal prop. Sorry..
    crud: {
      // -
      type: Object,
      required: true,
    },
  },
  computed: {
    isActive() {
      return this.$attrs["show-select"] !== undefined;
    },
    filteredActions() {
      return this.actions.filter((action) => {
        return (this.selection != "all" && (action.handleMultiple ?? true)) || (this.selection == "all" && (action.handleAll ?? false));
      });
    }
  },
  methods: {
    handleAction() {
      if (!this.selectAll && !this.selection.length) {
        return this.$mapo.$snack.open({
          message: "You need to select at least one item.",
          color: "error",
        });
      }
      const ctx = {
        selection: this.selection,
        selectionQuery: this.selectionQuery,
        lookup: this.lookup,
        crud: this.crud,
      };
      return this.action
        ? this.action(ctx).then((res) => this.$emit("actionCompleted", res))
        : () => {};
    },
  },
};
</script>

<docs>
## Action config


The actions prop is a list of `Action` objects containing these keys:

- **"label"** `String` ==> The name of the action that will be renered inside the select button.
- **"handleMultiple"** `Boolean` ==> Make the action callable on multiple items. Default: `true`.
- **"handleAll"** `Boolean` ==> Make the action callable on all items. Default: `false`.
- **"handler"** `Function` ==> The callback function that will be executed once the user confirms the action.

The handler function will be called with a ctx containing:
 - **"selection"** `Array<Object>` or `String` ==> `"all"` if all items are selected else the list of selected objects.
 - **"selectionQuery"** `URLSearchParams` ==> GET parameters for the current list of objects.
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
