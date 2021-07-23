<template>
  <div>
    <ListHead v-bind="$attrs" />

    <div>
        <v-row class="mb-4">
          <v-col cols="12" md="4">
            <ListActions
              v-bind="$attrs"
              :crud="crud"
              :selection="selection"
              @actionCompleted="refresh"
            />
          </v-col>
          <v-col cols="12" md="8">
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
    <div v-if="selection.length">
      {{ selection.length }} elementi selezionati
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
 * For detailed explanations see [Transparent Wrapping](#transparent-wrapping). <br><br>
 * ![List component structure](./img.png)
 */
export default {
  name: "List",
  data() {
    return {
      tabActiveStatus: 1,
      selection: [],
      filters: []
    };
  },
  props: {
    // The url of the endpoint that provides the data to display. From this url a complete crud (See [this.$mapo.$api.crud](/core/#$api.crud)) will be created.
    endpoint: {
      type: String,
      required: true,
    },
  },
  computed: {
    crud() {
      return this.$mapo.$api.crud(this.endpoint);
    },
  },
  watch: {
    selection(val) {
      // Fires when you select some row of the table.
      // @arg Emit the list of the selected rows.
      this.$emit("selectionChange", val);
    },
  },
  methods: {
    refresh() {
      return this.$refs.dtable.getDataFromApi();
    },
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
This component has not individual slots, but reflects down to its parts each assigned slot. 

Each part can be reached with a namespace.

 - `"filter"` is the namespace of [`ListFilters`](../ListFilters/#slots) slots.
 - `"dtable"` is the namespace of [`ListTable`](../ListTable/#slots) slots.
 - `"qedit"` is the namespace of [`ListQuickEdit`](../ListQuickEdit/#slots) slots.


## Live Example 🕶

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