<template>
  <div>
    <HelloWorldCore />
    <HelloWorldUI />
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<script setup lang="ts">
const { x, y } = useMouse();

console.log("Mapomodule composable from core", { x, y })
</script>



