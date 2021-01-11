export { default as Logo } from '../../components/Logo.vue'
export { default as LogoutButton } from '../../components/LogoutButton.vue'
export { default as VuetifyLogo } from '../../components/VuetifyLogo.vue'
export { default as SidebarFooter } from '../../components/sidebar/SidebarFooter.vue'
export { default as SidebarList } from '../../components/sidebar/SidebarList.vue'
export { default as SidebarListItem } from '../../components/sidebar/SidebarListItem.vue'

export const LazyLogo = import('../../components/Logo.vue' /* webpackChunkName: "components/Logo" */).then(c => c.default || c)
export const LazyLogoutButton = import('../../components/LogoutButton.vue' /* webpackChunkName: "components/LogoutButton" */).then(c => c.default || c)
export const LazyVuetifyLogo = import('../../components/VuetifyLogo.vue' /* webpackChunkName: "components/VuetifyLogo" */).then(c => c.default || c)
export const LazySidebarFooter = import('../../components/sidebar/SidebarFooter.vue' /* webpackChunkName: "components/sidebar/SidebarFooter" */).then(c => c.default || c)
export const LazySidebarList = import('../../components/sidebar/SidebarList.vue' /* webpackChunkName: "components/sidebar/SidebarList" */).then(c => c.default || c)
export const LazySidebarListItem = import('../../components/sidebar/SidebarListItem.vue' /* webpackChunkName: "components/sidebar/SidebarListItem" */).then(c => c.default || c)
