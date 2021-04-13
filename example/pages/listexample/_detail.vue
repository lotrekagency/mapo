<template>
  <Detail
    endpoint="api/camomilla/articles"
    :identifier="$route.params.detail"
    :fields="fields"
    :languages="['it', 'en', 'de']"
  />
</template>

<script>
export default {
  data: () => ({
    fields: [
      { value: "canonical" },
      { value: "identifier", synci18n: true },
      { value: "title" },
      { value: "permalink" },
      {
        group: "Seo",
        fields: [
          {
            value: "date",
            type: "date",
          },
          {
            value: "status",
            type: "select",
            attrs: {
              items: [
                { text: "Draft", value: "DRF" },
                { text: "Published", value: "PUB" },
                { text: "Trash", value: "TRS" },
              ],
            },
          },
          { value: "content", is: "tiny-mce" },
        ],
      },
    ],
  }),
  meta: {
    sidebarHide: true,
  },
};
</script>