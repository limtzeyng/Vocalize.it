import Link from "next/link";
import AssignmentBuilder from "@/components/therapist/AssignmentBuilder";

export default function TherapistAssignPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
              Vocalize.it Assignment Builder
            </p>

            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
              Create therapy practice
            </h1>

            <p className="mt-3 max-w-2xl text-gray-600">
              Choose the target sound, difficulty levels, and repetition goals
              for the patient&apos;s home practice.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/therapist/dashboard"
              className="rounded-xl border bg-white px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
            >
              Back to Dashboard
            </Link>

            <Link
              href="/patient/practice"
              className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Preview Patient Practice
            </Link>
          </div>
        </header>

        <AssignmentBuilder />
      </div>
    </main>
  );
}