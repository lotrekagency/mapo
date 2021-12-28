<template>
  <div class="d-flex flex-column fill-height">
    <MediaManager noFolders class="transparent" />
    <v-spacer></v-spacer>
    <div class="d-flex justify-center">
      <media-manager-dialog
        v-model="dialog"
        :dark="darkTheme"
        :light="!darkTheme"
        select="multi"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2 mb-4" v-bind="attrs" v-on="on">
            Open media dialog
          </v-btn>
        </template>
      </media-manager-dialog>
    </div>
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
