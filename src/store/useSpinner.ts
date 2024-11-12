import { create } from "zustand";

interface SidebarState {
  isSpinnerOpen: boolean;
  setIsSpinner: (isSpinner: boolean) => void;
}

export const useSpinner = create<SidebarState>((set) => ({
  isSpinnerOpen: false,
  setIsSpinner: (isSpinner: boolean) => set({ isSpinnerOpen: isSpinner }),
}));
