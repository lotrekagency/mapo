<template>
  <v-container fluid>
    <List
      show-select
      :headers="headers"
      :editFields="editFields"
      :filters="availableFilters"
      :languages="['it', 'en', 'de']"
      endpoint="api/camomilla/articles"
      navigable
      addItem
      server-pagination
      multi-sort
      can-select-all
      searchable
      drag-reorder
    >
    </List>
  </v-container>
</template>

<script>
export default {
  meta: { permissions: { model: "article" } },
  middleware: ["auth", "permissions"],
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
        { value: "identifier", synci18n: true },
        { value: "content", type: "editor" },
        {
          group: "Seo",
          fields: [
            { value: "title", class: "col-md-6" },
            { value: "permalink", class: "col-md-6" },
            { value: "description", type: "textarea" },
          ],
        },
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
          datepicker: true,
        },
      ],
    };
  },
};
</script>
