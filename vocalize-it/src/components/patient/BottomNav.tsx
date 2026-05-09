import Link from "next/link";
import { Home, Mic, Camera, TrendingUp, Settings } from "lucide-react";

type BottomNavProps = {
  active: "home" | "practice" | "ar" | "analytics" | "settings";
};

const navItems = [
  {
    id: "home",
    label: "Home",
    href: "/patient",
    icon: Home,
  },
  {
    id: "practice",
    label: "Practice",
    href: "/patient/practice",
    icon: Mic,
  },
  {
    id: "ar",
    label: "AR Mode",
    href: "/patient/ar",
    icon: Camera,
  },
  {
    id: "analytics",
    label: "Progress",
    href: "/patient/analytics",
    icon: TrendingUp,
  },
  {
    id: "settings",
    label: "Settings",
    href: "/patient/caregiver",
    icon: Settings,
  },
] as const;

export default function BottomNav({ active }: BottomNavProps) {
  return (
    <nav className="sticky bottom-0 z-50 grid grid-cols-5 border-t border-gray-200 bg-white px-2 py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.id === active;

        return (
          <Link
            key={item.id}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-1 text-xs transition ${
              isActive
                ? "text-teal-600"
                : "text-gray-400 hover:text-gray-700"
            }`}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}