import { getToken } from '@/utils/auth';

export default function ({ route, store, redirect }) {
    const hasToken = getToken()
    if (!hasToken) {
        return redirect('/login')
    }
}