import { defineNuxtConfig } from '@nuxt/bridge';

export default defineNuxtConfig({
    modules: [
        [
            "mapomodule",
            {
                content: {
                    languages: ['it', 'en']
                },
                integrations: {
                    camomilla: {
                        location: "@mapomodule/mapo-integrations-camomilla",
                        configuration: {
                            api: {
                                target: "http://localhost:8000",
                                syncCamomillaSession: true,
                                headers: {
                                    "x-Forwarded-Host": "localhost"
                                }
                            }
                        }
                    }
                },
                ui: {
                    panelName: "MAPO PANEL",
                    // panelLogo: "https://cdn.icon-icons.com/icons2/1954/PNG/512/orangefruit_122731.png",
                    forms: {
                        fields: {
                            attrs: {
                                vSwitch: {color: "secondary"}
                            }
                        },
                        groups: {
                            expanded: true
                        }
                    },
                    sidebar: {
                        spiderMenu: true
                    }
                }
            }
        ]
    ]
})
