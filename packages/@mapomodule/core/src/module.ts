import { defineNuxtModule, addPlugin, addImportsDir, createResolver } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mapomodule/core',
    configKey: '@mapomodule/core',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    console.log('>>>>>>>>>>', _nuxt)

    addImportsDir(resolver.resolve('./runtime/api-utils'))

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugins/core'))
  },
})
