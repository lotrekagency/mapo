export function deepClone(obj) {
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

export function getPointed(obj, kpointed, def) {
    return kpointed.split(".").reduce((o, k) => typeof (o) == 'object' && o[k], obj) || def
}

export function setPointed(obj, kpointed, val) {
    const arr = typeof kpointed == 'string' ? kpointed.split(".") : kpointed
    return arr.length == 1 ? obj[arr[0]] = val : setPointed(obj[arr[0]] || {}, arr.slice(1), val);
}

export function filterObj(obj, kpointedArr) {
    return kpointedArr.reduce((acc, kpointed) => {
        setPointed(acc, kpointed, getPointed(obj, kpointed))
        return acc
    }, {})
}

export default {
    deepClone,
    getPointed,
    setPointed,
    filterObj
}