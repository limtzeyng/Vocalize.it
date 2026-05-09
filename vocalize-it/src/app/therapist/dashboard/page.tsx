"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Brain,
  Calendar,
  FileText,
  Send,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  getFirebaseDashboardPatients,
  type DashboardPatient,
} from "@/lib/firebaseDashboard";

type TherapistPatient = {
  id: string;
  name: string;
  condition: string;
  progress: number;
  confidence: number;
  status: "improving" | "stable" | "excellent";
  lastSession: string;
  attemptsText: string;
};

const staticPatients: TherapistPatient[] = [
  {
    id: "patient-002",
    name: "David Chen",
    condition: "Apraxia of speech",
    progress: 65,
    confidence: 58,
    status: "stable",
    lastSession: "1 day ago",
    attemptsText: "13/20 correct",
  },
  {
    id: "patient-003",
    name: "Maria Rodriguez",
    condition: "Dysarthria",
    progress: 91,
    confidence: 88,
    status: "excellent",
    lastSession: "3 hours ago",
    attemptsText: "19/21 correct",
  },
];

function getStatusFromProgress(progress: number): TherapistPatient["status"] {
  if (progress >= 85) {
    return "excellent";
  }

  if (progress >= 65) {
    return "improving";
  }

  return "stable";
}

function toAveryPatient(
  firebasePatient: DashboardPatient | null
): TherapistPatient {
  if (!firebasePatient) {
    return {
      id: "patient-001",
      name: "Avery Tan",
      condition: "Post-stroke aphasia",
      progress: 82,
      confidence: 70,
      status: "improving",
      lastSession: "2 hours ago",
      attemptsText: "20/24 correct",
    };
  }

  const progress = firebasePatient.averageAccuracy ?? 0;
  const totalAttempts = firebasePatient.totalAttempts ?? 0;
  const correctAttempts = firebasePatient.correctAttempts ?? 0;

  return {
    id: firebasePatient.id,
    name: firebasePatient.name || "Avery Tan",
    condition: "Post-stroke aphasia",
    progress,
    confidence: Math.max(40, Math.min(95, Math.round(progress * 0.85))),
    status: getStatusFromProgress(progress),
    lastSession: firebasePatient.lastPractisedAt || "Not yet",
    attemptsText: `${correctAttempts}/${totalAttempts} correct`,
  };
}

function getStatusClass(status: TherapistPatient["status"]) {
  if (status === "excellent") {
    return "bg-green-100 text-green-700";
  }

  if (status === "improving") {
    return "bg-teal-100 text-teal-700";
  }

  return "bg-yellow-100 text-yellow-700";
}

function getStatusLabel(status: TherapistPatient["status"]) {
  if (status === "excellent") {
    return "Excellent";
  }

  if (status === "improving") {
    return "Improving";
  }

  return "Stable";
}

export default function TherapistDashboardPage() {
  const [avery, setAvery] = useState<TherapistPatient>(() =>
    toAveryPatient(null)
  );

  useEffect(() => {
    async function loadAvery() {
      try {
        const firebasePatients = await getFirebaseDashboardPatients();

        const averyPatient =
          firebasePatients.find((patient) => patient.id === "patient-001") ||
          firebasePatients.find((patient) =>
            patient.name.toLowerCase().includes("avery")
          ) ||
          null;

        setAvery(toAveryPatient(averyPatient));
      } catch (error) {
        console.error("Failed to load Avery dashboard stats:", error);
      }
    }

    loadAvery();
  }, []);

  const patients = useMemo(() => {
    return [avery, ...staticPatients];
  }, [avery]);

  const averageProgress = useMemo(() => {
    return Math.round(
      patients.reduce((sum, patient) => sum + patient.progress, 0) /
        patients.length
    );
  }, [patients]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-12">
      <div className="mx-auto w-full max-w-5xl px-5 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-start justify-between gap-4"
        >
          <div>
            <h1 className="mb-1 text-3xl font-light text-gray-900">
              Therapist Portal
            </h1>
            <p className="text-gray-500">Professional telehealth dashboard</p>
          </div>

          <Link
            href="/"
            className="rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Back Home
          </Link>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3"
        >
          <div className="rounded-2xl bg-white p-4 text-center shadow-md">
            <Users className="mx-auto mb-2 h-6 w-6 text-teal-600" />
            <p className="text-2xl font-bold text-gray-900">
              {patients.length}
            </p>
            <p className="text-xs text-gray-500">Active Patients</p>
          </div>

          <div className="rounded-2xl bg-white p-4 text-center shadow-md">
            <TrendingUp className="mx-auto mb-2 h-6 w-6 text-green-600" />
            <p className="text-2xl font-bold text-gray-900">
              {averageProgress}%
            </p>
            <p className="text-xs text-gray-500">Avg Progress</p>
          </div>

          <div className="rounded-2xl bg-white p-4 text-center shadow-md">
            <Calendar className="mx-auto mb-2 h-6 w-6 text-blue-600" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
        </motion.section>

        <h2 className="mb-4 text-lg font-medium text-gray-900">
          Patient Overview
        </h2>

        <div className="space-y-4">
          {patients.map((patient, index) => (
            <motion.section
              key={patient.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="rounded-3xl bg-white p-6 shadow-lg"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-500">{patient.condition}</p>
                </div>

                <div
                  className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(
                    patient.status
                  )}`}
                >
                  {getStatusLabel(patient.status)}
                </div>
              </div>

              <div className="mb-4 space-y-3">
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Articulation Accuracy
                    </span>
                    <span className="text-sm font-semibold text-teal-600">
                      {patient.progress}%
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
                      style={{ width: `${patient.progress}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Confidence Level
                    </span>
                    <span className="text-sm font-semibold text-purple-600">
                      {patient.confidence}%
                    </span>
                  </div>

                  <div className="h-2 w-full rounded-full bg-gray-100">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                      style={{ width: `${patient.confidence}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-4 flex items-center justify-between text-sm text-gray-500">
                <span>Last session: {patient.lastSession}</span>
                <span>{patient.attemptsText}</span>
              </div>

              {index === 0 && (
                <div className="mb-4 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
                  <div className="flex items-start gap-2">
                    <Brain className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                    <div>
                      <h4 className="mb-1 text-sm font-semibold text-gray-900">
                        AI-Generated Insight
                      </h4>
                      <p className="text-xs text-gray-700">
                        Patient demonstrates improved isolated G production but
                        reduced confidence during functional phrase
                        communication.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  type="button"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-blue-500 px-4 py-3 text-sm font-medium text-white shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <FileText className="h-4 w-4" />
                  Export Report
                </button>

                <Link
                  href="/therapist/assign"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-blue-500 bg-white px-4 py-3 text-sm font-medium text-blue-600 shadow-md transition-all duration-300 hover:shadow-lg"
                >
                  <Send className="h-4 w-4" />
                  Assign Task
                </Link>
              </div>
            </motion.section>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 to-red-50 p-6 shadow-lg"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-6 w-6 flex-shrink-0 text-orange-600" />

            <div>
              <h3 className="mb-1 font-semibold text-gray-900">
                Attention Needed
              </h3>

              <p className="mb-3 text-sm text-gray-700">
                2 patients have not completed their assigned exercises this
                week.
              </p>

              <button
                type="button"
                className="text-sm font-medium text-orange-600 hover:text-orange-700"
              >
                View Details →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}