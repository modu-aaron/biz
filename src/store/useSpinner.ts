import { create } from "zustand";

interface SpinnerState {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const useSpinner = create<SpinnerState>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));
