import { defineStore } from 'pinia'
import useAppStore from "./modules/app";
import useUserStore from "./modules/user";

const cookieparser = process.server ? require('cookieparser') : undefined

export default defineStore('index', {
    actions: {
        async nuxtServerInit({ $pinia, req }) {
            if (req.headers.cookie) {
                const { __mapo_session, sidebar_drawer, sidebar_clipped, sidebar_minivariant } = cookieparser.parse(req.headers.cookie)
                const appStore = useAppStore($pinia);

                appStore.sidebar.drawer = sidebar_drawer;
                appStore.sidebar.clipped = sidebar_clipped;
                appStore.sidebar.minivariant = sidebar_minivariant;

                if (__mapo_session) {
                    const userStore = useUserStore($pinia);

                    userStore.token = __mapo_session;
                    userStore.isLoggedIn = true;

                    await userStore.getInfo().catch(async (e) => {
                        console.error(`Error occurred calling backend app:\n${e.stack || e}\nCannot maintain your session in ssr.`);
                        await userStore.logout().catch(() => {})
                    })
                }
            }
        }
    }
})
