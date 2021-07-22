
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import injectMapo from '../../lib/templates/plugins/mapo.plugin'

export default ({ Vue, options, router, siteData }) => {
    function fakeHttp() { return Promise.resolve([]) }
    const fakeAxios = { "$get": fakeHttp, "$post": fakeHttp, "$patch": fakeHttp, "$delete": fakeHttp }
    injectMapo({ $axios: fakeAxios }, (name, plugin) => Vue.prototype.$mapo = plugin)
    Vue.use(Vuetify);
    options.vuetify = new Vuetify({})
};