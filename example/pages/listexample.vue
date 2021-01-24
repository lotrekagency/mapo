<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <List :pageTitle="pageTitle" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageTitle: "Homepage",
    };
  },
};
</script>
