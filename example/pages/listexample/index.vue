<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <List
          show-select
          :headers="headers"
          :editFields="editFields"
          :filters="availableFilters"
          endpoint="api/camomilla/articles"
          navigable
          addItem
          http
          multi-sort
          can-select-all
          searchable
        >
        </List>
      </v-col>
    </v-row>
  </div>
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
