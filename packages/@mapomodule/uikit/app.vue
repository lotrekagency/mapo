<template>
  {{ titleCase("ui kit")}}
  <ButtonUI>
    <span>UI KIT BUTTON</span>
  </ButtonUI>
  <HelloWorldUI />
</template>

<script setup lang="ts">
import { titleCase } from '@mapomodule/utils/helpers/formatters';

</script>
