"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Camera,
  TrendingUp,
  Users,
  Play,
  Activity,
  Award,
  Target,
} from "lucide-react";
import PatientShell from "@/components/patient/PatientShell";

const therapyCards = [
  {
    icon: Play,
    title: "Start Therapy",
    description: "Continue practice",
    gradient: "from-teal-500 to-blue-500",
    href: "/patient/practice",
  },
  {
    icon: Camera,
    title: "AR Conversation Practice",
    description: "Real-world object recognition",
    gradient: "from-purple-500 to-pink-500",
    href: "/patient/ar",
  },
  {
    icon: TrendingUp,
    title: "Progress Analytics",
    description: "View your improvements",
    gradient: "from-blue-500 to-indigo-600",
    href: "/patient/analytics",
  },
  {
    icon: Users,
    title: "Caregiver Phrase Bank",
    description: "Customize daily phrases",
    gradient: "from-orange-400 to-red-500",
    href: "/patient/caregiver",
  },
];

export default function PatientHomePage() {
  return (
    <PatientShell active="home">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-md px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="mb-1 text-3xl font-light text-gray-900">
              Welcome back, Sarah
            </h1>
            <p className="text-gray-500">Let&apos;s continue your progress</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500">
                <Activity className="h-6 w-6 text-white" />
              </div>

              <div>
                <h2 className="font-medium text-gray-900">Current Stage</h2>
                <p className="text-sm text-gray-500">Level 4: S Blends</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-teal-600" />
                  <span className="text-sm text-gray-600">
                    Pronunciation Accuracy
                  </span>
                </div>
                <span className="font-semibold text-teal-600">82%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-blue-500"
                  style={{ width: "82%" }}
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-gray-600">
                    Confidence Level
                  </span>
                </div>
                <span className="font-semibold text-purple-600">Growing</span>
              </div>

              <div className="h-2 w-full rounded-full bg-gray-100">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: "68%" }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <h2 className="mb-4 text-lg font-medium text-gray-900">
              Quick Actions
            </h2>
          </motion.div>

          <div className="space-y-3">
            {therapyCards.map((card, index) => {
              const Icon = card.icon;

              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Link
                    href={card.href}
                    className="group flex w-full items-center gap-4 rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-lg"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.gradient} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className="h-6 w-6 text-white" strokeWidth={2} />
                    </div>

                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-gray-900">
                        {card.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {card.description}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 p-5"
          >
            <p className="mb-2 text-sm text-teal-900">
              <strong>Today&apos;s Goal:</strong> Practice 5 S-blend words with
              functional phrases
            </p>
            <p className="text-xs text-teal-700">
              You&apos;re improving steadily. Keep building confidence!
            </p>
          </motion.div>
        </div>
      </div>
    </PatientShell>
  );
}