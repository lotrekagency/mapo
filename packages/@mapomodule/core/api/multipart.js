const deepClone = require('@mapomodule/utils/helpers/objHelpers').deepClone

/**
 * This lets you transform a js object containing files in a multipart request with all the classic data in a single attribute (data) 
 * and all the files each one in a single attribute named with the dotted path of the file.
 * 
 * @alias $api.multipart
 * @param {Object} payload The payload of the request that needs to be trasformed. 
 * @param {String[]} file_attributes The list of dotted path of all the file attributes that need to be attached to the request.
 * @returns {external:FormData}
*/
function transformRequestInMultipart(payload, file_attributes = []) {

    const cleanObject = (object, file_attributes, base = '', files = {}) => {
        for (const key in object) {
            if (file_attributes.includes(key) && object[key] && typeof object[key] != 'string') {
                files[base + key] = object[key];
                delete object[key];
            }
            if (typeof object[key] == 'object') {
                cleanObject(object[key], file_attributes, base + key + '.', files);
            }
            if (file_attributes.includes(key) && object[key] && typeof object[key] == 'string') {
                delete object[key];
            }
        }
        return { data: object, files: files };
    }

    const tmp_obj = deepClone(payload);
    const blob = cleanObject(tmp_obj, file_attributes);
    const formData = new FormData();
    formData.append('data', JSON.stringify(blob.data));
    for (const key in blob.files) {
        formData.append(key, blob.files[key]);
    }
    return formData;
}

/**
 * @external FormData
 * @see https://developer.mozilla.org/en-US/docs/Web/API/FormData
 */

module.exports = transformRequestInMultipart