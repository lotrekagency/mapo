import { defineStore } from "pinia";

const INITIAL_STATE = {
  token: null,
  isLoggedIn: false,
  info: {},
  page_permissions: {},
  modelPermissions: {},
  rawPermissions: [],
};

// TODO: manage type
export interface IUserState {
  token: string | null,
  isLoggedIn: boolean,
  info: Partial<IInfo>,
  page_permissions: any,
  modelPermissions: Partial<IModelPermissions>,
  rawPermissions: string[],
}

export interface IInfo {
  is_superuser: boolean,
  username: string,
  role: string,
  all_permissions: any,
  user_permissions: any,
}

export interface IModelPermissions {
  [key: string]: string[]
}

export interface IRawPermissions {
  [key: string]: string[]
}

export interface ILoginParams {
  username: string,
  password: string,
}


export const useUserStore = defineStore('user', {
  state: (): IUserState => INITIAL_STATE,
  actions: {
    // region old mutations
    SET_TOKEN(token: string) {
      console.log("🧩 SET_TOKEN", token);
      this.token = token;
    },
    SET_LOGGEDIN(bool: boolean) {
      console.log("🍑 SET_LOGGEDIN", bool);
      this.isLoggedIn = !!bool;
    },
    SET_INFO(info: IInfo) {
      console.log("🎯 SET_INFO", info);
      this.info = info;
    },
    UPDATE_PERMISSIONS(userInfo: IInfo) {
      const permissions =
        userInfo?.all_permissions || userInfo?.user_permissions || [];
      // @ts-ignore TODO: manage type response
      this.rawPermissions = permissions.map((p) => p.codename);
      // @ts-ignore TODO: manage type response
      this.modelPermissions = permissions.reduce((obj, p) => {
        const model = p.codename.split("_").pop();
        obj[model] = obj[model] || [];
        obj[model].push(p.codename.split("_").slice(0, -1).join("_"));
        return obj;
      }, {});
    },
    CLEAN_DATA(this) {
      console.log("CLEAN_DATA");
      this.token = null;
      this.isLoggedIn = false;
      this.info = {};
      this.page_permissions = {};
      this.modelPermissions = {};
    },
    ADD_PAGE_PERMISSION(payload: { key: string, value: string[] }) {
      this.page_permissions[payload.key] = payload.value;
    },
    DELETE_PAGE_PERMISSION(key: string) {
      delete this.page_permissions[key];
    },
    ADD_MODEL_PERMISSION(payload: { key: string, value: string[] }) {
      this.modelPermissions[payload.key] = payload.value;
    },
    DELETE_MODEL_PERMISSION(key: string) {
      delete this.modelPermissions[key];
    },
    // endregion old mutations
    // region old actions
    login(loginParams: ILoginParams) {
      const { username, password } = loginParams;
      return new Promise((resolve, reject) => {
        const url = process.env.AUTH_LOGIN_URL || "/api/auth/login/";

        useCustomFetch(url, {
          method: 'POST',
          body: JSON.stringify({
            username: (username || "").trim(),
            password: (password || "").trim(),
          })
        }).then((response) => {
          // console.log("response", response);
          const token = response?.data?.token;

          this.SET_TOKEN(token);
          this.SET_LOGGEDIN(true);
          this.getInfo().then(resolve);
        })
        .catch((error) => {
          reject(error);
        });
      });
    },
    logout() {
      return new Promise<void>((resolve, reject) => {
        const url = process.env.AUTH_LOGIN_URL || "/api/auth/logout";
        useCustomFetch(url, { method: 'GET' })
          .then((_) => {
            this.CLEAN_DATA();
            if (typeof location !== "undefined")
              location.reload();
            resolve();
          })
          .catch((error) => {
            this.CLEAN_DATA();
            if (typeof location !== "undefined")
              location.reload();
            reject(error);
          });
      });
    },
    getInfo({ updatePermissions } = { updatePermissions: true }) {
      return new Promise((resolve, reject) => {
        const url = process.env.USER_INFO_API || "/api/profiles/me/";
        useCustomFetch(url, { method: 'GET' })
          .then((response) => {
            console.log("💌 response", response.data);

            // @ts-ignore TODO: manage type response
            this.SET_INFO(response.data);
            if (updatePermissions)
              // @ts-ignore TODO: manage type response
              this.UPDATE_PERMISSIONS(response.data);
            // @ts-ignore TODO: manage type response
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    addPagePermission(payload: { key: string, value: string[] }) {
      return new Promise<void>((resolve) => {
        this.ADD_PAGE_PERMISSION(payload);
        resolve();
      });
    },
    deletePagePermission(key: string) {
      return new Promise<void>((resolve) => {
        this.DELETE_PAGE_PERMISSION(key);
        resolve();
      });
    },
    addModelPermission(payload: { key: string, value: string[] }) {
      return new Promise<void>((resolve) => {
        this.ADD_MODEL_PERMISSION(payload);
        resolve();
      });
    },
    deleteModelPermission(key: string) {
      return new Promise<void>((resolve) => {
        this.DELETE_MODEL_PERMISSION(key);
        resolve();
      });
    },
    // endregion old actions
  },
  getters: {
    // isLoggedIn: (state) => !!state.isLoggedIn,
    isSuperUser: (state) => !!state.info.is_superuser,
    // token: (state) => state.token,
    username: (state) => state.info.username || "Unknown",
    role: (state) => state.info.role || "unknown",
    // info: (state) => state.info,
    pagePermission: (state) => (key: string) => state.page_permissions[key] || [],
    hasRawPermission: (state) => (permission: string) =>
      state.info.is_superuser || state.rawPermissions.includes(permission),
    hasModelPermission: (state) => (model: string, permission: string) =>
      !!(
        state.info.is_superuser ||
        state.modelPermissions[model]?.includes(permission)
      ),
  },
  // persist: true,
})

export type TUserStore = ReturnType<typeof useUserStore>
