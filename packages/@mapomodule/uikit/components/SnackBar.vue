<template>
  <v-snackbar v-model="snackbar">
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn :color="color" text v-bind="attrs" @click="closeSnack">
        {{ $t("mapo.close") }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapGetters } from "vuex";
/**
 * @vuese
 * This component is embedded in the default layout.
 * It remains hidden watching for changes in vuex status 'mapo/app/snackbar'.
 * If a message is gained from the vuex getter, it shows up revealing the message.<br><br>
 * To open the snakbar from wherever you want, you can refer to [this.$mapo.$snack.open](/core/#snack);
 */
export default {
  name: "SnackBar",
  data: () => ({
    snackbar: false,
    message: null,
    color: "primary",
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
        this.color = val.color || "primary";
      } else {
        this.closeSnack();
      }
    },
  },
};
</script>

<docs>
### Example usage:

```js
this.$mapo.$snack.open({
  message: "Only one file can be uploaded at a time..",
  color: "error",
});
```

</docs>
