import type { PracticeItem, TherapyAssignment } from "@/types/practice";

export const sSoundPracticeItems: PracticeItem[] = [
  {
    id: "s-isolation-1",
    targetSound: "s",
    level: "isolation",
    promptText: "Say the snake sound: sssss",
    expectedResponse: "sssss",
    mouthTip:
      "Keep your tongue close to the ridge behind your teeth and let the air flow smoothly.",
  },
  {
    id: "s-syllable-sa",
    targetSound: "s",
    level: "syllable",
    promptText: "Say: sa",
    expectedResponse: "sa",
    mouthTip:
      "Start with a clear /s/ sound, then open your mouth for the vowel.",
  },
  {
    id: "s-syllable-see",
    targetSound: "s",
    level: "syllable",
    promptText: "Say: see",
    expectedResponse: "see",
    mouthTip:
      "Keep the /s/ light and smooth before moving into the vowel sound.",
  },
  {
    id: "s-initial-sun",
    targetSound: "s",
    level: "word_initial",
    promptText: "Say: sun",
    expectedResponse: "sun",
    mouthTip:
      "Make sure the /s/ sound is clear at the start of the word.",
  },
  {
    id: "s-initial-soap",
    targetSound: "s",
    level: "word_initial",
    promptText: "Say: soap",
    expectedResponse: "soap",
    mouthTip:
      "Begin with a smooth /s/ before saying the rest of the word.",
  },
  {
    id: "s-medial-pencil",
    targetSound: "s",
    level: "word_medial",
    promptText: "Say: pencil",
    expectedResponse: "pencil",
    mouthTip:
      "Listen for the /s/ sound in the middle of the word.",
  },
  {
    id: "s-final-bus",
    targetSound: "s",
    level: "word_final",
    promptText: "Say: bus",
    expectedResponse: "bus",
    mouthTip:
      "Keep the final /s/ sound clear instead of dropping it.",
  },
  {
    id: "s-final-glass",
    targetSound: "s",
    level: "word_final",
    promptText: "Say: glass",
    expectedResponse: "glass",
    mouthTip:
      "Finish the word with a clear /s/ sound.",
  },
  {
    id: "s-blend-spoon",
    targetSound: "s",
    level: "blend",
    promptText: "Say: spoon",
    expectedResponse: "spoon",
    mouthTip:
      "Keep the /s/ and /p/ close together without adding an extra vowel.",
  },
  {
    id: "s-blend-star",
    targetSound: "s",
    level: "blend",
    promptText: "Say: star",
    expectedResponse: "star",
    mouthTip:
      "Start with /s/, then move quickly into the /t/ sound.",
  },
];

export const mockAssignment: TherapyAssignment = {
  id: "assignment-s-001",
  patientId: "patient-001",
  therapistId: "therapist-001",
  title: "Practice the /s/ sound",
  targetSound: "s",
  practiceType: "sound_hierarchy",
  requiredCorrectRepetitions: 5,
  items: sSoundPracticeItems,
};