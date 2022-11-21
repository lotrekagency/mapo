import colors from "vuetify/es5/util/colors";
import { it, en } from "vuetify/lib/locale";

export default {
    customVariables: ["@mapomodule/uikit/assets/variables.scss"],
    theme: {
        options: { customProperties: true },
        dark: true,
        themes: {
            dark: {
                primary: "#51beaa",
                accent: colors.grey.darken3,
                secondary: colors.indigo.darken2,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: "#FF5252",
                success: colors.green.accent3,
            },
            light: {
                primary: "#51beaa",
                accent: colors.indigo.accent1,
                secondary: colors.indigo.darken2,
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
    treeShake: false,
};
