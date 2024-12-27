import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SidebarState {
  isSidebarOpen: boolean;
  activeMenu: boolean[];
  isDisplay: boolean;
  isInitialized: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  setIsDisplay: (value: boolean) => void;
  setIsActiveMenu: (index: number, value: boolean) => void;
  setActive: (value: boolean[]) => void;
  initializeSidebar: () => void;
}

export const useSidebar = create<SidebarState>()(
  persist(
    (set) => ({
      isSidebarOpen: true,
      isDisplay: true,
      activeMenu: [false, false, false],
      isInitialized: false,
      setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
      setIsDisplay: (value: boolean) => set({ isDisplay: value }),
      setIsActiveMenu: (index: number, value: boolean, arr?: boolean[]) =>
        set((state) => {
          if (arr) {
            return { activeMenu: arr };
          }
          const updatedMenu = [...state.activeMenu];
          if (index >= 0 && index < updatedMenu.length) {
            updatedMenu[index] = value;
          }
          return { activeMenu: updatedMenu };
        }),
      setActive: (value: boolean[]) => set({ activeMenu: value }),
      initializeSidebar: () => set({ isInitialized: true }),
    }),
    {
      name: "sidebarStorage",
      partialize: (state) => ({
        isSidebarOpen: state.isSidebarOpen,
        activeMenu: state.activeMenu,
      }),
    }
  )
);
