# mapomodule

## Setup
Add `mapomodule` dependency to your project
```sh
yarn add --dev mapomodule # or npm install --save-dev mapomodule
```
Add mapomodule to the buildModules section of nuxt.config.js
```js
{
  buildModules: [
    // Simple usage
    'mapomodule',

    // With options
    ['mapomodule', { /* module options */ }]
  ]
}
```
 
 You can add options also from top level nuxt.config.js

```js
{
  buildModules: [
    'mapomodule'
  ],
  mapo: {
    /* module options */
  }
}
```
## Features

- Exposes [`$mapo`](https://lotrekagency.github.io/mapo/core/) core sevices to provide set of utilities.
- Injects mapo [`components`](https://lotrekagency.github.io/mapo/components/) in the default nuxt component discovery.
- Adds meta information to router module from nuxt pages.


## URLs and accessing resources
Here's an example featuring a SCSS import in a component file:

```scss
@import "@mapomodule/uikit/assets/custom-style.scss";
```

* * * 
This documentation was generated thanks to [@Vuepress](https://vuepress.vuejs.org/), [@Vuese](https://vuese.org/) and [@jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown#readme) .
