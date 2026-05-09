export type Therapist = {
  id: string;
  name: string;
  email: string;
};

export type TherapistPatient = {
  id: string;
  name: string;
  email: string;
  targetSounds: string[];
  lastPractisedAt?: string;
  averageAccuracy?: number;
};