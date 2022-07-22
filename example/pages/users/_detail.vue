<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/camomilla/users"
      :identifier="$route.params.detail"
      :fields="fields"
      :modelName="this.$t('user')"
    />
  </v-container>
</template>

<i18n lang="yaml">
en:
  user: "User"
  firstName: "First name"
  lastName: "Last name"
  superUser: "Superuser"
  perms: "User permissions"
it:
  user: "Utente"
  firstName: "Nome"
  lastName: "Cognome"
  superUser: "Superutente"
  perms: "Permessi"
</i18n>

<script>
export default {
  meta: { sidebarHide: true, permissions: { model: "user" } },
  middleware: ["auth", "permissions"],
  data() {
    return {
      model: {},
    };
  },
  computed: {
    fields() {
      return {
        main: [
          { value: "username", synci18n: true, class: "col-md-6" },
          { value: "email", synci18n: true, class: "col-md-6" },
          {
            label: this.$t("firstName"),
            value: "first_name",
            synci18n: true,
            class: "col-md-6",
          },
          {
            label: this.$t("lastName"),
            value: "last_name",
            synci18n: true,
            class: "col-md-6",
          },
          { value: "password", synci18n: true, attrs: { type: "password" } },
          {
            label: this.$t("perms"),
            value: "user_permissions",
            synci18n: true,
            type: "m2m",
            attrs: {
              endpoint: "api/camomilla/permissions",
              itemText: "name",
            },
          },
        ],
        sidenav: [
          {
            label: this.$t("superUser"),
            value: "is_superuser",
            type: "switch",
            synci18n: true,
          },
        ],
      };
    },
  },
};
</script>
