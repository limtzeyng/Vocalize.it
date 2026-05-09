import type { PracticeLevel } from "@/types/practice";

export const practiceLevelLabels: Record<PracticeLevel, string> = {
  isolation: "Isolation",
  syllable: "Syllable",
  word_initial: "Initial Word",
  word_medial: "Medial Word",
  word_final: "Final Word",
  blend: "Blend",
  phrase: "Phrase",
  functional_phrase: "Functional Phrase",
};

export const practiceLevelDescriptions: Record<PracticeLevel, string> = {
  isolation: "Practise the sound by itself.",
  syllable: "Combine the sound with vowels.",
  word_initial: "Practise the sound at the start of words.",
  word_medial: "Practise the sound in the middle of words.",
  word_final: "Practise the sound at the end of words.",
  blend: "Practise the sound with another consonant.",
  phrase: "Practise the sound in short phrases.",
  functional_phrase: "Practise useful everyday phrases.",
};

export const soundHierarchyOrder: PracticeLevel[] = [
  "isolation",
  "syllable",
  "word_initial",
  "word_medial",
  "word_final",
  "blend",
  "phrase",
  "functional_phrase",
];