const sidebar = require('./compose-sidenav')

module.exports = {
  title: "🥭  Mapo Mapo",
  description: "Just playing around", 
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Components', link: '/components/' },
    ],
    sidebar: sidebar.getSidebar()
  }
};
