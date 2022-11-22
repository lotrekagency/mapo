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
        langDir: __dirname + "/translations/",
        vueI18nLoader: true,
    },
};
