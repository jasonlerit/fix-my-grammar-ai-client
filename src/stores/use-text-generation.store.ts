import { create } from "zustand"

interface TextGeneration {
  type: TextGenerationType
  setType: (value: TextGenerationType) => void
}

export enum TextGenerationType {
  FIX_GRAMMAR = "fix_grammar",
  FIX_COMMIT_MESSAGE = "fix_commit_message",
}

export const useTextGenerationStore = create<TextGeneration>()((set) => ({
  type: TextGenerationType.FIX_GRAMMAR,
  setType: (value: TextGenerationType) => set({ type: value }),
}))
