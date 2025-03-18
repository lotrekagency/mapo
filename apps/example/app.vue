<template>
  <div>
    {{ $t('mapo.apply') }}
    <HelloWorldCore />
    <HelloWorldUI />
    <ButtonUI />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { x, y } = useMouse();
</script>



