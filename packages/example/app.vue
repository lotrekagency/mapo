<script setup lang="ts">
const { x, y } = useMouse();
</script>

<template>
  <v-app>
    <div>
      <HelloWorldUI />
      <HelloWorldCore />
      <p>Mouse position Example is at: {{ x }}, {{ y }}</p>
      <NuxtRouteAnnouncer />
      <NuxtWelcome />
    </div>
  </v-app>
</template>

<style scoped lang="scss">
p {
  color: green;
}
</style>
