<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <List
          show-select
          lookup="name"
          :headers="headers"
          :editFields="editFields"
          :filters="availableFilters"
          multi-sort
          can-select-all
          searchable
          :data.sync="desserts"
          :actions="[]"
          drag-reorder
        >
        </List>
        <br />
        <h3>Two way binding test</h3>
        <pre>{{ desserts }}</pre>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n lang="yaml">
en:
  dessert: "Dessert (100g serving)"
  protein: "Protein (g)"
  glutenFree: "Gluten Free"
  actions: "Actions"
  nameRequired: "Name is required"
  name: "Name"
it:
  dessert: "Dessert (100g)"
  protein: "Proteine (g)"
  glutenFree: "Senza glutine"
  actions: "Azioni"
  nameRequired: "Il nome è obbligatorio"
  name: "Nome"
</i18n>

<script>
export default {
  data() {
    return {
      desserts: [
        {
          name: "Frozen Yogurt",
          protein: 4.0,
          glutenfree: true,
        },
        {
          name: "Ice cream sandwich",
          protein: 4.3,
          glutenfree: false,
        },
        {
          name: "Eclair",
          protein: 6.0,
          glutenfree: false,
        },
        {
          name: "Jelly bean",
          protein: 0.0,
          glutenfree: true,
        },
        {
          name: "Lollipop",
          protein: 0,
          glutenfree: true,
        },
        {
          name: "KitKat",
          protein: 7,
          glutenfree: false,
        },
        {
          name: "KitKat2",
          protein: 77,
          glutenfree: false,
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: this.$t("dessert"),
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: this.$t("protein"), value: "protein" },
        { text: this.$t("glutenFree"), value: "glutenfree" },
        { text: this.$t("actions"), value: "actions", sortable: false },
      ];
    },
    editFields() {
      return [
        {
          label: this.$t("name"),
          attrs: { rules: [(v) => !!v || this.$t("nameRequired")] },
          value: "name",
        },
        { label: this.$t("protein"), value: "protein" },
      ];
    },
    availableFilters() {
      return [
        {
          text: this.$t("glutenFree"),
          value: "glutenfree",
          choices: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
        },
      ]
    },
  },
};
</script>
