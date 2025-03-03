
export default async function (moduleOptions) {
    // INJECTING ALL INTEGRATION MODULES
    for (const name in moduleOptions) {
        this.requireModule([moduleOptions[name].location, {name, ...moduleOptions[name].configuration}])
    }
}

module.exports.meta = require('./package.json')
