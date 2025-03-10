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
        {
          value: "inner_fields.test_repeater",
          label: "test_repeater",
          type: "repeater",
          attrs: {
            sortable: true,
            collapsable: true,
            fields: [
              {
                value: "test title",
                label: "test title",
                attrs: { hideDetails: true, dense: true },
              },
              {
                value: "test title 2",
                label: "test title 2",
                attrs: { hideDetails: true, dense: true },
              },
              {
                value: "test title 3",
                label: "test title 3",
                attrs: { hideDetails: true, dense: true },
              },
              {
                value: "test title 4",
                label: "test title 4",
                attrs: { hideDetails: true, dense: true },
              },
            ],
          },
        },
      ],
      sidenav: [],
    },
  }),
};
</script>
