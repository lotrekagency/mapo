import { installModule } from '@nuxt/kit'

export default async function (moduleOptions) {
    // INJECTING ALL INTEGRATION MODULES
    for (const name in moduleOptions) {
        await installModule(moduleOptions[name].location, {name, ...moduleOptions[name].configuration})
    }
}

module.exports.meta = require('./package.json')
