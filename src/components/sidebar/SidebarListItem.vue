<template>
  <div class="sidebar__link__wrapper">
    <NuxtLink
      class="sidebar__link"
      :to="link"
    >
      <v-icon v-if="icon" class="sidebar__link__icon">{{icon}}</v-icon>
      {{ title }}
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
@import '~assets/variables.scss';

.sidebar {
  &__link {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    padding: 0.5rem 1rem;
    text-decoration: none;
    color: $white;
    background: rgba(0,0,0,0);
    transition: all linear .25s;
    text-transform: capitalize;
    &:hover {
      background: rgba(0,0,0,0.25);
    }
    &__icon {
      margin-right: 0.5rem;
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
    title: String,
    icon: String
  },
  mounted: function () {
  },
};
</script>
