import type { TherapistPatient } from "@/types/therapist";

type PatientProgressTableProps = {
  patients: TherapistPatient[];
};

export default function PatientProgressTable({
  patients,
}: PatientProgressTableProps) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm font-medium text-gray-500">Patient Progress</p>
        <h2 className="mt-1 text-xl font-bold text-gray-900">
          Home Practice Overview
        </h2>
      </div>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b text-gray-500">
              <th className="py-3 pr-4 font-medium">Patient</th>
              <th className="py-3 pr-4 font-medium">Target Sounds</th>
              <th className="py-3 pr-4 font-medium">Last Practised</th>
              <th className="py-3 pr-4 font-medium">Average Accuracy</th>
            </tr>
          </thead>

          <tbody>
            {patients.map((patient) => (
              <tr key={patient.id} className="border-b last:border-0">
                <td className="py-4 pr-4">
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-xs text-gray-500">{patient.email}</p>
                </td>

                <td className="py-4 pr-4">
                  <div className="flex flex-wrap gap-2">
                    {patient.targetSounds.map((sound) => (
                      <span
                        key={sound}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                      >
                        /{sound}/
                      </span>
                    ))}
                  </div>
                </td>

                <td className="py-4 pr-4 text-gray-700">
                  {patient.lastPractisedAt}
                </td>

                <td className="py-4 pr-4">
                  <span className="font-semibold text-gray-900">
                    {patient.averageAccuracy}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}