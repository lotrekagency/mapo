<script setup lang="ts">
const { myLayer } = useAppConfig();
const { x, y } = useMouse();
</script>

<template>
  <div>
    <h1>Hello World UI!</h1>
    <pre>{{ myLayer }}</pre>
    <p>Mouse position UI is at: {{ x }}, {{ y }}</p>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: blue;
}
</style>
