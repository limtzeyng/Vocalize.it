import type { TherapyAssignment } from "./practice";

export type Patient = {
  id: string;
  name: string;
  email: string;
  therapistId?: string;
  assignedPractice: TherapyAssignment[];
};

export type PatientProgressSummary = {
  patientId: string;
  totalAttempts: number;
  correctAttempts: number;
  averageAccuracy: number;
  currentStreak: number;
  lastPractisedAt?: string;
};