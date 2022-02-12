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

// test_file
// test_json
// test_date
// test_text
// test_image

        { value: "test_file", type: 'file' },
        { value: "test_image", type: 'file' },
        { value: "test_text"},
        
        
      ],
      sidenav: [
      ]
    }
  }),
};
</script>