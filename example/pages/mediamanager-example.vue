<template>
  <div class="fill-height">
    <div class="d-flex align-center">
      <media-manager-dialog
        v-model="dialog"
        :dark="darkTheme"
        :light="!darkTheme"
        select="multi"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2 mb-4" dark v-bind="attrs" v-on="on">
            Open media dialog
          </v-btn>
        </template>
      </media-manager-dialog>
      <v-spacer></v-spacer>
      <v-switch
        v-model="darkTheme"
        :label="`Dialog dark theme: ${darkTheme.toString()}`"
        light
        inset
      ></v-switch>
    </div>

    <MediaManager elevation="0" class="transparent" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
      darkTheme: true,
    };
  },
};
</script>
