<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/camomilla/articles"
      :identifier="$route.params.detail"
      :fields="fields"
      :languages="['it', 'en', 'de']"
      modelName="article"
    >
    <!-- <template v-slot:fields.meta.contents.template.stocazzo.fields.title>
      <h2>suca</h2>
    </template>
    <template v-slot:group.tab_1-tab_2.tab.tab_1.fields.meta.key1>
      <h2>suca2</h2>
    </template> -->
    </Detail>
  </v-container>
</template>

<script>
import { slugify } from '@mapomodule/utils/helpers/formatters';
import { setPointed } from '@mapomodule/utils/helpers/objHelpers';

export default {
  meta: { sidebarHide: true, permissions: { model: "article" } },
  middleware: ["auth", "permissions"],
  data: () => ({
    model: {},
    fields: {
      main: [
        { value: "identifier", synci18n: true },
        {
          value: "tags",
          synci18n: true,
          type: "m2m",
          attrs: { endpoint: "api/camomilla/tags", itemText: "title" },
        },
        {
          value: "meta.variations",
          label: "Variations",
          synci18n: true,
          type: "repeater",
          attrs: {
            sortable: true,
            translatable: true,
            fields: [
              { value: "sku", class: "col-md-6" },
              { value: "name", class: "col-md-6" },
            ]
          }
        },
        {
          value: "meta.contents",
          label: "Contents",
          synci18n: true,
          type: "repeater",
          attrs: {
            sortable: true,
            collapsable: true,
            collapsedLabel: (item) => `<b>Linea dal titolo: ${item.tCode || item.polimorphic_c}</b>`,
            // translatable: true,
            fields: {
              group_1: [
                { value: "title", class: "col-md-6" },
                { value: "date", type: "date", class: "col-md-4" },
                { value: "hash", class: "col-md-6", vVisible: ({ model }) => model.random },
                { value: "random", type: "switch", class: "col-md-6" },
              ],
              group_2: [
                { value: "title", class: "col-md-6" },
                { value: "date", type: "date", class: "col-md-4" },
                { value: "casual", type: "switch", class: "col-md-2" },
              ],
              group_3: {
                name: "Custom name",
                preview: "https://blog.openreplay.com/c4052718994cbc8eb6dac8c89c23ba06/img3.gif",
                description: "this template has title, subtitle and a content blocks.",
                tCode: "stocazzo",
                tCodeField: "polimorphic_c",
                fields: [
                  { value: "title", class: "col-md-6" },
                  { value: "subtitle", class: "col-md-6" },
                  { value: "content", type: "editor" },
                ]
              },
            },
          },
        },
        {
          // group: "Tabs",
          tabs: {
            tab_1: [
              { value: "meta.key1", synci18n: true,},
              { value: "meta.key2", synci18n: true, type: "textarea" },
            ],
            tab_2: [
              { value: "meta.key2", synci18n: true },
            ],
          }
        },
        { value: "content", type: "editor" },
        {
          group: "Seo",
          fields: [
            { value: "title", class: "col-md-6", onChange: ({ val, model, conf }) => setPointed(model, conf.value.replace("title", "permalink"), slugify(val)) },
            { value: "permalink", class: "col-md-6" },
            { value: "description", type: "textarea" },
            { type: "seoPreview" },
          ],
        },
      ],
      sidenav: [
        {
          value: "categories",
          synci18n: true,
          type: "m2m",
          attrs: { endpoint: "api/camomilla/categories", itemText: "title" },
        },
        {
          group: "Status",
          fields: [
            { value: "trash", type: "switch", synci18n: true },
            {
              value: "status",
              vShow: ({ model }) => !model.trash,
              type: "select",
              attrs: {
                items: [
                  { text: "Draft", value: "DRF" },
                  { text: "Published", value: "PUB" },
                  { text: "Trash", value: "TRS" },
                ],
              },
              synci18n: true,
            },
            {
              value: "pubblication_date",
              accessor: {
                set: ({ val }) => val && new Date(val).toISOString(),
              },
              type: "date",
              synci18n: true,
            },
          ],
        },
        { value: "highlight_image", type: "media", synci18n: true },
      ],
    },
  }),
};
</script>