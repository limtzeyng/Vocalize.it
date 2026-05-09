import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { TherapistPatient } from "@/types/therapist";

export type DashboardPatient = TherapistPatient & {
  totalAttempts: number;
  correctAttempts: number;
};

const fallbackPatients: DashboardPatient[] = [
  {
    id: "patient-001",
    name: "Avery Tan",
    email: "avery@example.com",
    targetSounds: ["s"],
    lastPractisedAt: "Not yet",
    averageAccuracy: 0,
    totalAttempts: 0,
    correctAttempts: 0,
  },
  {
    id: "patient-002",
    name: "Jamie Lee",
    email: "jamie@example.com",
    targetSounds: ["p", "b"],
    lastPractisedAt: "Not yet",
    averageAccuracy: 0,
    totalAttempts: 0,
    correctAttempts: 0,
  },
  {
    id: "patient-003",
    name: "Nur Aisyah",
    email: "aisyah@example.com",
    targetSounds: ["k", "g"],
    lastPractisedAt: "Not yet",
    averageAccuracy: 0,
    totalAttempts: 0,
    correctAttempts: 0,
  },
];

function formatFirestoreDate(value: any) {
  if (!value) return "Not yet";

  try {
    const date = value.toDate ? value.toDate() : new Date(value);

    return date.toLocaleString("en-SG", {
      day: "numeric",
      month: "short",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return "Not yet";
  }
}

function getDefaultPatient(patientId: string): DashboardPatient {
  return {
    id: patientId,
    name: patientId,
    email: `${patientId}@example.com`,
    targetSounds: [],
    lastPractisedAt: "Not yet",
    averageAccuracy: 0,
    totalAttempts: 0,
    correctAttempts: 0,
  };
}

export async function getFirebaseDashboardPatients() {
  const patientMap = new Map<string, DashboardPatient>();

  fallbackPatients.forEach((patient) => {
    patientMap.set(patient.id, { ...patient });
  });

  const assignmentsSnapshot = await getDocs(collection(db, "assignments"));

  assignmentsSnapshot.docs.forEach((assignmentDoc) => {
    const data = assignmentDoc.data();

    const patientId = data.patientId as string | undefined;
    if (!patientId) return;

    const existingPatient =
      patientMap.get(patientId) ?? getDefaultPatient(patientId);

    const targetSound = data.targetSound as string | undefined;

    patientMap.set(patientId, {
      ...existingPatient,
      name: data.patientName ?? existingPatient.name,
      targetSounds: targetSound
        ? Array.from(new Set([...existingPatient.targetSounds, targetSound]))
        : existingPatient.targetSounds,
    });
  });

  const attemptsSnapshot = await getDocs(collection(db, "practiceAttempts"));

  const attemptStats = new Map<
    string,
    {
      totalAttempts: number;
      correctAttempts: number;
      totalAccuracy: number;
      latestCreatedAt: any;
      latestCreatedAtMs: number;
    }
  >();

  attemptsSnapshot.docs.forEach((attemptDoc) => {
    const data = attemptDoc.data();

    const patientId = data.patientId as string | undefined;
    if (!patientId) return;

    const feedback = data.feedback ?? {};
    const accuracyScore = Number(feedback.accuracyScore ?? 0);
    const isCorrect = Boolean(feedback.isCorrect);
    const createdAt = data.createdAt;

    const createdAtMs = createdAt?.toDate
      ? createdAt.toDate().getTime()
      : createdAt
        ? new Date(createdAt).getTime()
        : 0;

    const existingStats =
      attemptStats.get(patientId) ??
      {
        totalAttempts: 0,
        correctAttempts: 0,
        totalAccuracy: 0,
        latestCreatedAt: null,
        latestCreatedAtMs: 0,
      };

    attemptStats.set(patientId, {
      totalAttempts: existingStats.totalAttempts + 1,
      correctAttempts: existingStats.correctAttempts + (isCorrect ? 1 : 0),
      totalAccuracy: existingStats.totalAccuracy + accuracyScore,
      latestCreatedAt:
        createdAtMs > existingStats.latestCreatedAtMs
          ? createdAt
          : existingStats.latestCreatedAt,
      latestCreatedAtMs: Math.max(createdAtMs, existingStats.latestCreatedAtMs),
    });
  });

  attemptStats.forEach((stats, patientId) => {
    const existingPatient =
      patientMap.get(patientId) ?? getDefaultPatient(patientId);

    patientMap.set(patientId, {
      ...existingPatient,
      totalAttempts: stats.totalAttempts,
      correctAttempts: stats.correctAttempts,
      averageAccuracy:
        stats.totalAttempts > 0
          ? Math.round(stats.totalAccuracy / stats.totalAttempts)
          : 0,
      lastPractisedAt: formatFirestoreDate(stats.latestCreatedAt),
    });
  });

  return Array.from(patientMap.values());
}