# Translations

Mapo Translations' are managed by [`@nuxtjs/i18n`](https://i18n.nuxtjs.org/) and all translation files are saved in `@mapomodule/uikit/translations`. Currently only english and italian are supported but feel free to add new languages with a pull request!

If no `i18n` option is included in your project Mapo will automatically add its translations in lazy mode, but if you want to integrate yours you need to explicitly set an `i18n` option, and create your translations files, integratings Mapo's ones, like in this example:
```js
// yourProject/translations/en.js

import en from "@mapomodule/uikit/translations/en-US";

export default {
  yourCustomString: "Good morning",

  ...en // Import mapo translations
};
```

::: warning Translations in data props 
A common practice is to set lists and detail configurations inside `data()` components' property, but `$t` is called in those only once (at mount time), so if language is changed labels aren't translated. A solution to this is to **set those configurations as computed properties**. You can find an example in Mapo's example project.
:::


### Translating sidebar labels
To translate a sidebar label in pages' `meta` you can pass an object with a `translate` attribute, containing the key of the translation.
```js
export default {
  meta: { label: {
    translate: "yourTranslationKey"
  }},
  // ...
}
```

::: warning Per-component translations 
Your translation cannot be inside [component translations](https://i18n.nuxtjs.org/per-component-translations) because these ones are loaded only after the component is mounted, while the translation is needed immediately, in every page.
:::




