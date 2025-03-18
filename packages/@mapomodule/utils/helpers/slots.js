function nameSpacedSlots(slots, scope) {
    return Object.keys(slots)
        .filter((name) => name.startsWith(scope))
        .map((name) => name.replace(scope, ""));
}

export {
    nameSpacedSlots
}