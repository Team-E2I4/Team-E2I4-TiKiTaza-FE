import { create } from 'zustand';
import { WordQuestionType } from '@/pages/GamePage/GameWord/GameWord';

interface I_UseWordsStore {
  wordsStore: WordQuestionType;
  setWordStore: (wordsAll: WordQuestionType) => void;
  setSubmittedWord: (word: WordQuestionType) => void;
}

const useWordsStore = create<I_UseWordsStore>((set) => ({
  wordsStore: {},
  setWordStore: (wordsAll: WordQuestionType) => set({ wordsStore: wordsAll }),
  setSubmittedWord: (word: WordQuestionType) =>
    set((state) => ({ wordsStore: { ...state.wordsStore, ...word } })),
}));

export default useWordsStore;
