import Cookies from 'js-cookie';
import { defineStore } from "pinia";

export default defineStore('app', {
    state: () => ({
        sidebar: {
            clipped: Cookies.get('sidebar_clipped') ? !!+Cookies.get('sidebar_clipped') : false,
            drawer: Cookies.get('sidebar_drawer') ? !!+Cookies.get('sidebar_drawer') : false,
            minivariant: Cookies.get('sidebar_minivariant') ? !!+Cookies.get('sidebar_minivariant') : false
        },
        snackbar: null
    }),
    getters: {
        drawer: state => state.sidebar.drawer,
        clipped: state => state.sidebar.clipped,
        minivariant: state => state.sidebar.minivariant,
        snackbar: state => state.snackbar,
    },
    actions: {
        showSnackMessage(payload) {
            return new Promise((resolve, reject) => {
                try {
                    this.snackbar = payload
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        clearSnackMessage() {
            return new Promise((resolve, reject) => {
                try {
                    this.snackbar = null
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        toggleSidebarDrawer() {
            return new Promise((resolve, reject) => {
                try {
                    this.sidebar.drawer = !this.sidebar.drawer;
                    Cookies.set('sidebar_drawer', +!!this.sidebar.drawer)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        toggleSidebarClipped() {
            return new Promise((resolve, reject) => {
                try {
                    this.sidebar.clipped = !this.sidebar.clipped;
                    Cookies.set('sidebar_clipped', +!!this.sidebar.clipped)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        },
        toggleSidebarMinivariant() {
            return new Promise((resolve, reject) => {
                try {
                    this.sidebar.minivariant = !state.sidebar.minivariant;
                    Cookies.set('sidebar_minivariant', +!!state.sidebar.minivariant)
                    resolve()
                } catch (error) {
                    reject(error)
                }
            })
        }
    }
})
