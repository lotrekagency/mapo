<template>
  <v-container fluid>
    <Detail
      v-model="model"
      endpoint="api/camomilla/articles"
      :identifier="$route.params.detail"
      :fields="fields"
      :languages="['it', 'en', 'de']"
      :modelName="$t('article')"
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

<i18n lang="yaml">
en:
  article: "Article"
  identifier: "Identifier"
  title: "Title"
  name: "Name"
  subtitle: "Sub-Title"
  content: "Content"
  description: "Description"
  tags: "Tags"
  variations: "Variations"
  contents: "Contents"
  collapsedLabel: "<b>Line with title: {0}</b>"
  date: "Date"
  customName: "Custom name"
  group3Description: "this template has title, subtitle and a content blocks."
  categories: "Categories"
  status:
    draft: "Draft"
    published: "Published"
    trash: "Trash"
  pubblicationDate: "Pubblication Date"
  highlightImage: "Highlight Image"
  testTab: "Test tab en"
it:
  article: "Articolo"
  identifier: "Identificatore"
  title: "Titolo"
  name: "Nome"
  subtitle: "Sottotitolo"
  content: "Contenuto"
  description: "Descrizione"
  tags: "Tag"
  variations: "Variazioni"
  contents: "Contenuti"
  collapsedLabel: "<b>Linea con titolo: {0}</b>"
  date: "Data"
  customName: "Nome custom"
  group3Description: "Questo template ha titolo, sottotitolo e un blocco di contenuto."
  categories: "Categorie"
  status:
    draft: "Bozza"
    published: "Pubblicato"
    trash: "Cestinato"
  pubblicationDate: "Data di pubblicazione"
  highlightImage: "Immagine in evidenza"
  testTab: "Test tab it"
</i18n>

<script>
import { slugify } from "@mapomodule/utils/helpers/formatters";
import { setPointed } from "@mapomodule/utils/helpers/objHelpers";

export default {
  meta: { sidebarHide: true, permissions: { model: "article" } },
  middleware: ["auth", "permissions"],
  data: () => ({
    model: {},
  }),
  computed: {
    fields() {
      return {
        main: [
          { label: this.$t("identifier"), value: "identifier", synci18n: true },
          {
            label: this.$t("tags"),
            value: "tags",
            synci18n: true,
            type: "m2m",
            attrs: { endpoint: "api/camomilla/tags", itemText: "title" },
          },
          {
            value: "meta.variations",
            label: this.$t("variations"),
            synci18n: true,
            type: "repeater",
            attrs: {
              sortable: true,
              translatable: true,
              fields: [
                { value: "sku", class: "col-md-6" },
                { label: this.$t("name"), value: "name", class: "col-md-6" },
              ],
            },
          },
          {
            value: "meta.contents",
            label: this.$t("contents"),
            synci18n: true,
            type: "repeater",
            attrs: {
              sortable: true,
              collapsable: true,
              collapsedLabel: (item) =>
                this.$t("collapsedLabel").replace(
                  "{0}",
                  item.tCode || item.polimorphic_c
                ),
              // translatable: true,
              fields: {
                group_1: [
                  { label: this.$t("title"), value: "title", class: "col-md-6" },
                  {
                    label: this.$t("date"),
                    value: "date",
                    type: "date",
                    class: "col-md-4",
                  },
                  {
                    value: "hash",
                    class: "col-md-6",
                    vVisible: ({ model }) => model.random,
                  },
                  { value: "random", type: "switch", class: "col-md-6" },
                ],
                group_2: [
                  { label: this.$t("title"), value: "title", class: "col-md-6" },
                  { value: "date", type: "date", class: "col-md-4" },
                  { value: "casual", type: "switch", class: "col-md-2" },
                ],
                group_3: {
                  name: this.$t("customName"),
                  preview:
                    "https://blog.openreplay.com/c4052718994cbc8eb6dac8c89c23ba06/img3.gif",
                  description: this.$t("group3Description"),
                  tCode: "stocazzo",
                  tCodeField: "polimorphic_c",
                  fields: [
                    { label: this.$t("title"), value: "title", class: "col-md-6" },
                    { label: this.$t("subtitle"), value: "subtitle", class: "col-md-6" },
                    { label: this.$t("content"), value: "content", type: "editor" },
                  ],
                },
              },
            },
          },
          {
            // group: "Tabs",
            tabs: {
              tab_1: {
                tab: { label: this.$t("testTab") },
                fields: [
                  { value: "meta.key1", synci18n: true },
                  { value: "meta.key2", synci18n: true, type: "textarea" },
                  {
                    tabs: {
                      in_tab1: [{ value: "meta.key3", synci18n: true }],
                      in_tab2: {
                        tab: { label: "Tab inside tab"},
                        fields: [{ value: "meta.key4", synci18n: true }],
                      },
                    },
                  },
                ],
              },
              tab_2: [{ value: "meta.key2", synci18n: true }],
            },
          },
          {
            // group: "Tabs",
            group: "Group inside group",
            fields: [{
              group: "Group inside group",
              fields: [{ value: "meta.group_inside_group" }]
            }]
          },
          { label: this.$t("content"), value: "content", type: "editor" },
          { label: "Color", value: "meta.color", synci18n: true, type: "color" },
          {
            group: "Seo",
            fields: [
              {
                label: this.$t("title"),
                value: "title",
                class: "col-md-6",
                onChange: ({ val, model, conf }) =>
                  setPointed(
                    model,
                    conf.value.replace("title", "permalink"),
                    slugify(val)
                  ),
              },
              { value: "permalink", class: "col-md-6" },
              { label: this.$t("description"), value: "description", type: "textarea" },
              { type: "seoPreview" },
            ],
          },
        ],
        sidenav: [
          {
            label: this.$t("categories"),
            value: "categories",
            synci18n: true,
            type: "m2m",
            attrs: { endpoint: "api/camomilla/categories", itemText: "title" },
          },
          {
            group: "Status",
            fields: [
              {
                label: this.$t("status.trash"),
                value: "trash",
                type: "switch",
                synci18n: true,
              },
              {
                value: "status",
                vShow: ({ model }) => !model.trash,
                type: "select",
                attrs: {
                  items: [
                    { label: this.$t("status.draft"), text: "Draft", value: "DRF" },
                    {
                      label: this.$t("status.published"),
                      text: "Published",
                      value: "PUB",
                    },
                    { label: this.$t("status.trash"), text: "Trash", value: "TRS" },
                  ],
                },
                synci18n: true,
              },
              {
                value: this.$t("pubblicationDate"),
                accessor: {
                  set: ({ val }) => val && new Date(val).toISOString(),
                },
                type: "date",
                synci18n: true,
              },
            ],
          },
          { value: this.$t("highlight_image"), type: "enhancedMedia", synci18n: true },
        ],
      };
    },
  },
};
</script>
