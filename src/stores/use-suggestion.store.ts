import { create } from "zustand"

interface Suggestion {
  suggestions: string[]
  setSuggestions: (value: string[]) => void
}

export const useSuggestionStore = create<Suggestion>()((set) => ({
  suggestions: [],
  setSuggestions: (value: string[]) => set({ suggestions: value }),
}))
