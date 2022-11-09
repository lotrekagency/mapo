<template>
  <div class="d-flex flex-column fill-height">
    <MediaManager />
    <media-manager-dialog v-model="dialog" select="multi">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red"
          v-bind="attrs"
          v-on="on"
          fixed
          bottom
          right
          fab
          icon
          dark
          small
        >
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>
      </template>
    </media-manager-dialog>
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
