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
            collapsable: true,
            children: []
        }, ...getSidebarItems(dirs, root, !!this.baseOption ? this.baseOption : '')];
    }
};


getRootDir = function () {
    return path.resolve(process.cwd());
};

getSidebarItems = function (dirs, root, parentPath = "") {
    return dirs.map((dir) => {
        const childs = fs.readdirSync(path.resolve(root, dir.name), { withFileTypes: true })
        const childsFolders = childs.filter(d => d.isDirectory())
        const hasReadme = !!childs.find(d => d.name == "README.md")
        return childsFolders.length ? {
            title: dir.name,
            path: hasReadme ? `${parentPath}/${dir.name}/` : undefined,
            collapsable: true,
            children: getSidebarItems(childsFolders, `${root}/${dir.name}`, `${parentPath}/${dir.name}`)
        } : `${parentPath}/${dir.name}/`
    })
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