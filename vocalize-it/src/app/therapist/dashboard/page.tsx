import Link from "next/link";
import PatientProgressTable from "@/components/therapist/PatientProgressTable";
import type { TherapistPatient } from "@/types/therapist";

const mockPatients: TherapistPatient[] = [
  {
    id: "patient-001",
    name: "Avery Tan",
    email: "avery@example.com",
    targetSounds: ["s"],
    lastPractisedAt: "Today, 10:24 AM",
    averageAccuracy: 84,
  },
  {
    id: "patient-002",
    name: "Jamie Lee",
    email: "jamie@example.com",
    targetSounds: ["p", "b"],
    lastPractisedAt: "Yesterday, 6:12 PM",
    averageAccuracy: 72,
  },
  {
    id: "patient-003",
    name: "Nur Aisyah",
    email: "aisyah@example.com",
    targetSounds: ["k", "g"],
    lastPractisedAt: "Not yet",
    averageAccuracy: 0,
  },
];

export default function TherapistDashboardPage() {
  const totalPatients = mockPatients.length;

  const activeToday = mockPatients.filter((patient) =>
    patient.lastPractisedAt?.toLowerCase().includes("today")
  ).length;

  const averageAccuracy = Math.round(
    mockPatients.reduce(
      (sum, patient) => sum + (patient.averageAccuracy ?? 0),
      0
    ) / totalPatients
  );

  const needsReview = mockPatients.filter(
    (patient) => (patient.averageAccuracy ?? 0) < 60
  ).length;

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

          <Link
            href="/"
            className="rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Back Home
          </Link>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Patients</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {totalPatients}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Active Today</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {activeToday}
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Average Accuracy
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {averageAccuracy}%
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Needs Review</p>
            <p className="mt-2 text-3xl font-bold text-gray-950">
              {needsReview}
            </p>
          </div>
        </section>

        <PatientProgressTable patients={mockPatients} />

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
            <p className="text-sm font-medium text-gray-500">MVP Demo Note</p>
            <h2 className="mt-2 text-lg font-bold text-gray-900">
              Mock data for now
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              This dashboard currently uses sample patients. Later, it can read
              from Supabase or Firebase.
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