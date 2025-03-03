export default {
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
    langDir: __dirname + "/../translations/",
    defaultLocale: "en",
    strategy: "no_prefix",
    onBeforeLanguageSwitch: (oldLocale, newLocale, isInitialSetup, context) => {
        const locale =
            context.i18n.locales.find((l) => l.code === newLocale) || {};
        const isRTL = locale.dir === "rtl";
        if (isInitialSetup) {
            context.app.vuetify.preset.rtl = isRTL;
        }
        context.app.vuetify.framework.lang.current = locale.iso
            ? locale.iso.split("-")[0]
            : locale.code;
        context.app.vuetify.framework.rtl = isRTL;
    },
};
