export default function deepClone(obj) {
    const clone = obj instanceof Array ? Object.assign([]) : Object.assign({});
    for (const i in obj) {
        if (obj[i] != null && typeof (obj[i]) == 'object' && !(obj[i] instanceof File) && !(obj[i] instanceof Date)) {
            clone[i] = deepClone(obj[i]);
        } else {
            clone[i] = obj[i];
        }
    }
    return clone;
}