
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import injectMapo from '../../packages/@mapomodule/core/index'
import { vuetify } from '../../packages/@mapomodule/uikit/defaults'

export default ({ Vue, options, router, siteData }) => {
    function fakeHttp() { return Promise.reject({ detail: "This is a demo environment.. No backend connection.. " }) }
    const fakeAxios = { "$get": fakeHttp, "$post": fakeHttp, "$patch": fakeHttp, "$delete": fakeHttp }
    injectMapo({ $axios: fakeAxios }, (name, plugin) => Vue.prototype.$mapo = plugin)
    Vue.use(Vuetify, vuetify);
    options.vuetify = new Vuetify(vuetify)
    router.beforeEach((to, from, next) => to.path.endsWith("//new") || (to.path == from.path && !!Object.keys(to.query).length) ? next(false) : next())
};
