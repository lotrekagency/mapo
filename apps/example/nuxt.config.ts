// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxt/test-utils'],
  extends: ['mapomodule'],
  vuetify: {
    vuetifyOptions: {
      defaults: {
        VBtn: { variant: 'tonal' },
      },
    },
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.ts' },
      { code: 'it', iso: 'it-IT', file: 'it-IT.ts' },
    ],
  },
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
  }
})