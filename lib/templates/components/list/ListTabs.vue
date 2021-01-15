<template>
  <div class="list__tabs">
    <div class="list__tabs__item active">Tutto (6)</div>
    <div class="list__tabs__item">Pubblicato (12)</div>
    <div class="list__tabs__item">Cestinato (2)</div>
  </div>
</template>

<style lang="scss" scoped>
@import "~bossamodule/assets/variables.scss";

.list {
  &__tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    &__item {
      transition: all linear .25s;
      font-weight: 400;
      margin-right: 1rem;
      position: relative;
      cursor: pointer;
      &.active {
        font-weight: bold;
      }
      &:after {
        content: "";
        position: absolute;
        right: -0.5rem;
        top: 20%;
        width: 1px;
        height: 60%;
        background: $b-1;
      }
      &:last-child {
        &:after {
          display: none;
        }
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
  props: {},
  methods: {},
  mounted: function () {},
};
</script>
