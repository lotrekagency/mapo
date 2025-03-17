<script setup lang="ts">
const { x, y } = useMouse();
</script>

<template>
  <div>
    <h1>Hello World UI!</h1>
    <p>Mouse position UI is at: {{ x }}, {{ y }}</p>
  </div>
</template>

<style scoped>
h1 {
  color: blue;
}

p {
  color: red;
}
</style>
