export enum LocalStorageKey {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
  IS_OPEN = "isOpen",
}

export default {
  set: (key: LocalStorageKey, value: any) => {
    if (!localStorage) return;
    localStorage[key] = JSON.stringify(value);
  },
  get: (key: LocalStorageKey) => {
    if (!localStorage) return;
    return localStorage[key] ? JSON.parse(localStorage[key]) : "";
  },
  remove: (key: LocalStorageKey) => {
    if (!localStorage) return;
    localStorage.removeItem(key);
  },
};
