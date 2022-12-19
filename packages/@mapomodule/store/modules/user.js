const state = () => ({
    token: null,
    isLoggedIn: false,
    info: {},
    page_permissions: {},
    modelPermissions: {},
    rawPermissions: [],
});

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_LOGGEDIN: (state, bool) => {
        state.isLoggedIn = !!bool;
    },
    SET_INFO: (state, info) => {
        state.info = info;
    },
    UPDATE_PERMISSIONS: (state, userInfo) => {
        const permissions =
            userInfo?.all_permissions || userInfo?.user_permissions || [];
        state.rawPermissions = permissions.map((p) => p.codename);
        state.modelPermissions = permissions.reduce((obj, p) => {
            const model = p.codename.split("_").pop();
            obj[model] = obj[model] || [];
            obj[model].push(p.codename.split("_").slice(0, -1).join("_"));
            return obj;
        }, {});
    },
    CLEAN_DATA: (state) => {
        state.token = null;
        state.isLoggedIn = false;
        state.info = {};
        state.page_permissions = {};
        state.modelPermissions = {};
    },
    ADD_PAGE_PERMISSION: (state, payload) => {
        state.page_permissions[payload.key] = payload.value;
    },
    DELETE_PAGE_PERMISSION: (state, key) => {
        delete state.page_permissions[key];
    },
    ADD_MODEL_PERMISSION: (state, payload) => {
        state.modelPermissions[payload.key] = payload.value;
    },
    DELETE_MODEL_PERMISSION: (state, key) => {
        delete state.modelPermissions[key];
    },
};

const actions = {
    login({ commit, dispatch }, userInfo) {
        const { username, password } = userInfo;
        return new Promise((resolve, reject) => {
            const url = process.env.AUTH_LOGIN_URL || "/api/auth/login";
            this.$axios
                .post(url, {
                    username: (username || "").trim(),
                    password: (password || "").trim(),
                })
                .then((response) => {
                    const { token } = response.data;
                    commit("SET_TOKEN", token);
                    commit("SET_LOGGEDIN", true);
                    dispatch("getInfo").then(() => resolve());
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    logout({ commit }) {
        return new Promise((resolve, reject) => {
            const url = process.env.AUTH_LOGIN_URL || "/api/auth/logout";
            this.$axios
                .get(url)
                .then((_) => {
                    commit("CLEAN_DATA");
                    typeof location !== "undefined" && location.reload();
                    resolve();
                })
                .catch((error) => {
                    commit("CLEAN_DATA");
                    typeof location !== "undefined" && location.reload();
                    reject(error);
                });
        });
    },

    getInfo({ commit }, { updatePermissions } = { updatePermissions: true }) {
        return new Promise((resolve, reject) => {
            const url = process.env.USER_INFO_API || "/api/profiles/me/";
            this.$axios
                .get(url)
                .then((response) => {
                    commit("SET_INFO", response.data);
                    if (updatePermissions)
                        commit("UPDATE_PERMISSIONS", response.data);
                    resolve(response.data);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    addPagePermission({ commit }, payload) {
        return new Promise((resolve) => {
            commit("ADD_PAGE_PERMISSION", payload);
            resolve();
        });
    },

    deletePagePermission({ commit }, key) {
        return new Promise((resolve) => {
            commit("DELETE_PAGE_PERMISSION", key);
            resolve();
        });
    },

    addModelPermission({ commit }, payload) {
        return new Promise((resolve) => {
            commit("ADD_MODEL_PERMISSION", payload);
            resolve();
        });
    },

    deleteModelPermission({ commit }, key) {
        return new Promise((resolve) => {
            commit("DELETE_MODEL_PERMISSION", key);
            resolve();
        });
    },
};

const getters = {
    isLoggedIn: (state) => !!state.isLoggedIn,
    isSuperUser: (state) => !!state.info.is_superuser,
    token: (state) => state.token,
    username: (state) => state.info.username || "Unknown",
    role: (state) => state.info.role || "unknown",
    info: (state) => state.info,
    pagePermission: (state) => (key) => state.page_permissions[key] || [],
    hasRawPermission: (state) => (permission) =>
        state.info.is_superuser || state.rawPermissions.includes(permission),
    hasModelPermission: (state) => (model, permission) =>
        !!(
            state.info.is_superuser ||
            state.modelPermissions[model]?.includes(permission)
        ),
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
