import { getToken } from '@/utils/auth';

export default function ({ route, redirect, query }) {
    const hasToken = getToken()
    if (!hasToken) {
        query['redirect'] = route.fullPath
        return redirect('/login', query)
    }
}