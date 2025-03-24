import { defineStore } from 'pinia'

const INITIAL_STATE = {
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
};

export interface IMediaState {
  medias: any,
  folders: any,
  parentFolders: any,
  page: number,
  pages: number,
  mimeType: any,
  loading: boolean,
  editMedia: any,
  selection: any,
  editList: any,
  selectMode: string,
}

export const useMediaStore = defineStore("media", {
  state: (): IMediaState => INITIAL_STATE,
  actions: {
    // region old mutations
    RESET_STATE(old: IMediaState) {
      // TODO: important check if this is correct
      Object.assign(old, INITIAL_STATE);
    },
    SET_LOADING(status: boolean) {
      this.loading = status;
    },
    SET_EDIT_LIST(status: any) {
      this.editList = status;
    },
    SET_ROOT(response: any) {
      this.medias = response?.media?.items || [];
      this.folders = response?.folders || [];
      this.page = response?.media?.paginator?.page;
      this.pages = response?.media?.paginator?.pages;
    },
    SET_PARENT_FOLDER(folder: any) {
      if (!folder || !folder.path) {
        this.parentFolders = [];
      } else {
        const index = this.parentFolders.findIndex(
          // @ts-ignore TODO: manage type response
          (f) => f.path == folder.path
        );
        if (index == -1) {
          this.parentFolders.push(folder);
        } else {
          this.parentFolders.splice(
            index + 1,
            this.parentFolders.length - (index + 1)
          );
        }
      }
    },
    SET_EDIT_MEDIA(media: any) {
      this.editMedia = media;
    },
    SET_SELECTION(selection: any) {
      this.selection = selection || [];
    },
    SET_SELECTION_MODE(mode: any) {
      this.selectMode = mode;
    },
    SET_MIME_TYPE(mime: any) {
      this.mimeType = mime;
    },
    // endregion old mutations
    // region old actions
    // @ts-ignore TODO: important check if this is correct (getters, context)
    // getRoot(getters, context) {
    getRoot() {
      return new Promise((resolve, reject) => {
        // let crud = this.$mapo.$api.crud("api/media-folders");
        this.SET_LOADING(true);
        // let { page, folder, search, mime, all } = context || {};
        // let { id } =
        //   (folder === undefined ? getters.parentFolder : folder) || {};
        // page = page || getters.page;
        // mime = mime || getters.mimeType;
        // id = all ? null : id;
        // let params = {
        //   page,
        //   search,
        //   all,
        //   fltr: mime ? `mime_type=${mime}` : undefined,
        // };

        // (id ? crud.detail(id, { params }) : crud.list({ params }))
        //   .then((response) => {
        //     this.SET_ROOT(response);
        //     this.SET_PARENT_FOLDER(response?.parent_folder);
        //     this.SET_LOADING(false);
        //     resolve(response);
        //   })
        //   .catch(reject);
      });
    },
    openEditor(media: any) {
      return new Promise<void>((resolve, reject) => {
        if (!media) {
          this.SET_EDIT_MEDIA(null);
          resolve();
        }
        // this.$mapo.$api
        //   .crud("api/media")
        //   .detail(media.id, {
        //     params: { language_code: this.$i18n.locale },
        //   })
        //   .then((response) => {
        //     this.SET_EDIT_MEDIA(response);
        //     resolve(response);
        //   })
        //   .catch(reject);
      });
    },
    closeEditor() {
      return new Promise<void>((resolve) => {
        this.SET_EDIT_MEDIA(null);
        resolve();
      });
    },
    updateMedia(media: any) {
      return new Promise((resolve, reject) => {
        // this.$mapo.$api
        //   .crud("api/media")
        //   .partialUpdate(media.id, media)
        //   .then((response) => {
        //     this.SET_EDIT_MEDIA(response);
        //     this.$mapo.$snack.open({
        //       message: this.$i18n.t("mapo.mediaManager.fileInfo"),
        //     });
        //     this.getRoot()
        //       .then(() => resolve(response))
        //       .catch(reject);
        //   })
        //   .catch(reject);
      });
    },
    // updateOrCreateFolder(folder: any) {
    //   return this.$mapo.$api
    //     .crud("api/media-folders")
    //     .updateOrCreate(folder)
    //     .then(() => this.getRoot());
    // },
    // deleteFolder(folder: any) {
    //   return this.$mapo.$api
    //     .crud("api/media-folders")
    //     .delete(folder.id)
    //     .then(() => this.getRoot());
    // },
    // deleteMedia(media) {
    //   return this.$mapo.$api
    //     .crud("api/media")
    //     .delete(media.id)
    //     .then(async () => {
    //       this.SET_EDIT_MEDIA(null);
    //       await this.getRoot();
    //     });
    // },
    // reset() {
    //   return new Promise<void>((resolve) => {
    //     this.RESET_STATE(INITIAL_STATE);
    //     resolve();
    //   });
    // },
    setSelectionMode(mode: any) {
      return new Promise((resolve, reject) => {
        const validModes = ["none", "single", "multi"];
        if (validModes.includes(mode)) {
          this.SET_SELECTION_MODE(mode);
          resolve(mode);
        } else {
          reject(`Mode must be one of '${validModes}'`);
        }
      });
    },
    setSelection(selection: any) {
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
          this.SET_SELECTION(selection);
          resolve(selection);
        }
      });
    },
    select(media: any) {
      return new Promise((resolve) => {
        const mode = this.selectMode;
        switch (mode) {
          case "single":
            this.SET_SELECTION(media);
            resolve({ mode, selection: media });
            break;
          case "multi":
            const tmp = Array.isArray(this.selection)
              ? this.selection.slice()
              : [];
            const index = (tmp || []).findIndex(
              (m) => m.id === media.id
            );
            index == -1 ? tmp.push(media) : tmp.splice(index, 1);
            this.SET_SELECTION(tmp);
            resolve({ mode, selection: tmp });
            break;
          default:
            this.openEditor(media);
            resolve({ mode, selection: media });
            break;
        }
      });
    },
    editSelect(data: any) {
      return new Promise((resolve) => {
        if (data == "__clear__") {
          this.SET_EDIT_LIST([]);
          return resolve([]);
        }
        let dataArray = Array.isArray(data) ? data : [data];
        let currentSet = new Set(this.editList);
        let allPresent = dataArray.every((id) => currentSet.has(id));
        currentSet = allPresent
          ? new Set([...currentSet].filter((x) => !dataArray.includes(x)))
          : new Set([...dataArray, ...currentSet]);
        this.SET_EDIT_LIST([...currentSet]);
        return resolve([...currentSet]);
      });
    },
    deleteSelected() {
      return new Promise(async (resolve, reject) => {
        let { editList } = this;
        let number = editList.length;
        // let resp = await this.$mapo.$confirm.open({
        //   title: this.$i18n.t("mapo.delete"),
        //   question: this.$i18n.t("mapo.mediaGallery.deleteSelected", {
        //     number,
        //   }),
        //   approveButton: {
        //     text: this.$i18n.t("mapo.delete"),
        //     attrs: { color: "red", text: true },
        //   },
        // });
        // if (!resp) return resolve(false);
        // let crud = this.$mapo.$api.crud("api/media");
        // return await Promise.all(editList.map((id) => crud.delete(id)))
        //   .then((r) => {
        //     this.SET_EDIT_LIST", []);
        //     dispatch("getRoot");
        //     this.$mapo.$snack.open({
        //       message: this.$i18n.t("mapo.mediaGallery.deleteSuccess", { number }),
        //       color: "success",
        //     });
        //     resolve(r);
        //   })
        //   .catch(reject);
      });
    },
    // endregion old actions
  },
  getters: {
    parentFolder: (state) =>
      state.parentFolders
        ? state.parentFolders[state.parentFolders.length - 1]
        : null,
    // medias: (state) => state.medias,
    // folders: (state) => state.folders,
    // parentFolders: (state) => state.parentFolders,
    // page: (state) => state.page,
    // pages: (state) => state.pages,
    // mimeType: (state) => state.mimeType,
    // loading: (state) => state.loading,
    // editMedia: (state) => state.editMedia,
    // selection: (state) => state.selection,
    // selectMode: (state) => state.selectMode,
    editListSet: (state) => new Set(state.editList),
    editListState: (state) => {
      // @ts-ignore TODO: manage type response
      let value = state.medias.every(({ id }) => state.editList.includes(id));
      let indeterminate =
        !value &&
        // @ts-ignore TODO: manage type response
        state.medias.some(({ id }) => state.editList.includes(id));
      let outside = state.editList.some(
        // @ts-ignore TODO: manage type response
        (id) => !state.medias.map((m) => m.id).includes(id)
      );
      return { value, indeterminate, outside };
    },
  }
})
