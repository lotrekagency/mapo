const state = () => ({
    medias: [],
    folders: [],
    parentFolders: [],
    page: 1,
    pages: 1,
    loading: false,
    editMedia: null,
    selected: [],
});

const mutations = {
    SET_LOADING: (state, status) => {
        state.loading = status;
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
};

const actions = {
    getRoot({ commit, getters }, context) {
        return new Promise((resolve, reject) => {
            let crud = this.$mapo.$api.crud("api/media-folders");
            commit("SET_LOADING", true);
            let { page, folder, search, mime } = context || {};
            let { id } = (folder === undefined ? getters.parentFolder : folder) || {};
            page = page || getters.page;
            let params = {
                page,
                search,
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
                        message: this.$t("mapo.mediaManager.fileInfo"),
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
            .then(dispatch("getRoot"));
    },

    deleteFolder({ dispatch }, folder) {
        return this.$mapo.$api
            .crud("api/media-folders")
            .delete(folder.id)
            .then(dispatch("getRoot"));
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
    loading: (state) => state.loading,
    editMedia: (state) => state.editMedia,
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters,
};
