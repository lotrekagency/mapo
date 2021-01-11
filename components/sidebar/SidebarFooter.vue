<template>
  <div class="sidebar__ender">
    
    <NuxtLink
      class="sidebar__ender__item"
      to="/utenti"
    >
      Utenti
    </NuxtLink>
    <NuxtLink
      class="sidebar__ender__item"
      to="/impostazioni"
    >
      Impostazioni
    </NuxtLink>
    <NuxtLink
      class="sidebar__ender__item sidebar__ender__item--logout"
      to="/logout"
    >
      Logout
    </NuxtLink>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  &__ender {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    &__item {
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
      &--logout {
        background: rgba(0,0,0,0.15);
      }
    }
  }
}
</style>
