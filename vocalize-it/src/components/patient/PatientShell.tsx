import type { ReactNode } from "react";
import BottomNav from "./BottomNav";

type PatientShellProps = {
  active: "home" | "practice" | "progress" | "caregiver" | "settings";
  children: ReactNode;
};

export default function PatientShell({ active, children }: PatientShellProps) {
  return (
    <main className="min-h-screen bg-gray-100 pb-24">
      <div className="mx-auto min-h-screen max-w-md bg-gray-50 shadow-sm">
        {children}
      </div>

      <BottomNav active={active} />
    </main>
  );
}