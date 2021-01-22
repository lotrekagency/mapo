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
    <TinyMce v-model="input1" />
    <v-btn @click.native="log(input1)" class="logout__btn">PT </v-btn>
  </div>
</template>

<script>
import Logo from "~bossamodule/components/Logo.vue";
import VuetifyLogo from "~bossamodule/components/VuetifyLogo.vue";

export default {
  components: {
    Logo,
    VuetifyLogo,
  },
  methods: {
    log : (item) => console.log(item)
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
