const fs = require('fs');
const path = require('path');


const sidebar = {

    baseOption: undefined,

    getSidebar(HomeTitle = "Home") {
        const root = getRoot() + '/docs';
        const dirs = fs.readdirSync(root, { withFileTypes: true }).filter(f => f.name !== '.vuepress' && f.isDirectory());
        return [{
            title: HomeTitle,
            path: !!this.baseOption ? this.baseOption : '/',
            collapsable: false,
            children: []
        }, ...getSidebarItems(dirs, root, !!this.baseOption ? this.baseOption : '')];
    }
};

getRootDir = function () {
    return path.resolve(process.cwd());
};


collapseSameName = function (dirName, childrens) {
    const childI = childrens.findIndex(c => `${c.path || c}`.toUpperCase().endsWith(`/${dirName.toUpperCase()}/`))
    if (childI !== -1) {
        const child = childrens.splice(childI, 1)[0]
        return child.path || child
    }
}

getSidebarItems = function (dirs, root, parentPath = "") {
    return dirs.reduce((stack, dir) => {
        const childs = fs.readdirSync(path.resolve(root, dir.name), { withFileTypes: true })
        const childsFolders = childs.filter(d => d.isDirectory())
        const hasReadme = !!childs.find(d => d.name == "README.md")
        if (childsFolders.length) {
            const children = getSidebarItems(childsFolders, `${root}/${dir.name}`, `${parentPath}/${dir.name}`)
            stack.push({
                title: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
                path: hasReadme ? `${parentPath}/${dir.name}/` : collapseSameName(dir.name, children),
                collapsable: !!children.length, children
            })
        } else if (hasReadme) {
            stack.push(`${parentPath}/${dir.name}/`)
        }
        return stack.sort((a, b) => (a.path || a) > (b.path || b) ? 1 : -1) // sort by name
            .sort((a, b) => !!(a.path || typeof a == "string") + !!a.collapsable <= !!(b.path || typeof b == "string") + !!b.collapsable ? 1 : -1) // sort by collapse and url path
    }, [])
};

getRoot = function () {
    tryFindBase();
    let root;

    if (!!sidebar.baseOption) {
        root = path.join(getRootDir(), sidebar.baseOption)
    } else {
        root = getRootDir()
    }
    return root;
}

tryFindBase = function () {
    try {
        let config = path.join(getRootDir(), '/.vuepress/config.js');
        let contents = fs.readFileSync(config, 'utf8')
        let base = contents.match(/(?<="?base"?:+\s?").+(?=")/)[0]
        sidebar.baseOption = base;
    } catch (err) {
        console.log("auto-sidebar: Base option not found.")
    }
}

module.exports = sidebar;