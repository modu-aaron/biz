import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  User,
  Menu,
  Partner,
  PartnerCenterPermission,
  PartnerSignInInfo,
} from "@/services/api/auth/type";
import authService from "@/services/api/auth";

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
  refreshAccessToken: (token: string) => Promise<void>;
  getMenus: () => Promise<void>;
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: "",
      refreshToken: "",
      user: null,
      menus: [],
      partners: [],
      permissions: [],
      isSignedIn: false,

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
          partners: [],
          permissions: [],
          isSignedIn: false,
        });
      },

      refreshAccessToken: async (token) => {
        try {
          const data = await authService.refreshAccessToken({
            refreshToken: token,
          });
          set({
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          });
        } catch (error) {
          set({ accessToken: "", refreshToken: "" });
          throw error;
        }
      },

      getMenus: async () => {
        try {
          if (!get().isSignedIn) {
            return;
          }
          const data = await authService.getMenus();
          set({
            menus: data.menus,
            permissions: data.permissions,
            user: data.profile,
            partners: data.partners,
          });
        } catch (error) {
          set({ accessToken: "", refreshToken: "", isSignedIn: false });
          throw error;
        }
      },
    }),
    {
      name: "authStorage",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isSignedIn: state.isSignedIn,
        menus: state.menus,
        user: state.user,
      }),
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          state.isSignedIn = !!state.accessToken;
        }
      },
    }
  )
);
