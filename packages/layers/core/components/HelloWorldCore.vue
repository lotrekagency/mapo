<script setup lang="ts">
const { myLayer } = useAppConfig();
const { x, y } = useMouse();
</script>

<template>
  <div>
    <h1>Hello World Core!</h1>

    <p>Mouse position is at: {{ x }}, {{ y }}</p>
  </div>
</template>

<style scoped lang="scss">
h1 {
  color: red;
}
</style>
