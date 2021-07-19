const sidebar = require('./compose-sidenav')

module.exports = {
  title: "🥭  Mapo DOC",
  description: "Just playing around",
  base: '/mapo/',
  themeConfig: {
    nextLinks: false,
    prevLinks: false,
    smoothScroll: true,
    repo: 'lotrekagency/mapo',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
      { text: 'Core Services', link: '/core/' },


    ],
    sidebar: sidebar.getSidebar()
  },
  head: [
    ['link', { rel: "icon", href: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📑</text></svg>" }],
  ],
  chainWebpack: config => config.module.rule('images').use('url-loader').options({ esModule: false })
};
