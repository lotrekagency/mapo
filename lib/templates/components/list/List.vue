<template>
  <div class="list__outer">
    <ListHead />
    <ListTabs />

    <div class="list__pretabs">
      <ListActions />
      <div class="list__counter">
        6 elementi
      </div>
    </div>

    <div class="list__core">
      <ListTable />
    </div>

  </div>
</template>

<style lang="scss" scoped>
@import '~bossamodule/assets/variables.scss';

.list {
  &__outer {
    color: $b-1;
    margin: 2rem;
  }
  &__pretabs {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__counter {
    margin-left: 1rem;
    font-size: 0.9rem;
  }
}
</style>

<script>

export default {
  data() {
    return {
      
    };
  },
  props: {

  },
  methods: {
    
  },
  mounted: function () {
    
  },
};
</script>
