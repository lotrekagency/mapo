import { defineNuxtModule, addPlugin, createResolver, installModule } from '@nuxt/kit'

// Module options TypeScript interface definition
export interface ModuleOptions {
  [key: string]: {
    location: string
    configuration: Record<string, unknown>
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@mapomodule/integrations',
    configKey: 'integrations',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    for (const name in options) {
      installModule(options[name as keyof ModuleOptions].location, { ...options[name].configuration })
    }
  },
})
