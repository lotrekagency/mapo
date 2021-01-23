<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">
        <SimpleTable
          :headers="simpleTable.headers"
          :itemsList="simpleTable.items"
        />

        <hr />

        <v-btn
          class="elevation-0 rounded-0"
          color="primary"
          nuxt
          to="/inspire"
          style="margin-top: 1rem"
        >
          Continue to inspire page
        </v-btn>
      </v-col>
    </v-row>
    <hr>
    <List :pageTitle='pageTitle' />
    <TinyMce v-model="input1" />
  </div>
</template>

<script>
import Logo from "~mapomodule/components/Logo.vue";
import VuetifyLogo from "~mapomodule/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  data() {
    return {
      input1: "Bella tiNy",
      pageTitle: 'Homepage',
      simpleTable: {
        headers: [
          {
            text: 'First column'
          },
          {
            text: 'Second column'
          }
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
