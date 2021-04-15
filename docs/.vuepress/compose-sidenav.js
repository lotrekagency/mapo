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

getSidebarItems = function (dirs, root, parentPath = "") {
    return dirs.reduce((stack, dir) => {
        const childs = fs.readdirSync(path.resolve(root, dir.name), { withFileTypes: true })
        const childsFolders = childs.filter(d => d.isDirectory())
        const hasReadme = !!childs.find(d => d.name == "README.md")
        if (childsFolders.length) {
            stack.push({
                title: dir.name.charAt(0).toUpperCase() + dir.name.slice(1),
                path: hasReadme ? `${parentPath}/${dir.name}/` : undefined,
                collapsable: true,
                children: getSidebarItems(childsFolders, `${root}/${dir.name}`, `${parentPath}/${dir.name}`)
            })
        } else if (hasReadme) {
            stack.push(`${parentPath}/${dir.name}/`)
        }
        return stack
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