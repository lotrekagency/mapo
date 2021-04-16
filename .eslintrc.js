module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true
    },
    extends: [
        "standard",
        "eslint:recommended",
        "plugin:vue/recommended"
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: [
        "vue"
    ],
    rules: {},
};
