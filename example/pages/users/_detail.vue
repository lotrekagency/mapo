<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/camomilla/users"
      :identifier="$route.params.detail"
      :fields="fields"
      modelName="User"
    />
  </v-container>
</template>

<script>
export default {
  meta: { sidebarHide: true, permissions: { model: "user" } },
  middleware: ["auth", "permissions"],
  data: () => ({
    model: {},
    fields: {
      main: [
        { value: "username", synci18n: true, class: "col-md-6" },
        { value: "email", synci18n: true, class: "col-md-6" },
        { value: "first_name", synci18n: true, class: "col-md-6" },
        { value: "last_name", synci18n: true, class: "col-md-6" },
        { value: "password", synci18n: true, attrs: { type: "password" } },
        {
          value: "user_permissions",
          synci18n: true,
          type: "m2m",
          attrs: {
            endpoint: "api/camomilla/permissions",
            itemText: "name",
          },
        },
      ],
      sidenav: [{ value: "is_superuser", type: "switch", synci18n: true }],
    },
  }),
};
</script>