function getDefaultIcon(ctx, defaultIcon) {
    if (defaultIcon instanceof Function) {
        return defaultIcon(ctx)
    }
    return defaultIcon
}

function buildRoutes(routes, defaultIcon) {
    return nestReduce(
        routes
            .filter((e) => !e.meta || !e.meta.sidebarHide)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((route) => {
                const { meta, path, name } = route
                const label = (route.meta && route.meta.label) || (path.split("/").pop() || "").replaceAll(':', '').replaceAll('-', ' ') || 'home'
                const icon = (route.meta && route.meta.icon) || getDefaultIcon({ route, label }, defaultIcon)
                return { label, icon, meta, name, link: path, relPath: path.slice(1), childrens: [] };
            }),
        defaultIcon
    )
}

function nestReduce(array, defaultIcon) {
    return array.reduce((stack, route) => {
        const names = route.relPath.split("/");
        if (names.length === 1) {
            stack.push(route);
        } else {
            const name = names.shift();
            let pIndex = stack.findIndex((el) => el.relPath === name);
            if (pIndex === -1) {
                const label = (route.meta && route.meta.parentLabel) || name
                const icon = (route.meta && route.meta.parentIcon) || getDefaultIcon({ route, label }, defaultIcon)
                stack.push({ name, label, icon, childrens: [] });
                pIndex = stack.length - 1;
            }
            stack[pIndex].childrens.push(
                Object.assign(route, { relPath: names.join('/') })
            );
            stack[pIndex].childrens = nestReduce(stack[pIndex].childrens, defaultIcon);
        }
        return stack;
    }, []);
}
module.exports = {
    buildRoutes,
    nestReduce
}