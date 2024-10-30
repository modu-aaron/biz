import { create } from "zustand";

import { AuthState } from "../types/auth";
import storage, { LocalStorageKey } from "../shared";

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: storage.get(LocalStorageKey.ACCESS_TOKEN) || "",
  refreshToken: storage.get(LocalStorageKey.REFRESH_TOKEN) || "",
  user: null,
  menus: [],
  partners: [],
  permissions: [],
  setAccessToken: (accessToken) => {
    set({ accessToken });
    storage.set(LocalStorageKey.ACCESS_TOKEN, accessToken);
  },
  setRefreshToken: (refreshToken) => {
    set({ refreshToken });
    storage.set(LocalStorageKey.REFRESH_TOKEN, refreshToken);
  },
  setUser: (user) => set({ user }),
  setMenus: (menus) => set({ menus }),
  setPartners: (partners) => set({ partners }),
  setPermissions: (permissions) => set({ permissions }),
}));
