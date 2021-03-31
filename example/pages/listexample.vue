<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <List
          light
          show-select
          :headers="headers"
          :editFields="editFields"
          endpoint="api/camomilla/articles"
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
          text: "ID",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "Title", value: "title" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editFields: [
        { attrs: { rules:[v => !!v || 'Title is required'] }, value: "title" },
        { attrs: { rules:[v => !!v || 'Permalink is required'] }, value: "permalink" },
        { attrs: { rules:[v => !!v || 'Identifier is required'] }, value: "identifier" },
      ],

    };
  },
};
</script>
