<template>
  <v-snackbar v-model="snackbar">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="green" text v-bind="attrs" @click="closeSnack">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SnackBar",
  data: () => ({
    snackbar: false,
    message: null,
    color: "green",
  }),
  computed: {
    ...mapGetters({
      snackbarMessage: "mapo/app/snackbar",
    }),
  },
  methods: {
    closeSnack() {
      this.snackbar = false;
      this.message = null;
      this.color = "green";
    },
  },

  watch: {
    snackbar(val) {
      if (!val) {
        this.$mapo.$snack.close();
      }
    },
    snackbarMessage(val) {
      if (val) {
        this.snackbar = true;
        this.message = val.message;
        this.color = val.color || this.color;
      } else {
        this.closeSnack();
      }
    },
  },
};
</script>
