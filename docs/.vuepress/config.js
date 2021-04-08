const path = require('path');

module.exports = {
    title: '🥭  Mapo Mapo',
    description: 'Just playing around',
    plugins: [
        // as we respect the naming convention vuepress-plugin-docgen you can juste docgen as name
        [ 'docgen',
          {
            componentsDir: path.join(__dirname,'../../lib/templates/components')
          }
        ]
      ]
  }