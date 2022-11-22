import colors from "vuetify/es5/util/colors";
import { it, en } from "vuetify/lib/locale";

export default {
    customVariables: ["@mapomodule/uikit/assets/variables.scss"],
    theme: {
        options: { customProperties: true },
        dark: true,
        themes: {
            dark: {
                primary: colors.lime.darken2,
                secondary: colors.lightGreen.darken4,
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
    treeShake: false,
};
