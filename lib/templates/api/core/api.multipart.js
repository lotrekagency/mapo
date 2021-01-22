import clone from '~mapomodule/utils/deepclone'

export default function transformRequestInMultipart(payload, file_attributes = []) {

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

    const tmp_obj = clone(payload);
    const blob = cleanObject(tmp_obj, file_attributes);
    const formData = new FormData();
    formData.append('data', JSON.stringify(blob.data));
    for (const key in blob.files) {
        formData.append(key, blob.files[key]);
    }
    return formData;
}


