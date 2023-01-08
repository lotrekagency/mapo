import mapoDefaults from './defaults'
import {installModule} from "@nuxt/kit";
import _mergeWith from 'lodash.mergewith';


function customMerger(objValue, srcValue, key) {
    const isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    if (key === 'extendPlugins' && isFunction(objValue) && isFunction(srcValue)) {
        return plugins => objValue(srcValue(plugins))
    }
    if (key === 'onBeforeLanguageSwitch' && isFunction(objValue) && isFunction(srcValue)) {
        return async (...args) => {await objValue(...args); await srcValue(...args);}
    }
    if (typeof objValue !== 'object') {
        return objValue
    }
}

export default async function MapoModule(moduleOptions) {
    moduleOptions = _mergeWith(moduleOptions, mapoDefaults, customMerger)

    //await addPluginTemplate('@nuxtjs/axios', moduleOptions.axios)
    await installModule('@mapomodule/store', moduleOptions.store)
    await installModule('@mapomodule/core', moduleOptions)
    await installModule('@mapomodule/integrations', moduleOptions.integrations)
    await installModule('@mapomodule/uikit', moduleOptions.ui)
    await installModule('@mapomodule/routemeta', moduleOptions.routemeta)

}

module.exports.meta = require('./package.json')
