function deepClone(obj) {
    const clone = obj instanceof Array ? Object.assign([]) : Object.assign({});
    for (const i in obj) {
        if (obj[i] != null && typeof (obj[i]) == 'object' && !(isFileOrBlob(obj[i])) && !(obj[i] instanceof Date)) {
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
        throw new TypeError("First argument of findPropPaths is not the correct type Object");
    }
    if (typeof predicate !== "function") {
        throw new TypeError("Predicate is not a function");
    }
    (function find(obj) {
        for (const key in obj) {
            if (predicate({ val: obj[key], obj, path, key }) === true) {
                path.push(key);
                results.push(path.join("."));
                path.pop();
            }
            const o = obj[key];
            if (o && typeof o === "object") {
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

function diffObjs(obj1, obj2, clone=deepClone) {
    const a = obj1 && clone(obj1) || obj2 && obj2.__proto__.constructor();
    const b = obj2 && clone(obj2) || obj1 && obj1.__proto__.constructor();
    for (const i in b) {
        if (JSON.stringify(a[i]) === JSON.stringify(b[i])) {
            delete b[i];
        } else if (b[i] && !Array.isArray(b[i]) && typeof b[i] == 'object') {
            const diff = diffObjs(a[i], b[i], (v) => v);
            if (diff !== undefined){
                b[i] = diff;
            } else {
                delete b[i];
            };
        };
    }
    return b && Object.keys(b).length ? b : undefined;
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