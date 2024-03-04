import { create } from 'zustand';

interface I_UseWordsStore {
  wordsStore: object;
  setWords: (wordsAll: object) => void;
  setWordUsed: (word: object) => void;
}

const useWordsStore = create<I_UseWordsStore>((set) => ({
  wordsStore: {},
  setWords: (wordsAll: object) => set({ wordsStore: wordsAll }),
  setWordUsed: (word: object) =>
    set((state) => ({ wordsStore: { ...state.wordsStore, ...word } })),
}));
// interface I_UseWordsStore {
//   wordsStore: Map<string, number>;
//   setWords: (wordsAll: Map<string, number>) => void;
//   setWordUsed: (word: object) => void;
// }

// const useWordsStore = create<I_UseWordsStore>((set) => ({
//   wordsStore: new Map(),
//   setWords: (wordsAll: Map<string, number>) => set({ wordsStore: wordsAll }),
//   setWordUsed: (word: object) =>
//     set((state) => ({ wordsStore: { ...state.wordsStore, ...word } })),
// }));

export default useWordsStore;
