import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PronunciationFeedback } from "@/types/practice";

export type CreatePracticeAttemptInput = {
  patientId: string;
  assignmentId: string;
  itemId: string;
  expectedResponse: string;
  targetSound: string;
  practiceLevel: string;
  feedback: PronunciationFeedback;
  isCorrect: boolean;
  accuracyScore: number;
};

export async function createPracticeAttempt(input: CreatePracticeAttemptInput) {
  const docRef = await addDoc(collection(db, "practiceAttempts"), {
    ...input,
    createdAt: serverTimestamp(),
  });

  return docRef.id;
}