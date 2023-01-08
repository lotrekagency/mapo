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
      :title="$t('users')"
    >
    </List>
  </v-container>
</template>

<i18n lang="yaml">
en:
  actions: "Actions"
  firstName: "First name"
  lastName: "Last name"
  superUser: "Superuser"
  y: "Yes"
  n: "No"
it:
  actions: "Azioni"
  firstName: "Nome"
  lastName: "Cognome"
  superUser: "Superutente"
  y: "Sì"
  n: "No"
</i18n>

<script>
export default {
  meta: {
    sidebarFooter: true,
    label: { translate: "users" },
    icon: "mdi-account-group",
    permissions: { model: "user" },
  },
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
        { text: this.$t("actions"), value: "actions", sortable: false },
      ],
      editFields: [
        { value: "username", synci18n: true },
        { value: "email", synci18n: true },
        { label: this.$t("firstName"), value: "first_name", synci18n: true },
        { label: this.$t("lastName"), value: "last_name", synci18n: true },
        { value: "password", synci18n: true, attrs: { type: "password" } },
      ],
      availableFilters: [
        {
          text: this.$t("superUser"),
          value: "is_superuser",
          choices: [
            { text: this.$t("y"), value: true },
            { text: this.$t("n"), value: false },
          ],
        },
      ],
    };
  },
};
</script>
