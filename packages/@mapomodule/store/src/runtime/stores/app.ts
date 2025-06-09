import Cookies from 'js-cookie'
import { defineStore } from 'pinia'

const INITIAL_STATE = {
  sidebar: {
    clipped: Cookies.get('sidebar_clipped') ? !!+Cookies.get('sidebar_clipped') : false,
    drawer: Cookies.get('sidebar_drawer') ? !!+Cookies.get('sidebar_drawer') : false,
    minivariant: Cookies.get('sidebar_minivariant') ? !!+Cookies.get('sidebar_minivariant') : false
  },
  snackbar: null
}

export interface IAppState {
  sidebar: ISidebarState,
  // TODO: update this type to match your snackbar state
  snackbar: any
}

export interface ISidebarState {
  clipped: boolean,
  drawer: boolean,
  minivariant: boolean
}

// export interface ISnackbarState {}

export const useAppStore = defineStore('app', {
  state: () => INITIAL_STATE,
  actions: {
    // region old mutations
    SET_SNACKBAR(payload: any) {
      this.snackbar = payload
    },
    CLEAR_SNACKBAR() {
      this.snackbar = null
    },
    TOGGLE_DRAWER() {
      this.sidebar.drawer = !this.sidebar.drawer;
      Cookies.set('sidebar_drawer', +!!this.sidebar.drawer)
    },
    SET_DRAWER(value: boolean) {
      this.sidebar.drawer = !!+value;
      Cookies.set('sidebar_drawer', +!!value)
    },
    TOGGLE_CLIPPED() {
      this.sidebar.clipped = !this.sidebar.clipped;
      Cookies.set('sidebar_clipped', +!!this.sidebar.clipped)
    },
    SET_CLIPPED(value: boolean) {
      this.sidebar.clipped = !!+value;
      Cookies.set('sidebar_clipped', +!!value)
    },
    TOGGLE_MINIVARIANT() {
      this.sidebar.minivariant = !this.sidebar.minivariant;
      Cookies.set('sidebar_minivariant', +!!this.sidebar.minivariant)
    },
    SET_MINIVARIANT(value: boolean) {
      this.sidebar.minivariant = !!+value;
      Cookies.set('sidebar_minivariant', +!!value)
    },
    // endregion old mutations
    // region old actions
    showSnackMessage(payload: any) {
      return new Promise<void>((resolve, reject) => {
        try {
          this.SET_SNACKBAR(payload)
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    clearSnackMessage() {
      return new Promise<void>((resolve, reject) => {
        try {
          this.CLEAR_SNACKBAR()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    toggleSidebarDrawer() {
      return new Promise<void>((resolve, reject) => {
        try {
          this.TOGGLE_DRAWER()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    toggleSidebarClipped() {
      return new Promise<void>((resolve, reject) => {
        try {
          this.TOGGLE_CLIPPED()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    },
    toggleSidebarMinivariant() {
      return new Promise<void>((resolve, reject) => {
        try {
          this.TOGGLE_MINIVARIANT()
          resolve()
        } catch (error) {
          reject(error)
        }
      })
    }
    // endregion old actions
  },
  getters: {
    drawer: state => state.sidebar.drawer,
    clipped: state => state.sidebar.clipped,
    minivariant: state => state.sidebar.minivariant,
    // snackbar: state => state.snackbar,
  }
})

export type TAppStore = ReturnType<typeof useAppStore>
