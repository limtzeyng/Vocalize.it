import BottomNav from "./BottomNav";

type PatientShellProps = {
  active: "home" | "practice" | "ar" | "analytics" | "settings";
  children: React.ReactNode;
};

export default function PatientShell({ active, children }: PatientShellProps) {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="mx-auto flex min-h-screen max-w-md flex-col bg-gray-50 shadow-sm">
        <div className="flex-1 overflow-y-auto pb-24">{children}</div>
        <BottomNav active={active} />
      </div>
    </main>
  );
}