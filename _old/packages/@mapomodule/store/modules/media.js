const state = () => ({
    medias: [],
    folders: [],
    parentFolders: [],
    page: 1,
    pages: 1,
    mimeType: null,
    loading: false,
    editMedia: null,
    selection: [],
    editList: [],
    selectMode: "none",
});

const mutations = {
    RESET_STATE: (old) => {
        Object.assign(old, state());
    },
    SET_LOADING: (state, status) => {
        state.loading = status;
    },
    SET_EDIT_LIST: (state, status) => {
        state.editList = status;
    },
    SET_ROOT: (state, response) => {
        state.medias = response?.media?.items || [];
        state.folders = response?.folders || [];
        state.page = response?.media?.paginator?.page;
        state.pages = response?.media?.paginator?.pages;
    },
    SET_PARENT_FOLDER: (state, folder) => {
        if (!folder || !folder.path) {
            state.parentFolders = [];
        } else {
            const index = state.parentFolders.findIndex(
                (f) => f.path == folder.path
            );
            if (index == -1) {
                state.parentFolders.push(folder);
            } else {
                state.parentFolders.splice(
                    index + 1,
                    state.parentFolders.length - (index + 1)
                );
            }
        }
    },
    SET_EDIT_MEDIA: (state, media) => {
        state.editMedia = media;
    },
    SET_SELECTION: (state, selection) => {
        state.selection = selection || [];
    },
    SET_SELECTION_MODE: (state, mode) => {
        state.selectMode = mode;
    },
    SET_MIME_TYPE: (state, mime) => {
        state.mimeType = mime;
    },
};

const actions = {
    getRoot({ commit, getters }, context) {
        return new Promise((resolve, reject) => {
            let crud = this.$mapo.$api.crud("api/media-folders");
            commit("SET_LOADING", true);
            let { page, folder, search, mime, all } = context || {};
            let { id } =
                (folder === undefined ? getters.parentFolder : folder) || {};
            page = page || getters.page;
            mime = mime || getters.mimeType;
            id = all ? null : id;
            let params = {
                page,
                search,
                all,
                fltr: mime ? `mime_type=${mime}` : undefined,
            };

            (id ? crud.detail(id, { params }) : crud.list({ params }))
                .then((response) => {
                    commit("SET_ROOT", response);
                    commit("SET_PARENT_FOLDER", response?.parent_folder);
                    commit("SET_LOADING", false);
                    resolve(response);
                })
                .catch(reject);
        });
    },
    openEditor({ commit }, media) {
        return new Promise((resolve, reject) => {
            if (!media) {
                commit("SET_EDIT_MEDIA", null);
                resolve();
            }
            this.$mapo.$api
                .crud("api/media")
                .detail(media.id, {
                    params: { language_code: this.$i18n.locale },
                })
                .then((response) => {
                    commit("SET_EDIT_MEDIA", response);
                    resolve(response);
                })
                .catch(reject);
        });
    },
    closeEditor({ commit }) {
        return new Promise((resolve) => {
            commit("SET_EDIT_MEDIA", null);
            resolve();
        });
    },
    updateMedia({ commit, dispatch }, media) {
        return new Promise((resolve, reject) => {
            this.$mapo.$api
                .crud("api/media")
                .partialUpdate(media.id, media)
                .then((response) => {
                    commit("SET_EDIT_MEDIA", response);
                    this.$mapo.$snack.open({
                        message: this.$i18n.t("mapo.mediaManager.fileInfo"),
                    });
                    dispatch("getRoot")
                        .then(() => resolve(response))
                        .catch(reject);
                })
                .catch(reject);
        });
    },
    updateOrCreateFolder({ dispatch }, folder) {
        return this.$mapo.$api
            .crud("api/media-folders")
            .updateOrCreate(folder)
            .then(() => dispatch("getRoot"));
    },

    deleteFolder({ dispatch }, folder) {
        return this.$mapo.$api
            .crud("api/media-folders")
            .delete(folder.id)
            .then(() => dispatch("getRoot"));
    },

    deleteMedia({ dispatch }, media) {
        return this.$mapo.$api
            .crud("api/media")
            .delete(media.id)
            .then(async () => {
                commit("SET_EDIT_MEDIA", null);
                await dispatch("getRoot");
            });
    },
    reset({ commit }) {
        return new Promise((resolve) => {
            commit("RESET_STATE");
            resolve();
        });
    },
    setSelectionMode({ commit }, mode) {
        return new Promise((resolve, reject) => {
            const validModes = ["none", "single", "multi"];
            if (validModes.includes(mode)) {
                commit("SET_SELECTION_MODE", mode);
                resolve(mode);
            } else {
                reject(`Mode must be one of '${validModes}'`);
            }
        });
    },
    setSelection({ commit, state }, selection) {
        return new Promise((resolve, reject) => {
            let rejectMessage = null;
            switch (state.selectMode) {
                case "multi":
                    selection = selection || [];
                    if (!Array.isArray(selection))
                        rejectMessage =
                            "You must set an array as selection with select-mode 'multi'";
                    break;
                case "single":
                    selection = selection || null;
                    if (
                        typeof selection !== "object" ||
                        Array.isArray(selection)
                    )
                        rejectMessage =
                            "You must set an object as selection with select-mode 'single'";
                    break;
                default:
                    rejectMessage =
                        "You cannot set a selection with select-mode 'none'";
                    break;
            }
            if (rejectMessage !== null) {
                reject(rejectMessage);
            } else {
                commit("SET_SELECTION", selection);
                resolve(selection);
            }
        });
    },
    select({ commit, dispatch, state }, media) {
        return new Promise((resolve) => {
            const mode = state.selectMode;
            switch (mode) {
                case "single":
                    commit("SET_SELECTION", media);
                    resolve({ mode, selection: media });
                    break;
                case "multi":
                    const tmp = Array.isArray(state.selection)
                        ? state.selection.slice()
                        : [];
                    const index = (tmp || []).findIndex(
                        (m) => m.id === media.id
                    );
                    index == -1 ? tmp.push(media) : tmp.splice(index, 1);
                    commit("SET_SELECTION", tmp);
                    resolve({ mode, selection: tmp });
                    break;
                default:
                    dispatch("openEditor", media);
                    resolve({ mode, selection: media });
                    break;
            }
        });
    },
    editSelect({ commit, state }, data) {
        return new Promise((resolve) => {
            if (data == "__clear__") {
                commit("SET_EDIT_LIST", []);
                return resolve([]);
            }
            let dataArray = Array.isArray(data) ? data : [data];
            let currentSet = new Set(state.editList);
            let allPresent = dataArray.every((id) => currentSet.has(id));
            currentSet = allPresent
                ? new Set([...currentSet].filter((x) => !dataArray.includes(x)))
                : new Set([...dataArray, ...currentSet]);
            commit("SET_EDIT_LIST", [...currentSet]);
            return resolve([...currentSet]);
        });
    },
    deleteSelected({ commit, dispatch, state }) {
        return new Promise(async (resolve, reject) => {
            let { editList } = state;
            let number = editList.length;
            let resp = await this.$mapo.$confirm.open({
                title: this.$i18n.t("mapo.delete"),
                question: this.$i18n.t("mapo.mediaGallery.deleteSelected", {
                    number,
                }),
                approveButton: {
                    text: this.$i18n.t("mapo.delete"),
                    attrs: { color: "red", text: true },
                },
            });
            if (!resp) return resolve(false);
            let crud = this.$mapo.$api.crud("api/media");
            return await Promise.all(editList.map((id) => crud.delete(id)))
                .then((r) => {
                    commit("SET_EDIT_LIST", []);
                    dispatch("getRoot");
                    this.$mapo.$snack.open({
                        message: this.$i18n.t("mapo.mediaGallery.deleteSuccess", { number }),
                        color: "success",
                    });
                    resolve(r);
                })
                .catch(reject);
        });
    },
};

const getters = {
    parentFolder: (state) =>
        state.parentFolders
            ? state.parentFolders[state.parentFolders.length - 1]
            : null,
    medias: (state) => state.medias,
    folders: (state) => state.folders,
    parentFolders: (state) => state.parentFolders,
    page: (state) => state.page,
    pages: (state) => state.pages,
    mimeType: (state) => state.mimeType,
    loading: (state) => state.loading,
    editMedia: (state) => state.editMedia,
    selection: (state) => state.selection,
    selectMode: (state) => state.selectMode,
    editListSet: (state) => new Set(state.editList),
    editListState: (state) => {
        let value = state.medias.every(({ id }) => state.editList.includes(id));
        let indeterminate =
            !value &&
            state.medias.some(({ id }) => state.editList.includes(id));
        let outside = state.editList.some(
            (id) => !state.medias.map((m) => m.id).includes(id)
        );
        return { value, indeterminate, outside };
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
