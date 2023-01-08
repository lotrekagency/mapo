import { defineStore } from "pinia";

export default defineStore('media', {
    state: () => ({
        medias: [],
        folders: [],
        parentFolders: [],
        page: 1,
        pages: 1,
        mimeType: null,
        loading: false,
        editMedia: null,
        selection: [],
        selectMode: "none",
    }),
    getters: {
        parentFolder: (state) => state.parentFolders
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
    },
    actions: {
        getRoot(context) {
            return new Promise((resolve, reject) => {
                let crud = this.$mapo.$api.crud("api/media-folders");
                this.loading = true;

                let { id } =
                (context.folder === undefined ? this.parentFolder : context.folder) || {};
                const page = context?.page || this.page;
                const mime = context.mime === undefined ? this.mimeType : context.mime;
                let params = {
                    page,
                    search: context?.search,
                    fltr: mime ? `mime_type=${mime}` : undefined,
                };

                (id ? crud.detail(id, { params }) : crud.list({ params }))
                    .then((response) => {
                        this.setRoot(response);
                        this.setParentFolder(response?.parent_folder);
                        this.loading = false;
                        resolve(response);
                    })
                    .catch(reject);
            });
        },
        openEditor(media) {
            return new Promise((resolve, reject) => {
                if (!media) {
                    this.editMedia = null;
                    resolve();
                }
                this.$mapo.$api
                    .crud("api/media")
                    .detail(media.id, {
                        params: { language_code: this.$i18n.locale },
                    })
                    .then((response) => {
                        this.editMedia = response;
                        resolve(response);
                    })
                    .catch(reject);
            });
        },
        closeEditor() {
            return new Promise((resolve) => {
                this.editMedia = null
                resolve();
            });
        },
        updateMedia(media) {
            return new Promise((resolve, reject) => {
                this.$mapo.$api
                    .crud("api/media")
                    .partialUpdate(media.id, media)
                    .then((response) => {
                        this.editMedia = response;
                        this.$mapo.$snack.open({
                            message: this.$i18n.t("mapo.mediaManager.fileInfo"),
                        });
                        this.getRoot()
                            .then(() => resolve(response))
                            .catch(reject);
                    })
                    .catch(reject);
            });
        },
        updateOrCreateFolder(folder) {
            return this.$mapo.$api
                .crud("api/media-folders")
                .updateOrCreate(folder)
                .then(async () => { await this.getRoot() });
        },

        deleteFolder({ dispatch }, folder) {
            return this.$mapo.$api
                .crud("api/media-folders")
                .delete(folder.id)
                .then(async () => { await this.getRoot() });
        },

        deleteMedia({ dispatch }, media) {
            return this.$mapo.$api
                .crud("api/media")
                .delete(media.id)
                .then(async () => {
                    this.editMedia = null;
                    await this.getRoot();
                });
        },
        setSelectionMode(mode) {
            return new Promise((resolve, reject) => {
                const validModes = ["none", "single", "multi"];
                if (validModes.includes(mode)) {
                    this.selectMode = mode;
                    resolve(mode);
                } else {
                    reject(`Mode must be one of '${validModes}'`);
                }
            });
        },
        setSelection(selection) {
            return new Promise((resolve, reject) => {
                let rejectMessage = null;
                switch (this.selectMode) {
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
                    this.selection = selection || [];
                    resolve(selection);
                }
            });
        },
        select(media) {
            return new Promise(async (resolve) => {
                const mode = this.selectMode;
                switch (mode) {
                    case "single":
                        this.selection = media || [];
                        resolve({ mode, selection: media });
                        break;
                    case "multi":
                        const tmp = Array.isArray(this.selection)
                            ? this.selection.slice()
                            : [];
                        const index = (tmp || []).findIndex(
                            (m) => m.id === media.id
                        );
                        index === -1 ? tmp.push(media) : tmp.splice(index, 1);
                        this.selection = tmp || [];
                        resolve({ mode, selection: tmp });
                        break;
                    default:
                        await this.openEditor(media);
                        resolve({ mode, selection: media });
                        break;
                }
            });
        },
        setRoot(response) {
            this.medias = response?.media?.items || [];
            this.folders = response?.folders || [];
            this.page = response?.media?.paginator?.page;
            this.pages = response?.media?.paginator?.pages;
        },
        setParentFolder(folder) {
            if (!folder || !folder.path) {
                this.parentFolders = [];
            } else {
                const index = this.parentFolders.findIndex(
                    (f) => f.path === folder.path
                );
                if (index === -1) {
                    this.parentFolders.push(folder);
                } else {
                    this.parentFolders.splice(
                        index + 1,
                        this.parentFolders.length - (index + 1)
                    );
                }
            }
        },
    }
})
