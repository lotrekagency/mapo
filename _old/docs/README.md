# mapomodule

## Setup
Add `mapomodule` dependency to your project
```sh
yarn add --dev mapomodule # or npm install --save-dev mapomodule
```
Add mapomodule to the modules section of nuxt.config.js
```js
{
  modules: [
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
  modules: [
    'mapomodule'
  ],
  mapo: {
    /* module options */
  }
}
```
## Integrations
This module was created to simplify the creation of administration panels.

Mapo was born as a frontend companion of the Camomilla project, but it was created with the aim of being agnostic about the backend. This is why we have enclosed the logic linked to the Camomilla project (camomilla-integrations) in a compatibility layer.

If you want to try the project with Camomilla as a backend, just follow the instructions you will find here. Otherwise you can write your backend with the framework and language you prefer. You can also write new integrations to connect Mapo to other existing api backends.

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
