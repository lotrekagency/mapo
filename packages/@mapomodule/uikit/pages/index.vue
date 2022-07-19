<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="12">
      <div class="mapo-info">
        <h1 id="mapo">
          <code>mapomodule {{ version }}</code>
        </h1>
        <br>
        <br>
        <code>{{ $t('mapo.index.welcomeMessage') }}</code>
        <br>
        <br>
        <code>
          ## TODO INSERT HERE A LITTLE TUTORIAL.
        </code>
      </div>
    </v-col>
  </v-row>
</template>

<style scoped>
.mapo-info {
  border-radius: 8px;
  margin: 10px 5%;
  padding: 10px;
}
</style>
<script>
import { version } from "mapomodule/package.json";
export default {
  data: () => ({
    version: version
  }),
};
</script>
