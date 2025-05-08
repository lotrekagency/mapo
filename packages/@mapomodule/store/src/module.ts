import { defineNuxtModule, addPlugin, createResolver, addImportsDir, addImports } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mapomodule/store',
    configKey: '@mapomodule/store',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    addPlugin(resolver.resolve('./runtime/plugins/pinia'), { append: true });
    addPlugin(resolver.resolve('./runtime/plugins/fetch'), { append: true });

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addImportsDir(resolver.resolve('./runtime/stores'))
    addImportsDir(resolver.resolve('./runtime/composables'))
  },
})
