import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  isDisplay: boolean;
  isInitialized: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  setIsDisplay: (value: boolean) => void;
  initializeSidebar: () => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isSidebarOpen: true,
  isDisplay: true,
  isInitialized: false,
  setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
  setIsDisplay: (value: boolean) => set({ isDisplay: value }),
  initializeSidebar: () => set({ isInitialized: true }),
}));
