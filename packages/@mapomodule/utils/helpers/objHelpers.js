function deepClone(obj) {
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

function getPointed(obj, kpointed, def) {
    const result = kpointed.split(".").reduce((o, k) => typeof (o) == 'object' ? (o || {})[k] : o, obj)
    return result === undefined ? def : result
}

function setPointed(obj, kpointed, val) {
    const arr = typeof kpointed == 'string' ? kpointed.split(".") : kpointed
    if (arr.length == 1) {
        obj[arr[0]] = val
        return obj
    }
    obj[arr[0]] = obj[arr[0]] || {}
    return setPointed(obj[arr[0]], arr.slice(1), val)
}

function filterObj(obj, kpointedArr) {
    return (kpointedArr || []).reduce((acc, kpointed) => {
        setPointed(acc, kpointed, getPointed(obj, kpointed))
        return acc
    }, {})
}

function isFileInstance(input) {
    if ('File' in window && input instanceof File)
        return true;
    else return false;
}

function isBlobInstance(input) {
    if ('Blob' in window && input instanceof Blob)
        return true;
    else return false;
}

function isFileOrBlob(input) {
    return isFileInstance(input) || isBlobInstance(input)
}

function filesInObject(obj) {
    return findPropPaths(obj, ({ val }) => isFileOrBlob(val))
}

function findPropPaths(obj, predicate) {
    const discoveredObjects = [];
    const path = [];
    const results = [];
    if (!obj && (typeof obj !== "object" || Array.isArray(obj))) {
        throw new TypeError("First argument of finPropPath is not the correct type Object");
    }
    if (typeof predicate !== "function") {
        throw new TypeError("Predicate is not a function");
    }
    (function find(obj) {
        for (const key of Object.keys(obj)) {
            if (predicate({ val: obj[key], obj, path, key }) === true) {
                path.push(key);
                results.push(path.join("."));
                path.pop();
            }
            const o = obj[key];
            if (o && typeof o === "object" && !Array.isArray(o)) {
                if (!discoveredObjects.find(obj => obj === o)) {
                    path.push(key);
                    discoveredObjects.push(o);
                    find(o);
                    path.pop();
                }
            }
        }
    }(obj));
    return results;
}

function diffObjs(obj1, obj2) {
    const a = deepClone(obj1)
    const b = deepClone(obj2)
    for (const i in b) {
        if (JSON.stringify(a[i]) === JSON.stringify(b[i])) {
            delete b[i]
        } else if (!Array.isArray(b[i]) && typeof b[i] == 'object') {
            b[i] = diffObjs(a[i], b[i])
        }
    }
    return b;
}

module.exports = {
    deepClone,
    getPointed,
    setPointed,
    filterObj,
    isFileInstance,
    isBlobInstance,
    isFileOrBlob,
    filesInObject,
    findPropPaths,
    diffObjs
}