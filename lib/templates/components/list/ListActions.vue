<template>
  <div class="list__actions">
    <div v-if="actionStatus" class="list__actions__group">
      <v-select label="Azioni di gruppo" outlined dense hide-details light></v-select>
      <v-btn class="rounded-0 elevation-0" outlined color="primary"
        >Applica</v-btn
      >
    </div>
    <div v-if="filterStatus" class="list__actions__group">
      <v-select label="Tutte le date" outlined dense hide-details light></v-select>
      <v-select label="Altri filtri" outlined dense hide-details light></v-select>
      <v-btn class="rounded-0 elevation-0" outlined color="primary"
        >Filtri</v-btn
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~bossamodule/assets/variables.scss";

.list {
  &__actions {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    &__group {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 2rem;
      & > * {
        margin-right: 0.5rem;
      }
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  props: {
    actionStatus: Boolean,
    filterStatus: Boolean
  }
};
</script>
