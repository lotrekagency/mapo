export default defineNuxtPlugin(nuxtApp => {
  // called right before setting a new locale
  nuxtApp.hook('i18n:beforeLocaleSwitch', ({ oldLocale, newLocale, initialSetup, context }) => {
    // TODO: N.B. Review typing
    const locale =
      context.$i18n.locales.value.find((l) => l.code === newLocale) || {};
    const isRTL = locale.dir === "rtl";

    if (initialSetup) {
      context.$vuetify.rtl = isRTL;
    }

    context.$vuetify.locale.current.lang = locale.iso
      ? locale.iso.split("-")[0]
      : locale.code;
    context.$vuetify.locale.current.rtl = isRTL;
  })
})
