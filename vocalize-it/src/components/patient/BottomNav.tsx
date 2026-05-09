import Link from "next/link";

type BottomNavProps = {
  active: "practice" | "progress" | "caregiver";
};

const navItems: {
  href: string;
  label: string;
  value: BottomNavProps["active"];
}[] = [
  {
    href: "/patient/practice",
    label: "Practice",
    value: "practice",
  },
  {
    href: "/patient/progress",
    label: "Progress",
    value: "progress",
  },
  {
    href: "/patient/caregiver",
    label: "Caregiver",
    value: "caregiver",
  },
];

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white px-4 py-3">
      <div className="mx-auto flex max-w-md justify-around">
        {navItems.map((item) => {
          const selected = item.value === active;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "bg-black text-white"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}