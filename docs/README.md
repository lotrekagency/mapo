# Mapo

## Getting Started

### Setup
Add mapomodule dependency to your project:

```sh
$ yarn add https://github.com/lotrekagency/mapo.git#master
```

Then add it to the modules section in your nuxt.config.js:

```js
export default {
  modules: ['mapomodule']
}
```


## URLs and accessing resources
We are using an alias (~mapomodule) to access resources and files.
Here's an example featuring a SCSS import in a component file:

```scss
@import "~mapomodule/assets/custom-style.scss";
```


## Styling
Import the variables, mixins and other scss files 
in your components and templates when needed.


## External resources

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request
