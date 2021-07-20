<template>
  <div class="list__tabs">
    <div class="list__tabs__item" v-bind:class="{ active: tabActive==1 }">Tutto (6)</div>
    <div class="list__tabs__item" v-bind:class="{ active: tabActive==2 }">Pubblicato (12)</div>
    <div class="list__tabs__item" v-bind:class="{ active: tabActive==3 }">Cestinato (2)</div>
  </div>
</template>

<style lang="scss" scoped>
@import "~mapomodule/assets/variables.scss";

.list {
  &__tabs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 1rem;
    &__item {
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
  name: "ListTabs",
  data() {
    return {};
  },
  props: {
    tabActive: Number
  },
  mounted: function () {
    document.querySelectorAll('.list__tabs__item').forEach(element => {
      element.addEventListener('click', () => {
        if(!element.classList.contains('active')) {
          document.querySelector('.list__tabs__item.active').classList.remove('active')
          element.classList.add('active')
        }
      })
    });
  },
};
</script>
