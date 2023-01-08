import useIndexStore from './index'

export default async function ({ $pinia, req }) {
    if (process.server) {
        const store = useIndexStore($pinia);
        await store.nuxtServerInit({ $pinia, req });
    }
}
