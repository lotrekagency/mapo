import { defineNuxtPlugin } from "#app";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { createPinia, setActivePinia } from "pinia";
import { useUserStore } from "../stores/user";
import { useAppStore } from "../stores/app";
import { useMediaStore } from "../stores/media";

// The order must be set to 1 to ensure this plugin initializes before all.
// TODO: Refactor this code to encapsulate everything into a single package and abstract this large object into a dedicated .ts module.
export default defineNuxtPlugin({
  order: 1,
  setup: (nuxtApp) => {
    console.log("🧰 Setting up Pinia store plugin");
    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);
    setActivePinia(pinia);

    nuxtApp.vueApp.use(pinia);

    if (import.meta.server) {
      nuxtApp.hooks.hook("app:rendered", () => {
        console.log("💾 Saving Pinia state to payload", pinia.state.value);
        nuxtApp.payload.piniaState = pinia.state.value;
      });
    }

    if (import.meta.client) {
      nuxtApp.hooks.hook("app:created", () => {
        if (nuxtApp.payload.piniaState) {
          console.log(
            "♻️ Restoring Pinia state from payload",
            nuxtApp.payload.piniaState
          );
          pinia.state.value = nuxtApp.payload.piniaState as Record<string, any>;
        }
      });
    }

    return {
      provide: {
        store: {
          user: useUserStore(pinia),
          app: useAppStore(pinia),
          media: useMediaStore(pinia),
        },
      },
    };
  },
});
