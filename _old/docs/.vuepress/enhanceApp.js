
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import injectMapo from '../../packages/@mapomodule/core/index'
import vuetify from '../../packages/@mapomodule/uikit/defaults/vuetify'
import VueI18n from 'vue-i18n'
import enUsTrans from "../../packages/@mapomodule/uikit/translations/en-US"
import Vuex from 'vuex'
import injectStore from '../../packages/@mapomodule/store/index'


export default ({ Vue, options, router, siteData }) => {
    Vue.use(Vuex)
    const store = new Vuex.Store()
    injectStore({ store })      
    Vue.mixin({ store })
    function fakeHttp() { return Promise.reject({ detail: "This is a demo environment.. No backend connection.. " }) }
    const fakeAxios = { "$get": fakeHttp, "$post": fakeHttp, "$patch": fakeHttp, "$delete": fakeHttp }
    injectMapo({ $axios: fakeAxios }, (_, plugin) => Vue.prototype.$mapo = plugin)
    const i18nConfig = { locale: 'en-US', messages: { "en-US": enUsTrans} }
    Vue.use(Vuetify, vuetify);
    options.vuetify = new Vuetify(vuetify);
    Vue.use(VueI18n, i18nConfig);
    options.i18n = new VueI18n(i18nConfig);
    router.beforeEach((to, from, next) => to.path.endsWith("//new") || (to.path == from.path && !!Object.keys(to.query).length) ? next(false) : next())
};
