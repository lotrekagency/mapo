const { deepClone, getPointed, setPointed, filesInObject } = require('@mapomodule/utils/helpers/objHelpers')

/**
 * This lets you transform a js object containing files in a multipart request with all the classic data in a single attribute (data) 
 * and all the files each one in a single attribute named with the dotted path of the file.
 * 
 * @alias $api.multipart
 * @param {Object} payload The payload of the request that needs to be trasformed. 
 * @param {String | String[]} file_attributes The list of dotted path of all the file attributes that need to be attached to the request. If unset autodiscovery is applyed. If set to 'fallback' if no files are found it returns the payload as it is.
 * @returns {external:FormData}
*/
function transformRequestInMultipart(payload, file_attributes = "auto") {
    var file_paths = []
    if (["auto", "force"].includes(file_attributes)) {
        file_paths = filesInObject(payload)
        if (file_attributes == "auto" && !file_paths.length){
            return payload
        }
    } else if (Array.isArray(file_attributes)) {
        file_paths = file_attributes
    }
    const data = deepClone(payload);
    const files = file_paths.reduce((acc, path) => {
        const file = getPointed(data, path, undefined)
        setPointed(data, path, undefined);
        return { [path]: file, ...acc }
    }, {})
    const formData = new FormData();
    formData.append('data', JSON.stringify(data));
    for (const key in files) {
        formData.append(key, files[key]);
    }
    return formData;
}

/**
 * @external FormData
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */

module.exports = transformRequestInMultipart