<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/test"
      :identifier="$route.params.detail"
      :fields="fields"
      modelName="test"
    />
  </v-container>
</template>

<script>
export default {
  meta: { sidebarHide: true, permissions: { model: "test" } },
  middleware: ["auth", "permissions"],
  data: () => ({
    model: {},
    fields: {
      main: [
        { value: "test_file", type: "file" },
        { value: "test_image", type: "file" },
        { value: "test_text" },
        { value: "inner_fields.test_text" },
        { value: "inner_fields.test_file", type: "file" },
        { value: "inner_fields.test_image", type: "file" },

      ],
      sidenav: [],
    },
  }),
};
</script>