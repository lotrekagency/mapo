<template>
  <v-container fluid>
    <List
      show-select
      :headers="headers"
      endpoint="api/test"
      navigable
      addItem
      server-pagination
      multi-sort
      can-select-all
      searchable
    >
    </List>
  </v-container>
</template>

<script>
export default {
  middleware: ["auth"],
  data() {
    return {
      headers: [
        {
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        }
      ],
    };
  },
};
</script>
