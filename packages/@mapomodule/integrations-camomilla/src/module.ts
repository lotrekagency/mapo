import { defineNuxtModule, addPlugin, createResolver, addServerScanDir, addServerImportsDir, addServerHandler } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mapomodule/integrations-camomilla',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    const middlewareDir = resolver.resolve('./runtime/server/middleware')
    _nuxt.hook('nitro:config', (config) => {
      config.scanDirs = config.scanDirs || []
      config.scanDirs.push(middlewareDir)
    })

    addServerHandler({
      route: "/api/**",
      handler: resolver.resolve('./runtime/server/proxy')
    })
  },
})
