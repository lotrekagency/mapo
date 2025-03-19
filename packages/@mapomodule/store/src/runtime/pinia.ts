import { defineNuxtPlugin } from '#app';
import { createPinia, setActivePinia } from 'pinia';

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  setActivePinia(pinia);

  nuxtApp.vueApp.use(pinia);
});
