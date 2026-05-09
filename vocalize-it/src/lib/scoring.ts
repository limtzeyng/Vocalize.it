import type { PronunciationFeedback } from "@/types/practice";

export function safeParseFeedback(raw: string): PronunciationFeedback {
  try {
    const cleaned = raw
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    return {
      transcription: String(parsed.transcription ?? ""),
      isCorrect: Boolean(parsed.isCorrect),
      accuracyScore: Number(parsed.accuracyScore ?? 0),
      feedback: String(parsed.feedback ?? "Attempt received."),
      encouragement: String(parsed.encouragement ?? "Keep going!"),
      nextTip: String(parsed.nextTip ?? "Try again slowly."),
    };
  } catch {
    return {
      transcription: "",
      isCorrect: false,
      accuracyScore: 0,
      feedback:
        "I could not read the AI feedback clearly. Please try recording again.",
      encouragement: "No worries, let’s try one more time.",
      nextTip: "Speak clearly and keep the recording short.",
    };
  }
}

export function isAttemptSuccessful(
  feedback: PronunciationFeedback,
  threshold = 75
) {
  return feedback.isCorrect && feedback.accuracyScore >= threshold;
}