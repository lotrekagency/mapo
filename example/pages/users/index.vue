<template>
  <v-container fluid>
    <List
      show-select
      :headers="headers"
      :editFields="editFields"
      :filters="availableFilters"
      endpoint="api/camomilla/users"
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
  meta: { sidebarFooter: true, label: "Utenti", icon: "mdi-account-group", permissions: { model: "user" } },
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
        { text: "Username", value: "username" },
        { text: "Email", value: "email" },
        { text: "Superuser", value: "is_superuser" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editFields: [
        { value: "username", synci18n: true },
        { value: "email", synci18n: true },
        { value: "first_name", synci18n: true },
        { value: "last_name", synci18n: true },
        { value: "password", synci18n: true, attrs: {type: "password"} },
      ],
      availableFilters: [
        {
          text: "Superuser",
          value: "is_superuser",
          choices: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
        },
      ],
    };
  },
};
</script>
