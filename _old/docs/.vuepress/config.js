const sidebar = require('./compose-sidenav')
const path = require('path')

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
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }],
    ['link', { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@mdi/font@4.x/css/materialdesignicons.min.css' }],
  ],
  chainWebpack: config => {
    config.module.rule('images').use('url-loader').options({ esModule: false });
    config.merge({ module: { rules: [{ resourceQuery: /blockType=docs/, loader: require('@mapomodule/utils/loaders/dummy-loader.js') }] } });
    // This fixes an incompatibility with vuetify sass loader
    for (const lang of ["sass", "scss"]) {
        for (const name of ["modules", "normal"]) {
            const rule = config.module.rule(lang).oneOf(name);
            rule.uses.delete("sass-loader");
            rule
                .use("sass-loader")
                .loader("sass-loader")
                .options({
                    implementation: require("sass"),
                    sassOptions: {
                        indentedSyntax: lang === "sass"
                    }
                });
        }
    }
  },
  plugins: [
    require('./global-const-plugin.js'),
    [
      'demo-code', {
        showText: '🧐 show more code..',
        hideText: '😱 WTF! Show less!',
        onlineBtns: { codepen: false, jsfiddle: false, codesandbox: false, },
      }
    ],
    [
      '@vuepress/register-components', {
        componentsDir: path.resolve(__dirname, '../../packages/@mapomodule/uikit/components/'),
        getComponentName: file => file.split("/").pop()
      }
    ]
  ],
};
