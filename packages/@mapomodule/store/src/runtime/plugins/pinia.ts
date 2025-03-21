import { defineNuxtPlugin } from '#app';
import { createPinia, setActivePinia } from 'pinia';
import { useUserStore } from '../stores/user';
import { useAppStore } from '../stores/app';
import { useMediaStore } from '../stores/media';

// The order must be set to 1 to ensure this plugin initializes before all.
// TODO: Refactor this code to encapsulate everything into a single package and abstract this large object into a dedicated .ts module.
export default defineNuxtPlugin({
  order: 1, setup: (nuxtApp) => {
    const pinia = createPinia();
    setActivePinia(pinia);

    nuxtApp.vueApp.use(pinia);

    return {
      provide: {
        store: {
          user: useUserStore(pinia),
          app: useAppStore(pinia),
          media: useMediaStore(pinia),
        }
      },
    }
  }
});
