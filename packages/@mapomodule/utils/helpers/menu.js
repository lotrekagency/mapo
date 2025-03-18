function calcMaxMenuNestDepth(node, currentDepth = 0) {
    if (!node?.nodes || node?.nodes?.length === 0) {
        return currentDepth;
    }
    let maxDepth = currentDepth;
    for (const childNode of node.nodes) {
        const childDepth = calcMaxMenuNestDepth(childNode, currentDepth + 1);
        maxDepth = Math.max(maxDepth, childDepth);
    }
    return maxDepth;
}

export {
    calcMaxMenuNestDepth
}
