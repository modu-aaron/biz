import { create } from "zustand";
import { persist } from "zustand/middleware";
import storage, { LocalStorageKey } from "../lib/storage";
import {
  User,
  Menu,
  Partner,
  PartnerCenterPermission,
  PartnerSignInInfo,
} from "../services/api/auth/type";
import authService from "../services/api/auth";

interface AuthState {
  accessToken: string;
  refreshToken: string;
  user: User | null;
  menus: Menu[];
  partners: Partner[];
  permissions: PartnerCenterPermission[];
  isSignedIn: boolean;
  currMenu: Menu | null;
  currPartner: Partner | null;
  signIn: (payload: {
    email: string;
    password: string;
    pSeq?: number;
  }) => Promise<void>;
  signOut: () => void;
  refreshAccessToken: (rToken: string) => Promise<void>;
  getMenus: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: storage.get(LocalStorageKey.ACCESS_TOKEN) || "",
      refreshToken: storage.get(LocalStorageKey.REFRESH_TOKEN) || "",
      user: null,
      menus: [],
      partners: [],
      permissions: [],
      isSignedIn: !!storage.get(LocalStorageKey.ACCESS_TOKEN),

      currMenu: null,
      currPartner: null,

      signIn: async (payload) => {
        try {
          const data = await authService.signIn(payload);
          if ("accessToken" in data) {
            set({
              accessToken: data.accessToken,
              refreshToken: data.refreshToken,
              isSignedIn: true,
            });
            storage.set(LocalStorageKey.ACCESS_TOKEN, data.accessToken);
            storage.set(LocalStorageKey.REFRESH_TOKEN, data.refreshToken);
          } else if ("partner" in data) {
            const { pSeq } = data.partner.reduce(
              (prev: PartnerSignInInfo, curr: PartnerSignInInfo) => {
                return Date.parse(prev.lastSignInAt) >
                  Date.parse(curr.lastSignInAt)
                  ? prev
                  : curr;
              }
            );
            const reData = await authService.signIn({ ...payload, pSeq });
            if ("accessToken" in reData) {
              set({
                accessToken: reData.accessToken,
                refreshToken: reData.refreshToken,
                isSignedIn: true,
              });
              storage.set(LocalStorageKey.ACCESS_TOKEN, reData.accessToken);
              storage.set(LocalStorageKey.REFRESH_TOKEN, reData.refreshToken);
            }
          }
        } catch (error) {
          set({ accessToken: "", refreshToken: "", isSignedIn: false });
          throw error;
        }
      },

      signOut: () => {
        set({
          accessToken: "",
          refreshToken: "",
          user: null,
          menus: [],
          permissions: [],
          isSignedIn: false,
        });
        storage.remove(LocalStorageKey.ACCESS_TOKEN);
        storage.remove(LocalStorageKey.REFRESH_TOKEN);
      },

      refreshAccessToken: async (rToken) => {
        try {
          const data = await authService.refreshAccessToken({
            refreshToken: rToken,
          });
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        } catch (error) {
          set({ accessToken: "", refreshToken: "" });
        }
      },

      getMenus: async () => {
        const data = await authService.getMenus();
        set({
          menus: data.menus,
          permissions: data.permissions,
          user: data.profile,
          partners: data.partners,
        });
      },
    }),
    {
      name: "auth-storage", // localStorage key
    }
  )
);
