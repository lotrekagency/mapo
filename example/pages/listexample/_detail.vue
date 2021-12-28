<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/camomilla/articles"
      :identifier="$route.params.detail"
      :fields="fields"
      :languages="['it', 'en', 'de']"
      modelName="article"
    />
  </v-container>
</template>

<script>
export default {
  data: () => ({
    model: {},
    fields: {
      main: [
        { value: "identifier", synci18n: true },
        // {
        //   value: "tags",
        //   synci18n: true,
        //   type: "m2m",
        //   attrs: { endPoint: "api/camomilla/tags", itemText: "title" }
        // },
        { value: "content", type: "editor" },
        {
          group: "Seo",
          fields: [
            { value: "title", class: "col-md-6" },
            { value: "permalink", class: "col-md-6" },
            { value: "description", type: "textarea" },
            { type: "seoPreview" }
          ]
        }
      ],
      sidenav: [
        {
          group: "Status",
          fields: [
            { value: "trash", type: "switch", synci18n: true },
            {
              value: "status",
              type: "select",
              attrs: {
                items: [
                  { text: "Draft", value: "DRF" },
                  { text: "Published", value: "PUB" },
                  { text: "Trash", value: "TRS" }
                ]
              },
              synci18n: true
            },
            {
              value: "pubblication_date",
              accessor: {
                set: ({ val }) => val && new Date(val).toISOString()
              },
              type: "date",
              synci18n: true
            }
          ]
        },
        { value: "highlight_image", type: "media", synci18n: true }
      ]
    }
  }),
  meta: {
    sidebarHide: true
  }
};
</script>