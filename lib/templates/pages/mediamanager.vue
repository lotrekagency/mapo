<template>
  <div>
    <media-manager-dialog v-model="dialog">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="red lighten-2 mb-4" dark v-bind="attrs" v-on="on">
          Open media dialog
        </v-btn>
      </template>
    </media-manager-dialog>

    <MediaManager />
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
};
</script>
