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

<i18n lang="yaml">
en:
  title: "Title"
  description: "Description"
  identifier: "Identifier"
  actions: "Actions"
  content: "Content"
  status:
    draft: "Draft"
    published: "Published"
    trash: "Trash"
  date: "Date"
it:
  title: "Titolo"
  description: "Descrizione"
  identifier: "Identificatore"
  actions: "Azioni"
  content: "Contenuto"
  status:
    draft: "Bozza"
    published: "Pubblicato"
    trash: "Cestinato"
  date: "Data"
</i18n>

<script>
export default {
  meta: { permissions: { model: "article" } },
  middleware: ["auth", "permissions"],
  data() {
    return {};
  },
  computed: {
    headers() {
      return [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: this.$t("title"), value: "title" },
        { text: this.$t("identifier"), value: "identifier" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    editFields() {
      return [
        { label: this.$t("identifier"), value: "identifier", synci18n: true },
        { label: this.$t("content"), value: "content", type: "editor" },
        {
          group: "Seo",
          fields: [
            { label: this.$t("title"), value: "title", class: "col-md-6" },
            { value: "permalink", class: "col-md-6" },
            { label: this.$t("description"), value: "description", type: "textarea" },
          ],
        },
      ];
    },
    availableFilters() {
      return [
        {
          text: "Status",
          value: "status",
          choices: [
            { text: this.$t("status.draft"), value: "DRF" },
            { text: this.$t("status.published"), value: "PUB" },
            { text: this.$t("status.trash"), value: "TRS" },
          ],
        },
        {
          text: this.$t("date"),
          value: "date",
          datepicker: true,
        },
      ];
    },
  },
};
</script>
