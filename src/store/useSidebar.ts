import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  isDisplay: boolean;
  setIsSidebarOpen: (value: boolean) => void;
  setIsDisplay: (value: boolean) => void;
}

export const useSidebar = create<SidebarState>((set) => ({
  isSidebarOpen: true,
  isDisplay: true,
  setIsSidebarOpen: (value: boolean) => set({ isSidebarOpen: value }),
  setIsDisplay: (value: boolean) => set({ isDisplay: value }),
}));
