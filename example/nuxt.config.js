export default {
    modules: ["mapomodule"],
    mapo: {
        integrations: {
            camomilla: {
                location: "@mapomodule/mapo-integrations-camomilla",
                configuration: {
                    api: {
                        target: "http://localhost:8000",
                        syncCamomillaSession: true,
                        headers: {
                            "x-Forwarded-Host": "localhost",
                        },
                    },
                },
            },
        },
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
        vueI18nLoader: true,
        lazy: true,
        langDir: __dirname + "/translations/",
        defaultLocale: "en",
        strategy: "no_prefix",
    },
};
