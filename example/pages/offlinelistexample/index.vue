<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <List
          show-select
          :headers="headers"
          :editFields="editFields"
          :filters="availableFilters"
          endpoint="api/camomilla/articles"
          navigable
          addItem
          multi-sort
          can-select-all
          searchable
          :items="desserts"
        >
        </List>
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
          text: 'Dessert (100g serving)',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Calories', value: 'calories' },
        { text: 'Fat (g)', value: 'fat' },
        { text: 'Carbs (g)', value: 'carbs' },
        { text: 'Protein (g)', value: 'protein' },
        { text: 'Iron (%)', value: 'iron' },
        { text: 'Gluten-Free', value: 'glutenfree' },
      ],
      editFields: [
        { attrs: { rules:[v => !!v || 'Name is required'] }, value: "name" },
      ],
      availableFilters: [
        {
          text: "Status",
          value: "status",
          choices: [
            { text: "Draft", value: "DRF" },
            { text: "Published", value: "PUB" },
            { text: "Trash", value: "TRS" },
          ],
        },
        {
          text: "Date",
          value: "date",
          datepicker: true
        },
      ],
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
          glutenfree: true,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
          glutenfree: false,
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: '7%',
          glutenfree: false,
        },
        {
          name: 'Jelly bean',
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: '0%',
          glutenfree: true,
        },
        {
          name: 'Lollipop',
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: '2%',
          glutenfree: true,
        },
        {
          name: 'KitKat',
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: '6%',
          glutenfree: false,
        },
      ],
    };
  },
};
</script>
