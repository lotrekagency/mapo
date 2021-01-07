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
  }
}
</style>
