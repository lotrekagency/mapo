<template>
  <div>
    Mapomodule
    <HelloWorldCore />
    <HelloWorldUI />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { x, y } = useMouse();
</script>
