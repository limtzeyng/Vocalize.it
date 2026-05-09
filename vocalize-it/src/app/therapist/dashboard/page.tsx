"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import PatientProgressTable from "@/components/therapist/PatientProgressTable";
import {
  getFirebaseDashboardPatients,
  type DashboardPatient,
} from "@/lib/firebaseDashboard";

export default function TherapistDashboardPage() {
  const [patients, setPatients] = useState<DashboardPatient[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDashboard() {
    try {
      setIsLoading(true);
      setError("");

      const firebasePatients = await getFirebaseDashboardPatients();
      setPatients(firebasePatients);
    } catch (err) {
      console.error(err);
      setError("Failed to load Firebase dashboard data.");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadDashboard();
  }, []);

  const totalPatients = patients.length;

  const activeToday = useMemo(() => {
    return patients.filter((patient) =>
      patient.lastPractisedAt?.toLowerCase().includes("today")
    ).length;
  }, [patients]);

  const averageAccuracy = useMemo(() => {
    const patientsWithAttempts = patients.filter(
      (patient) => patient.totalAttempts > 0
    );

    if (patientsWithAttempts.length === 0) return 0;

    return Math.round(
      patientsWithAttempts.reduce(
        (sum, patient) => sum + (patient.averageAccuracy ?? 0),
        0
      ) / patientsWithAttempts.length
    );
  }, [patients]);

  const needsReview = useMemo(() => {
    return patients.filter(
      (patient) =>
        patient.totalAttempts > 0 && (patient.averageAccuracy ?? 0) < 60
    ).length;
  }, [patients]);

  const totalAttempts = useMemo(() => {
    return patients.reduce((sum, patient) => sum + patient.totalAttempts, 0);
  }, [patients]);

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Vocalize.it Therapist Dashboard
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
              Monitor home practice
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              Review patient progress, track pronunciation attempts, and assign
              therapy practice that patients can complete at home.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={loadDashboard}
              className="rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Refresh
            </button>

            <Link
              href="/"
              className="rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Back Home
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Patients</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {isLoading ? "..." : totalPatients}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Active Today</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {isLoading ? "..." : activeToday}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Average Accuracy
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {isLoading ? "..." : `${averageAccuracy}%`}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Total Attempts</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {isLoading ? "..." : totalAttempts}
            </p>
          </div>
        </section>

        {isLoading ? (
          <section className="rounded-2xl border bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Loading Firebase data...
            </p>
          </section>
        ) : (
          <PatientProgressTable patients={patients} />
        )}

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Suggested Action</p>
            <h2 className="mt-2 text-lg font-bold text-gray-900">
              Review low-confidence attempts
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Patients with low accuracy may need adjusted targets, slower
              practice, or simpler word levels.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Firebase Status</p>
            <h2 className="mt-2 text-lg font-bold text-gray-900">
              Connected dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This dashboard now reads assignments and practice attempts from
              Firestore.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Next Feature</p>
            <h2 className="mt-2 text-lg font-bold text-gray-900">
              Therapist-created word lists
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Therapists can create custom words, phrases, and repetition goals
              for each patient.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}