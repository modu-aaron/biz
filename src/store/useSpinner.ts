import { create } from "zustand";

interface SpinnerState {
  isSpinnerOpen: boolean;
  setIsSpinner: (isSpinner: boolean) => void;
}

export const useSpinner = create<SpinnerState>((set) => ({
  isSpinnerOpen: false,
  setIsSpinner: (isSpinner: boolean) => set({ isSpinnerOpen: isSpinner }),
}));
