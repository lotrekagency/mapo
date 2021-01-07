<template>
  <div class="sidebar__list__item__inner">
    <NuxtLink
      class="sidebar__list__item__link"
      :to="link"
    >
      {{ title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__list {
    &__item {
      
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
    link: String,
    title: String
  },
  mounted: function () {},
};
</script>
