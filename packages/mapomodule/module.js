import mapoDefaults from './defaults'
const _mergeWith = require('lodash.mergewith')


function customMerger(objValue, srcValue, key) {
    const isFunction = function (obj) {
        return !!(obj && obj.constructor && obj.call && obj.apply);
    }
    if (key == 'extendPlugins' && isFunction(objValue) && isFunction(srcValue)) {
        return plugins => objValue(srcValue(plugins))
    }
    if (typeof objValue !== 'object') {
        return objValue
    }
}

export default async function MapoModule(moduleOptions) {

    const userModuleOptions = Object.keys(moduleOptions).length === 0 ? (this.options['mapo'] || {}) : moduleOptions

    this.options = _mergeWith(this.options, mapoDefaults, customMerger)

    this.requireModule(['@nuxtjs/axios', (this.options && this.options.axios) || userModuleOptions.axios || mapoDefaults.axios || {}])
    this.requireModule(['@mapomodule/store', userModuleOptions.store])
    this.requireModule(['@mapomodule/core', userModuleOptions])
    this.requireModule(['@mapomodule/integrations', userModuleOptions.integrations])
    /* Await prevents to load routemeta before mapo pages. Also needed to correclty load mapo components */
    await this.requireModule(['@mapomodule/uikit', userModuleOptions.ui])
    this.requireModule(['@mapomodule/routemeta', userModuleOptions.routemeta])

}

module.exports.meta = require('./package.json')
