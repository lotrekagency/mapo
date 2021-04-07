function getDefaultIcon(ctx, defaultIcon) {
    if (defaultIcon instanceof Function) {
        return defaultIcon(ctx)
    }
    return defaultIcon
}

export function buildRoutes(routes, defaultIcon) {
    return nestReduce(
        routes
            .filter((e) => !e.meta || !e.meta.sidebarHide)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((route) => {
                const { meta, path, name } = route
                const label = (route.meta && route.meta.label) || route.name.split("-").pop()
                const icon = (route.meta && route.meta.icon) || getDefaultIcon({ route, label }, defaultIcon)
                return { label, icon, meta, name, link: path, childrens: [] };
            }),
        defaultIcon
    )
}

export function nestReduce(array, defaultIcon) {
    return array.reduce((stack, route) => {
        const names = route.name.split("-");
        if (names.length === 1) {
            stack.push(route);
        } else {
            const name = names.shift();
            let pIndex = stack.findIndex((el) => el.name === name);
            if (pIndex === -1) {
                const label = (route.meta && route.meta.parentLabel) || name
                const icon = (route.meta && route.meta.parentIcon) || getDefaultIcon({ route, label }, defaultIcon)
                stack.push({ name, label, icon, childrens: [] });
                pIndex = stack.length - 1;
            }
            stack[pIndex].childrens.push(
                Object.assign(route, { name: names.join("-") })
            );
            stack[pIndex].childrens = nestReduce(stack[pIndex].childrens, defaultIcon);
        }
        return stack;
    }, []);
}