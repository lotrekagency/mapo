# mapomodule ![npm](https://img.shields.io/npm/v/mapomodule?style=flat-square) ![GitHub](https://img.shields.io/github/license/lotrekagency/mapo?style=flat-square)

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

📑 &nbsp;Read more from the [documentation](https://lotrekagency.github.io).

## How to contribute

1. Clone this repository
2. Install dependencies using `yarn bootstrap`
3. Start development server using `yarn dev`


Feel free to contribute to the project by making a [Pull Request](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

Here's an example for a branch naming:

`feature/<branch name>`

Once you're done with your work and are ready to make a Pull Request, set the reviewers to 
Gabriele Baldi (bnznamco) and Andrea Morosi (andreamorosi).


### Documenting components
Always write some documentation regarding the components you're developing.
Our documentation is generated directly from code thanks to [@Vuepress](https://vuepress.vuejs.org/), [@Vuese](https://vuese.org/) and [@jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown#readme).

1. Generate doc `yarn doc:gen`
2. Preview vuepress doc `yarn doc:dev`

