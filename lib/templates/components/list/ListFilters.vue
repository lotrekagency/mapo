<template>
  <div class="list__actions__group">
    <v-select
      label="Tutte le date"
      outlined
      dense
      hide-details
      light
    ></v-select>
    <v-select label="Altri filtri" outlined dense hide-details light></v-select>
    <v-btn class="rounded-0 elevation-0 ml-2" outlined color="primary">Filtri</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    filters: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
