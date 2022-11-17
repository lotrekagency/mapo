import vuetify from '@mapomodule/uikit/defaults/vuetify'
import i18n from '@mapomodule/uikit/defaults/i18n'

export default {
  store: true,
  components: true,
  router: {
    base: process.env.PANEL_URL || '/',
  },
  build: {
    transpile: ["mapomodule"],
  },
  head: {
    titleTemplate: '%s - mapo',
    title: '🥭 mapo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/mapo/favicon.ico' }
    ]
  },
  i18n,
  vuetify,
  axios: {
    withCredentials: true,
  },

  extendPlugins(plugins) {
    const index = plugins.findIndex(
      ({ src }) => src.endsWith('mapo/mapo.js')
    )
    const mapoPlugin = plugins[index]
    if (mapoPlugin) {
      plugins.splice(index, 1)
      plugins.push(mapoPlugin)
    }
    return plugins
  }
}
