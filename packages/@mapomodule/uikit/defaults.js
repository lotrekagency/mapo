import colors from "vuetify/es5/util/colors";
import { it, en } from "vuetify/lib/locale";

export default {
    vuetify: {
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
        lang: {
            locales: { en, it },
        },
        treeShake: false,
    },
    i18n: {
        detectBrowserLanguage: {
            useCookie: true,
            cookieKey: "i18n_redirected",
            redirectOn: "root",
        },
        locales: [
            {
                code: "en",
                name: "English",
                file: "en-US.js",
                iso: "en-US",
            },
            {
                code: "it",
                name: "Italiano",
                file: "it-IT.js",
                iso: "it-IT",
            },
        ],
        lazy: true,
        langDir: __dirname + "/translations/",
        defaultLocale: "en",
        strategy: "no_prefix",
        onBeforeLanguageSwitch: (
            oldLocale,
            newLocale,
            isInitialSetup,
            context
        ) => {
            const locale =
                context.i18n.locales.find((l) => l.code === newLocale) || {};
            const isRTL = locale.dir === "rtl";
            if (isInitialSetup) {
                context.app.vuetify.preset.rtl = isRTL;
            }
            context.app.vuetify.framework.lang.current = locale.code;
            context.app.vuetify.framework.rtl = isRTL;
        },
    },
};
