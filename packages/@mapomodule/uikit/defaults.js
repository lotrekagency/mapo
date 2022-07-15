import colors from "vuetify/es5/util/colors";

export default {
    customVariables: ["@mapomodule/uikit/assets/variables.scss"],
    theme: {
        dark: true,
        themes: {
            dark: {
                primary: "#51beaa",
                accent: colors.grey.darken3,
                secondary: colors.amber.darken3,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: "#FF5252",
                success: colors.green.accent3,
            },
            light: {
                primary: "#51beaa",
                accent: colors.indigo.accent1,
                secondary: colors.amber.accent2,
                info: colors.teal.lighten1,
                warning: colors.amber.base,
                error: "#FF5252",
                success: colors.green.accent3,
            },
        },
    },
    treeShake: false,
    i18n: {
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            onlyOnRoot: true,
        },
        locales: [
            {
                code: "en-US",
                name: "English",
                file: "en-US.js",
            },
            {
                code: "it-IT",
                name: "Italiano",
                file: "it-IT.js",
            },
        ],
        lazy: true,
        langDir: __dirname + "/translations/",
        defaultLocale: "en",
        strategy: "no_prefix",
    },
};
