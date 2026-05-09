import { addDoc, collection, serverTimestamp, query, where, getDocs } from "firebase/firestore";
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

export async function getPracticeAttemptsForPatient(patientId: string) {
  try {
    const q = query(
      collection(db, "practiceAttempts"),
      where("patientId", "==", patientId)
    );
    
    const querySnapshot = await getDocs(q);
    const attempts = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    
    return attempts;
  } catch (error) {
    console.error("Error fetching practice attempts:", error);
    return [];
  }
}