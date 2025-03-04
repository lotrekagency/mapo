<template>
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="12">
        <h1 class="display-1">{{ $t("nested") }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<i18n lang="yaml">
en:
  nested: "This is a nested/example page"
it:
  nested: "Questa è la pagina Nested/Example"
</i18n>

<script>
export default {
  data() {
    return {};
  },
};
</script>
