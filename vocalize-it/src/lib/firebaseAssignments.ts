import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { PracticeItem, PracticeLevel, PracticeType } from "@/types/practice";

export type CreateAssignmentInput = {
  patientId: string;
  patientName: string;
  therapistId: string;
  title: string;
  targetSound: string;
  practiceType: PracticeType;
  requiredCorrectRepetitions: number;
  levels: PracticeLevel[];
  items: PracticeItem[];
  notes: string;
};

export type FirebaseAssignment = CreateAssignmentInput & {
  id: string;
  status: string;
};

export async function createAssignment(input: CreateAssignmentInput) {
  const docRef = await addDoc(collection(db, "assignments"), {
    ...input,
    status: "active",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return docRef.id;
}

export async function getAssignmentsForPatient(patientId: string) {
  const assignmentsQuery = query(
    collection(db, "assignments"),
    where("patientId", "==", patientId)
  );

  const snapshot = await getDocs(assignmentsQuery);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as FirebaseAssignment[];
}