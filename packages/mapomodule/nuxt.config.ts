// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    viewTransition: true,
    appManifest: false
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxt/test-utils', '@nuxt/eslint'],
  extends: [
    '@mapomodule/uikit'
  ],
})