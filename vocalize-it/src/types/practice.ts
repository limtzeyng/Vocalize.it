export type UserRole = "patient" | "therapist";

export type PracticeLevel =
  | "isolation"
  | "syllable"
  | "word_initial"
  | "word_medial"
  | "word_final"
  | "blend"
  | "phrase"
  | "functional_phrase";

export type PracticeType =
  | "sound_hierarchy"
  | "repetition_drill"
  | "functional_ar";

export type PracticeItem = {
  id: string;
  targetSound: string;
  level: PracticeLevel;
  promptText: string;
  expectedResponse: string;
  modelAudioUrl?: string;
  modelVideoUrl?: string;
  mouthTip?: string;
};

export type TherapyAssignment = {
  id: string;
  patientId: string;
  therapistId: string;
  title: string;
  targetSound: string;
  practiceType: PracticeType;
  requiredCorrectRepetitions: number;
  items: PracticeItem[];
  dueDate?: string;
};

export type PronunciationFeedback = {
  transcription: string;
  isCorrect: boolean;
  accuracyScore: number;
  feedback: string;
  encouragement: string;
  nextTip: string;
};

export type PracticeAttempt = {
  id: string;
  patientId: string;
  assignmentId: string;
  practiceItemId: string;
  feedback: PronunciationFeedback;
  createdAt: string;
};

export type ObjectPracticeResult = {
  object: string;
  phrase: string;
  targetWords: string[];
  difficulty: "easy" | "medium" | "hard";
};