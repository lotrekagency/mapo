(window.webpackJsonp=window.webpackJsonp||[]).push([[142],{612:function(t,a,s){"use strict";s.r(a);var n=s(1),e=Object(n.a)({},(function(){var t=this,a=t._self._c;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"translations"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#translations"}},[t._v("#")]),t._v(" Translations")]),t._v(" "),a("p",[t._v("Mapo Translations' are managed by "),a("a",{attrs:{href:"https://i18n.nuxtjs.org/",target:"_blank",rel:"noopener noreferrer"}},[a("code",[t._v("@nuxtjs/i18n")]),a("OutboundLink")],1),t._v(" and all translation files are saved in "),a("code",[t._v("@mapomodule/uikit/translations")]),t._v(". Currently only english and italian are supported but feel free to add new languages with a pull request!")]),t._v(" "),a("p",[t._v("If no "),a("code",[t._v("i18n")]),t._v(" option is included in your project Mapo will automatically add its translations in lazy mode, but if you want to integrate yours you need to explicitly set an "),a("code",[t._v("i18n")]),t._v(" option, and create your translations files, integratings Mapo's ones, like in this example:")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// yourProject/translations/en.js")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" en "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"@mapomodule/uikit/translations/en-US"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("yourCustomString")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Good morning"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("...")]),t._v("en "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// Import mapo translations")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("Translations in data props")]),t._v(" "),a("p",[t._v("A common practice is to set lists and detail configurations inside "),a("code",[t._v("data()")]),t._v(" components' property, but "),a("code",[t._v("$t")]),t._v(" is called in those only once (at mount time), so if language is changed labels aren't translated. A solution to this is to "),a("strong",[t._v("set those configurations as computed properties")]),t._v(". You can find an example in Mapo's example project.")])]),t._v(" "),a("h3",{attrs:{id:"translating-sidebar-labels"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#translating-sidebar-labels"}},[t._v("#")]),t._v(" Translating sidebar labels")]),t._v(" "),a("p",[t._v("To translate a sidebar label in pages' "),a("code",[t._v("meta")]),t._v(" you can pass an object with a "),a("code",[t._v("translate")]),t._v(" attribute, containing the key of the translation.")]),t._v(" "),a("div",{staticClass:"language-js extra-class"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("default")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("meta")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("label")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),a("span",{pre:!0,attrs:{class:"token literal-property property"}},[t._v("translate")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(":")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"yourTranslationKey"')]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// ...")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[t._v("Per-component translations")]),t._v(" "),a("p",[t._v("Your translation cannot be inside "),a("a",{attrs:{href:"https://i18n.nuxtjs.org/per-component-translations",target:"_blank",rel:"noopener noreferrer"}},[t._v("component translations"),a("OutboundLink")],1),t._v(" because these ones are loaded only after the component is mounted, while the translation is needed immediately, in every page.")])])])}),[],!1,null,null,null);a.default=e.exports}}]);