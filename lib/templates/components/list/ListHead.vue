<template>
  <div class="list__head">
    <h2 class="list__head__title display-1">Title</h2>
    <v-btn class="rounded-0 elevation-0" color="primary">Aggiungi nuovo</v-btn>
  </div>
</template>

<style lang="scss" scoped>
@import "~bossamodule/assets/variables.scss";

.list {
  &__head {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin-bottom: 4rem;
    &__title {
      margin-right: 2rem;
    }
  }
}
</style>

<script>
export default {
  data() {
    return {};
  },
  props: {},
  methods: {},
  mounted: function () {},
};
</script>
