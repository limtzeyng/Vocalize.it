import Link from "next/link";
import type { DashboardPatient } from "@/lib/firebaseDashboard";

type PatientProgressTableProps = {
  patients: DashboardPatient[];
};

export default function PatientProgressTable({
  patients,
}: PatientProgressTableProps) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Patient Progress</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Home Practice Overview
          </h2>
        </div>

        <Link
          href="/therapist/assign"
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
        >
          Create Assignment
        </Link>
      </div>

      <div className="mt-5 overflow-hidden rounded-2xl border">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-50 text-gray-500">
            <tr>
              <th className="px-4 py-3 font-medium">Patient</th>
              <th className="px-4 py-3 font-medium">Target Sounds</th>
              <th className="px-4 py-3 font-medium">Last Practised</th>
              <th className="px-4 py-3 font-medium">Average Accuracy</th>
              <th className="px-4 py-3 font-medium">Attempts</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {patients.map((patient) => {
              const accuracy = patient.averageAccuracy ?? 0;

              const status =
                patient.totalAttempts === 0
                  ? "Not started"
                  : accuracy >= 80
                    ? "On track"
                    : accuracy >= 60
                      ? "Needs support"
                      : "Review needed";

              const statusClass =
                patient.totalAttempts === 0
                  ? "bg-gray-100 text-gray-700"
                  : accuracy >= 80
                    ? "bg-green-100 text-green-800"
                    : accuracy >= 60
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800";

              return (
                <tr key={patient.id} className="bg-white">
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">
                        {patient.name}
                      </p>
                      <p className="text-gray-500">{patient.email}</p>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {patient.targetSounds.length > 0 ? (
                        patient.targetSounds.map((sound) => (
                          <span
                            key={sound}
                            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                          >
                            /{sound}/
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-400">None</span>
                      )}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-600">
                    {patient.lastPractisedAt ?? "Not yet"}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-black"
                          style={{ width: `${accuracy}%` }}
                        />
                      </div>

                      <span className="font-medium text-gray-900">
                        {accuracy}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4 text-gray-700">
                    {patient.correctAttempts}/{patient.totalAttempts} correct
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
                    >
                      {status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {patients.length === 0 && (
        <div className="mt-5 rounded-2xl bg-gray-50 p-6 text-center">
          <p className="font-medium text-gray-900">No patients yet</p>
          <p className="mt-1 text-sm text-gray-600">
            Create an assignment first.
          </p>
        </div>
      )}
    </section>
  );
}