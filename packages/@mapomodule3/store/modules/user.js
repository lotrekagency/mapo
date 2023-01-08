import { defineStore } from "pinia";

export default defineStore('user', {
    state: () => ({
        token: null,
        isLoggedIn: false,
        info: {},
        page_permissions: {}
    }),
    getters: {
        isLoggedIn: state => !!state.isLoggedIn,
        isSuperUser: state => !!state.info.is_superuser,
        token: state => state.token,
        username: state => state.info.username || 'Unknown',
        role: state => state.info.role || 'unknown',
        info: state => state.info,
        pagePermission: state => key => state.page_permissions[key] || [],
    },
    actions: {
        login(userInfo) {
            const { username, password } = userInfo
            return new Promise((resolve, reject) => {
                const url = process.env.AUTH_LOGIN_URL || '/api/auth/login'
                this.$axios.post(url, { username: (username || "").trim(), password: (password || "").trim() }).then(response => {
                    const { token } = response.data
                    this.token = token;
                    this.isLoggedIn = true;
                    this.getInfo().then(() => resolve())
                }).catch(error => {
                    reject(error)
                })
            })
        },
        logout() {
            return new Promise((resolve, reject) => {
                const url = process.env.AUTH_LOGIN_URL || '/api/auth/logout'
                this.$axios.get(url).then(_ => {
                    this.cleanData();
                    typeof location !== "undefined" && location.reload()
                    resolve()
                }).catch(error => {
                    this.cleanData();
                    typeof location !== "undefined" && location.reload()
                    reject(error)
                })
            })
        },
        getInfo() {
            return new Promise((resolve, reject) => {
                const url = process.env.USER_INFO_API || '/api/profiles/me/'
                this.$axios.get(url).then(response => {
                    this.info = response.data
                    resolve(response.data)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        addPagePermission(payload) {
            return new Promise((resolve) => {
                this.page_permissions[payload.key] = payload.value
                resolve()
            })
        },
        deletePagePermission(key) {
            return new Promise((resolve) => {
                delete this.page_permissions[key];
                resolve()
            })
        },
        cleanData() {
            this.token = null
            this.isLoggedIn = false
            this.info = {}
            this.page_permissions = {}
        }
    },
});
