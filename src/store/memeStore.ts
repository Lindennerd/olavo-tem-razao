import create from "zustand";

interface IMemeStore {
  meme: string;
  setMeme: (meme: string) => void;
}

export const useMemeStore = create<IMemeStore>((set) => ({
  meme: "",
  setMeme: (meme: string) => set((state) => ({ meme })),
}));
