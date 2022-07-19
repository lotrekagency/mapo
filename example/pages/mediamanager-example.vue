<template>
  <div class="d-flex flex-column fill-height">
    <MediaManager class="transparent" />
    <v-spacer></v-spacer>
    <div class="d-flex justify-center">
      <media-manager-dialog v-model="dialog" select="multi">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="red lighten-2 mb-4" v-bind="attrs" v-on="on">
            {{ $t("openDialog") }}
          </v-btn>
        </template>
      </media-manager-dialog>
    </div>
  </div>
</template>

<i18n lang="yaml">
en:
  openDialog: "Open media dialog"
it:
  openDialog: "Apri modale media"
</i18n>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  }
};
</script>
