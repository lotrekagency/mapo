// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  build: {
    transpile: ['utils']
  },
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/test-utils",
    'vuetify-nuxt-module',
    "@nuxtjs/i18n",
  ],
  extends: ["@mapomodule/core"],
  // You can define all global settings here in the nuxt config.
  // Anyone extending this layer can override these options directly in their nuxt.config.
  vuetify: {
    moduleOptions: {},
    vuetifyOptions: {
      defaults: {
        VBtn: { variant: 'outlined' },
      }
    }
  },
  // When extending this layer, the i18n options specified here will be merged with the options in the extending configuration.
  // https://i18n.nuxtjs.org/docs/guide/layers
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', file: 'en-US.ts' },
      { code: 'it', iso: 'it-IT', file: 'it-IT.ts' },
    ],
    defaultLocale: 'en',
    lazy: true,
  },
})
