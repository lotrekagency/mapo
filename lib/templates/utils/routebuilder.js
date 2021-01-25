export function buildRoutes(routes, defaultIcon) {
    return nestReduce(
        routes
            .filter((e) => !e.meta || !e.meta.sidebarHide)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((element) => {
                return {
                    label:
                        (element.meta && element.meta.label) ||
                        element.name.split("-").pop(),
                    icon: (element.meta && element.meta.icon) || defaultIcon,
                    meta: element.meta,
                    link: element.path,
                    name: element.name,
                    childrens: [],
                };
            })
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
                stack.push({
                    name: name,
                    label: (route.meta && route.meta.parentLabel) || name,
                    icon: (route.meta && route.meta.parentIcon) || defaultIcon,
                    childrens: [],
                });
                pIndex = stack.length - 1;
            }
            stack[pIndex].childrens.push(
                Object.assign(route, { name: names.join("-") })
            );
            stack[pIndex].childrens = nestReduce(stack[pIndex].childrens);
        }
        return stack;
    }, []);
}