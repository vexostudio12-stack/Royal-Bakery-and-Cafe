import { create } from 'zustand';

interface StoreState {
  isLoadingComplete: boolean;
  setLoadingComplete: (complete: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  isLoadingComplete: false,
  setLoadingComplete: (complete) => set({ isLoadingComplete: complete }),
  soundEnabled: true,
  setSoundEnabled: (enabled) => set({ soundEnabled: enabled }),
}));