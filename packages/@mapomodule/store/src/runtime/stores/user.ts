import { useCustomFetch } from "#imports";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

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
    SET_TOKEN(token: string, isSSR?: boolean) {
      console.log("[STORE USER]: SET_TOKEN", token, ' isSSR: ', isSSR);
      this.token = token;
    },
    SET_LOGGEDIN(bool: boolean) {
      this.isLoggedIn = !!bool;
    },
    SET_INFO(info: IInfo) {
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
          console.log("response", response);
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
            console.log("[STORE USER GET INFO]", {response, data: response.data, dataValue: response.data?.value});
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

// export const useUserStore = defineStore('user', () => {
//   const _token = ref<string | null>(null)
//   const _isLoggedIn = ref<boolean>(false)
//   const _info = ref<Partial<IInfo>>({})
//   const _page_permissions = ref<any>({})
//   const _modelPermissions = ref<Partial<IModelPermissions>>({})
//   const _rawPermissions = ref<any>([])

//   const token = computed(() => _token.value)
//   const isLoggedIn = computed(() => _isLoggedIn.value)
//   const info = computed(() => _info.value)
//   const page_permissions = computed(() => _page_permissions.value)
//   const modelPermissions = computed(() => _modelPermissions.value)
//   const rawPermissions = computed(() => _rawPermissions.value)

//   const isSuperUser = computed(() => !!info.value.is_superuser)
//   const username = computed(() => info.value.username || "Unknown")
//   const role = computed(() => info.value.role || "unknown")
//   const pagePermission = (key: string) => page_permissions.value[key] || []
//   const hasRawPermission = (permission: string) =>
//     isSuperUser.value || rawPermissions.value.includes(permission)
//   const hasModelPermission = (model: string, permission: string) =>
//     !!(
//       isSuperUser.value ||
//       modelPermissions.value[model]?.includes(permission)
//     )

//   // region old mutations
//   function SET_TOKEN(__token: string) {
//     console.log("SET_TOKEN", __token);
//     _token.value = __token;
//   }

//   function SET_LOGGEDIN(bool: boolean) {
//     console.log("SET_LOGGEDIN", bool);
//     _isLoggedIn.value = !!bool;
//   };

//   function SET_INFO(__info: IInfo) {
//     _info.value = __info;
//   }

//   function UPDATE_PERMISSIONS(__userInfo: IInfo) {
//     const permissions =
//       __userInfo?.all_permissions || __userInfo?.user_permissions || [];
//     _rawPermissions.value = permissions.map((p) => p.codename);
//     _modelPermissions.value = permissions.reduce((obj, p) => {
//       const model = p.codename.split("_").pop();
//       obj[model] = obj[model] || [];
//       obj[model].push(p.codename.split("_").slice(0, -1).join("_"));
//       return obj;
//     }, {});
//   }

//   function CLEAN_DATA() {
//     console.log("CLEAN_DATA");
//     _token.value = null;
//     _isLoggedIn.value = false;
//     _info.value = {};
//     _page_permissions.value = {};
//     _modelPermissions.value = {};
//   }

//   function ADD_PAGE_PERMISSION(payload: { key: string, value: string[] }) {
//     _page_permissions.value[payload.key] = payload.value;
//   }

//   function DELETE_PAGE_PERMISSION(key: string) {
//     delete _page_permissions.value[key];
//   }

//   function ADD_MODEL_PERMISSION(payload: { key: string, value: string[] }) {
//     _modelPermissions.value[payload.key] = payload.value;
//   }

//   function DELETE_MODEL_PERMISSION(key: string) {
//     delete _modelPermissions.value[key];
//   }
//   // endregion old mutations
//   // region old actions

//   function login(loginParams: ILoginParams) {
//     const { username, password } = loginParams;
//     return new Promise((resolve, reject) => {
//       const url = process.env.AUTH_LOGIN_URL || "/api/auth/login/";

//       useCustomFetch(url, {
//         method: 'POST',
//         body: JSON.stringify({
//           username: (username || "").trim(),
//           password: (password || "").trim(),
//         })
//       }).then((response) => {
//         console.log("response", response);
//         const __token = response?.data?.token;

//         SET_TOKEN(__token);
//         SET_LOGGEDIN(true);
//         getInfo().then(resolve);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//     });
//   }

//   function logout() {
//     return new Promise<void>((resolve, reject) => {
//       const url = process.env.AUTH_LOGIN_URL || "/api/auth/logout";
//       useCustomFetch(url, { method: 'GET' })
//         .then((_) => {
//           CLEAN_DATA();
//           if (typeof location !== "undefined")
//             location.reload();
//           resolve();
//         })
//         .catch((error) => {
//           CLEAN_DATA();
//           if (typeof location !== "undefined")
//             location.reload();
//           reject(error);
//         });
//     });
//   }

//   function getInfo({ updatePermissions } = { updatePermissions: true }) {
//     return new Promise((resolve, reject) => {
//       const url = process.env.USER_INFO_API || "/api/profiles/me/";
//       useCustomFetch(url, { method: 'GET' })
//         .then((response) => {
//           console.log("response", response);
//           // @ts-ignore TODO: manage type response
//           SET_INFO(response.data);
//           if (updatePermissions)
//             // @ts-ignore TODO: manage type response
//             UPDATE_PERMISSIONS(response.data);
//           // @ts-ignore TODO: manage type response
//           resolve(response.data);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   }

//   function addPagePermission(payload: { key: string, value: string[] }) {
//     return new Promise<void>((resolve) => {
//       ADD_PAGE_PERMISSION(payload);
//       resolve();
//     });
//   }

//   function deletePagePermission(key: string) {
//     return new Promise<void>((resolve) => {
//       DELETE_PAGE_PERMISSION(key);
//       resolve();
//     });
//   }

//   function addModelPermission(payload: { key: string, value: string[] }) {
//     return new Promise<void>((resolve) => {
//       ADD_MODEL_PERMISSION(payload);
//       resolve();
//     });
//   }

//   function deleteModelPermission(key: string) {
//     return new Promise<void>((resolve) => {
//       DELETE_MODEL_PERMISSION(key);
//       resolve();
//     });
//   }

//   return {
//     token,
//     isLoggedIn,
//     info,
//     page_permissions,
//     modelPermissions,
//     rawPermissions,
//     isSuperUser,
//     username,
//     role,
//     pagePermission,
//     hasRawPermission,
//     hasModelPermission,
//     SET_TOKEN,
//     SET_LOGGEDIN,
//     SET_INFO,
//     UPDATE_PERMISSIONS,
//     CLEAN_DATA,
//     ADD_PAGE_PERMISSION,
//     DELETE_PAGE_PERMISSION,
//     ADD_MODEL_PERMISSION,
//     DELETE_MODEL_PERMISSION,
//     login,
//     logout,
//     getInfo,
//     addPagePermission,
//     deletePagePermission,
//     addModelPermission,
//     deleteModelPermission,
//   }
// })

export type TUserStore = ReturnType<typeof useUserStore>
