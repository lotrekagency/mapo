function debounce(func, wait, immediate) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function memoizedDebounce(
    func,
    wait,
    immediate,
    argsSerializer = (args) => JSON.stringify(args)
) {
    var timeout = {};
    return function () {
        var context = this,
            args = arguments,
            serializedArgs = argsSerializer(arguments);
        var later = function () {
            timeout[serializedArgs] = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout[serializedArgs];
        clearTimeout(timeout[serializedArgs]);
        timeout[serializedArgs] = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

export {
    debounce,
    memoizedDebounce,
};
