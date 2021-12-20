<template>
  <div>
    <ListHead v-bind="$attrs" />

    <div>
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <ListActions
              v-bind="$attrs"
              :crud="crud"
              :selection="allSelected ? 'all' : selection"
              :selectionQuery="selectionQuery"
              @actionCompleted="refresh"
            />
          </v-col>
          <v-col cols="12" md="8" class="d-flex flex-nowrap justify-end align-center">
            <!-- Overrides counter for selected items.  -->
            <slot name="item-counter" v-bind="{ selection, canSelectAll, allSelected, toggleSelectAll }">
              <div class="caption mr-1">
                <b v-if="allSelected">All items selected</b>
                <span v-else-if="selection.length">
                {{ selection.length }} items selected
                <v-btn
                    v-if="selection != 'all' && canSelectAll"
                    @click="toggleSelectAll"
                    outlined
                    tile
                    x-small
                    class="ml-1 d-inline-flex"
                    >Select all</v-btn
                >
                </span>
              </div>
            </slot>
            <ListFilters v-bind="$attrs" v-model="filters">
              <template v-for="(_, slot) in $slots" :slot="slot">
                <!-- @vuese-ignore -->
                <slot :name="slot"></slot>
              </template>
              <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
                <!-- @vuese-ignore -->
                <slot :name="slot" v-bind="props" />
              </template>
            </ListFilters>
          </v-col>
        </v-row>
    </div>
    <div>
      <ListTable
        v-model="selection"
        v-bind="{...$attrs, crud, filters}"
        v-on="$listeners"
        ref="dtable"
      >
        <template v-for="(_, slot) in $slots" :slot="slot">
          <!-- @vuese-ignore -->
          <slot :name="slot"></slot>
        </template>
        <template v-for="(_, slot) in $scopedSlots" v-slot:[slot]="props">
          <!-- @vuese-ignore -->
          <slot :name="slot" v-bind="props" />
        </template>
      </ListTable>
    </div>
  </div>
</template>

<script>
/**
 * The purpose of this component is to provide you with a very quick way to create a page that can show a list of resources retrieved from the server.
 * A use case example could be "build a page that lists all the products of an ecommerce". <br><br>
 * This component is a wrapper and is made up of several parts.
 * The props and slots of this component are passed to its childs.
 * For detailed explanations see [Transparent Wrapping](#transparent-wrapping). <br> <h4>Index:</h4> [[toc]]
 */
export default {
  name: "List",
  data() {
    return {
      tabActiveStatus: 1,
      selection: [],
      allSelected: false,
      filters: []
    };
  },
  props: {
    // The url of the endpoint that provides the data to display. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.
    endpoint: {
      type: String,
      required: true,
    },
    // Add option to select all items in all pages
    canSelectAll: Boolean,
  },
  computed: {
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
    selectionQuery() {
      return this.$refs?.dtable?.getHttpParams();
    }
  },
  watch: {
    selection(val) {
      // Fires when you select some row of the table.
      this.allSelected = val == 'all';
      // @arg Emit "all" if all items are selected, else the list of the selected rows.
      this.$emit("selectionChange", val);
    },
  },
  methods: {
    refresh() {
      return this.$refs.dtable.getDataFromApi();
    },
    toggleSelectAll() {
      return this.$refs?.dtable?.toggleSelectAll();
    }
  },
  mounted() {},
};
</script>


<docs>

## Transparent Wrapping


This component, as we said, is a wrapper and is made up of several parts:
 - [ListActions](../ListActions/)
 - [ListFilters](../ListFilters/)
 - [ListHead](../ListHead/)
 - [ListQuickEdit](../ListQuickEdit/)
 - [ListTable](../ListTable/)

Each component within it inherits its props and slots.

### Props
For the list of available prop refer to the documentation of each single part.

### Slots
Other slots related to sub-components can be reached through these namespaces:
 - `"filter"` is the namespace of [`ListFilters`](../ListFilters/#slots) slots.
 - `"dtable"` is the namespace of [`ListTable`](../ListTable/#slots) slots.
 - `"qedit"` is the namespace of [`ListQuickEdit`](../ListQuickEdit/#slots) slots.

<br><br>

## Live Demo

<br>

::: warning LIVE DEMO 🎉🎉🎉
This is an interactive example. You can play with it but remember that all http features are disabled since there is no backend server.
:::

::: demo
<template>
<v-app >
  <List
    show-select
    :headers="headers"
    :editFields="editFields"
    :filters="availableFilters"
    endpoint="api/camomilla/articles"
    title="List Example"
    addItem
  >
  </List>
</v-app>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Title", value: "title" },
        { text: "Identifier", value: "identifier" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editFields: [
        { attrs: { rules:[v => !!v || 'Title is required'] }, value: "title" },
        { attrs: { rules:[v => !!v || 'Permalink is required'] }, value: "permalink" },
        { attrs: { rules:[v => !!v || 'Identifier is required'] }, value: "identifier" },
      ],
      availableFilters: [
        {
          text: "Status",
          value: "status",
          choices: [
            { text: "Draft", value: "DRF" },
            { text: "Published", value: "PUB" },
            { text: "Trash", value: "TRS" },
          ],
        },
        {
          text: "Date",
          value: "date",
          datepicker: true
        },
      ],

    };
  },
};
</script>
:::


</docs>
