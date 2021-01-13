<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <SimpleTable
        :firstCol="table.firstColumn"
        :secondCol="table.secondColumn"
        :itemsList="table.items"
      />

      <v-btn color="primary" nuxt to="/inspire" style="margin-top:1rem"> Continue to inspire page </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import Logo from "~/components/Logo.vue";
import VuetifyLogo from "~/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data() {
    return {
      table: {
        firstColumn: "First",
        secondColumn: "Second",
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
