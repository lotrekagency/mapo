<script setup lang="ts">
const { x, y } = useMouse();
</script>

<template>
  <div>
    <h1>Hello World Core!</h1>

    <p>Mouse position is at: {{ x }}, {{ y }}</p>
  </div>
</template>

<style scoped>
h1 {
  color: red;
}
</style>
