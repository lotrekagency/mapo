<template>
  <v-container fluid>
    <List
      :headers="headers"
      endpoint="api/camomilla/menus"
      navigable
      addItem
      server-pagination
      multi-sort
      can-select-all
      searchable
      show-select
    >
    </List>
  </v-container>
</template>

<script>
export default {
  meta: { label: "Menu", icon: "mdi-book-open-page-variant-outline", permissions: { model: "menu" } },
  middleware: ["auth", "permissions"],
  data() {
    return {
      headers: [
        { text: "Key", value: "key" },
        { text: "Enabled", value: "enabled" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },
};
</script>
