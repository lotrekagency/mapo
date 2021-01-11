<template>
  <div class="sidebar__link__wrapper">
    <NuxtLink
      class="sidebar__link"
      :to="link"
    >
      {{ title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__link {
    display: block;
    width: 100%;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: white;
    background: rgba(0,0,0,0);
    transition: all linear .25s;
    &:hover {
      background: rgba(0,0,0,0.25);
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
