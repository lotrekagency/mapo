<template>
  <div class="sidebar__ender">
    
    <NuxtLink
      class="sidebar__ender__item"
      :to="localePath('/users')"
    >
      <v-icon class="sidebar__ender__icon">mdi-account-group</v-icon>
      {{ $t('sidebar_users') }}
    </NuxtLink>
    <NuxtLink
      class="sidebar__ender__item"
      :to="localePath('/settings')"
      
    >
      <v-icon class="sidebar__ender__icon">mdi-cog</v-icon>
      {{ $t('sidebar_settings') }}
    </NuxtLink>
    <logout-button class="sidebar__ender__item sidebar__ender__item--logout" />
  </div>
</template>

<style lang="scss" scoped>
@import '~mapomodule/assets/variables.scss';

.sidebar {
  &__ender {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    &__icon {
      font-size: 1rem;
      margin-right: 0.5rem;
    }
    &__item {
      display: block;
      width: 100%;
      padding: 0.5rem 1rem;
      text-decoration: none;
      color: white;
      background: $b-2;
      transition: all linear .25s;
      border-radius: 0;
      &:hover {
        background: rgba($b-2,0.25);
      }
      &--logout {
        background: $black!important;
        &:hover {
          background: rgba($black,0.25)!important;
        }
      }
    }
  }
}
</style>
