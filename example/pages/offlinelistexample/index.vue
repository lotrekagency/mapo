<template>
  <div>
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
        >
        </List>
        <br>
        <h3> Two way binding test </h3>
        <pre>{{ desserts }}</pre>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Protein (g)", value: "protein" },
        { text: "Gluten-Free", value: "glutenfree" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editFields: [
        { attrs: { rules: [(v) => !!v || "Name is required"] }, value: "name" },
        { value: "protein" }
      ],
      availableFilters: [
        {
          text: "Gluten Free",
          value: "glutenfree",
          choices: [
            { text: "Yes", value: true },
            { text: "No", value: false },
          ],
        },
      ],
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
};
</script>
