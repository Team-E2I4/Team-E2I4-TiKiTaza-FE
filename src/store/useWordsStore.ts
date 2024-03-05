import { create } from 'zustand';
import { WordQuestionType } from '@/pages/GamePage/GameWord/GameWord';

interface I_UseWordsStore {
  wordsStore: WordQuestionType;
  setWordsStore: (wordsAll: WordQuestionType) => void;
  setSubmittedWord: (word: WordQuestionType) => void;
}

const useWordsStore = create<I_UseWordsStore>((set) => ({
  wordsStore: {},
  setWordsStore: (wordsAll: WordQuestionType) => set({ wordsStore: wordsAll }),
  setSubmittedWord: (word: WordQuestionType) =>
    set((state) => ({ wordsStore: { ...state.wordsStore, ...word } })),
}));

export default useWordsStore;
