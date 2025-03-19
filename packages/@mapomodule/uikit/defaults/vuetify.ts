import colors from "vuetify/util/colors";
import { en, it } from "vuetify/locale";
import type { NuxtI18nOptions } from "@nuxtjs/i18n";

export default {
  customVariables: ["@mapomodule/uikit/assets/variables.scss"],
  theme: {
    options: { customProperties: true },
    dark: true,
    themes: {
      dark: {
        primary: colors.lime.darken2,
        secondary: colors.lightGreen.darken4,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: "#FF5252",
        success: colors.green.accent3,
      },
      light: {
        primary: colors.lime.darken2,
        accent: colors.lightGreen.accent4,
        secondary: colors.lightGreen.darken4,
        info: colors.teal.lighten1,
        warning: colors.amber.base,
        error: "#FF5252",
        success: colors.green.accent3,
      },
    },
  },
  lang: {
    locales: { en, it },
  },
  treeShake: true,
};
