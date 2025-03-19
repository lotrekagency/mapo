import type { NuxtI18nOptions } from "@nuxtjs/i18n";

export default {
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: "i18n_redirected",
    redirectOn: "root",
  },
  locales: [
    {
      code: "en",
      name: "English",
      file: "en-US.ts",
      iso: "en-US",
    },
    {
      code: "it",
      name: "Italiano",
      file: "it-IT.ts",
      iso: "it-IT",
    },
  ],
  lazy: true,
  defaultLocale: "en",
  strategy: "no_prefix",
  // N.B Move to plugin (hook)
  // onBeforeLanguageSwitch: (oldLocale, newLocale, isInitialSetup, context) => {
  //   const locale =
  //       context.i18n.locales.find((l) => l.code === newLocale) || {};
  //   const isRTL = locale.dir === "rtl";
  //   if (isInitialSetup) {
  //       context.app.vuetify.preset.rtl = isRTL;
  //   }
  //   context.app.vuetify.framework.lang.current = locale.iso
  //       ? locale.iso.split("-")[0]
  //       : locale.code;
  //   context.app.vuetify.framework.rtl = isRTL;
  // },
} satisfies NuxtI18nOptions;
