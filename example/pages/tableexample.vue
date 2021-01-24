<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <SimpleTable
        :headers="simpleTable.headers"
        :itemsList="simpleTable.items"
      />
    </v-col>
  </v-row>
</template>



<script>
export default {
  data() {
    return {
      simpleTable: {
        headers: [
          {
            text: "First column",
          },
          {
            text: "Second column",
          },
        ],
        items: [
          {
            name: "Frozen Yogurt",
            value: 159,
          },
          {
            name: "Ice cream sandwich",
            value: 237,
          },
          {
            name: "Eclair",
            value: 262,
          },
        ],
      },
    };
  },
};
</script>
