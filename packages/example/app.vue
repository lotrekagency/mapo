<script setup lang="ts">
const { x, y } = useMouse();
</script>

<template>
  <div>
    <HelloWorldUI />
    <HelloWorldCore />
    <p>Mouse position Example is at: {{ x }}, {{ y }}</p>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
  </div>
</template>

<style scoped lang="scss">
p {
  color: green;
}
</style>
