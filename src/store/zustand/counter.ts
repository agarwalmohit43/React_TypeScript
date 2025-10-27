import { create } from "zustand";

interface CounterStoreInterface {
  counter: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

const useStore = create<CounterStoreInterface>((set) => ({
  counter: 0,
  increment: () => set((state) => ({ counter: state.counter + 1 })),
  decrement: () => set((state) => ({ counter: state.counter - 1 })),
  reset: () => set({ counter: 0 }),
}));

export default useStore;
