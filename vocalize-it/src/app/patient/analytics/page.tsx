"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  Award,
  Target,
  Calendar,
  AlertTriangle,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import PatientShell from "@/components/patient/PatientShell";
import { getPracticeAttemptsForPatient } from "@/lib/firebaseAttempts";

const DEMO_PATIENT_ID = "patient-001";

type AttemptData = {
  id: string;
  targetSound?: string;
  expectedResponse?: string;
  createdAt?: unknown;
  feedback?: {
    transcription?: string;
    isCorrect?: boolean;
    accuracyScore?: number;
    feedback?: string;
    encouragement?: string;
    nextTip?: string;
  };
};

const fallbackPronunciationData = [
  { day: "Mon", accuracy: 68 },
  { day: "Tue", accuracy: 72 },
  { day: "Wed", accuracy: 75 },
  { day: "Thu", accuracy: 78 },
  { day: "Fri", accuracy: 80 },
  { day: "Sat", accuracy: 82 },
  { day: "Sun", accuracy: 82 },
];

const fallbackConfidenceData = [
  { day: "Mon", confidence: 55 },
  { day: "Tue", confidence: 58 },
  { day: "Wed", confidence: 62 },
  { day: "Thu", confidence: 65 },
  { day: "Fri", confidence: 68 },
  { day: "Sat", confidence: 68 },
  { day: "Sun", confidence: 70 },
];

const fallbackBlendDifficulty = [
  { blend: "sp", accuracy: 68 },
  { blend: "st", accuracy: 75 },
  { blend: "sk", accuracy: 80 },
  { blend: "sm", accuracy: 82 },
  { blend: "sn", accuracy: 85 },
];

function getDayLabel(index: number) {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days[index % days.length];
}

function extractBlend(text: string | undefined) {
  if (!text) return "s";

  const lowerText = text.toLowerCase();

  if (lowerText.includes("sp")) return "sp";
  if (lowerText.includes("st")) return "st";
  if (lowerText.includes("sk")) return "sk";
  if (lowerText.includes("sm")) return "sm";
  if (lowerText.includes("sn")) return "sn";
  if (lowerText.includes("sw")) return "sw";

  return lowerText.slice(0, 2);
}

export default function ProgressAnalyticsPage() {
  const [attempts, setAttempts] = useState<AttemptData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadAttempts() {
      try {
        const data = await getPracticeAttemptsForPatient(DEMO_PATIENT_ID);
        setAttempts(data as AttemptData[]);
      } catch (error) {
        console.error("Failed to load analytics attempts:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadAttempts();
  }, []);

  const averageAccuracy = useMemo(() => {
    if (attempts.length === 0) return 82;

    const total = attempts.reduce((sum, attempt) => {
      return sum + Number(attempt.feedback?.accuracyScore ?? 0);
    }, 0);

    return Math.round(total / attempts.length);
  }, [attempts]);

  const confidenceScore = useMemo(() => {
    if (attempts.length === 0) return 70;

    const correctAttempts = attempts.filter(
      (attempt) => attempt.feedback?.isCorrect
    ).length;

    return Math.round((correctAttempts / attempts.length) * 100);
  }, [attempts]);

  const completedSessions = attempts.length || 47;

  const currentStreak = useMemo(() => {
    if (attempts.length === 0) return 12;

    const correctAttempts = attempts.filter(
      (attempt) => attempt.feedback?.isCorrect
    ).length;

    return Math.min(correctAttempts, 12);
  }, [attempts]);

  const pronunciationData = useMemo(() => {
    if (attempts.length === 0) return fallbackPronunciationData;

    const latestAttempts = attempts.slice(0, 7).reverse();

    return latestAttempts.map((attempt, index) => ({
      day: getDayLabel(index),
      accuracy: Number(attempt.feedback?.accuracyScore ?? 0),
    }));
  }, [attempts]);

  const confidenceData = useMemo(() => {
    if (attempts.length === 0) return fallbackConfidenceData;

    const latestAttempts = attempts.slice(0, 7).reverse();

    let runningCorrect = 0;

    return latestAttempts.map((attempt, index) => {
      if (attempt.feedback?.isCorrect) {
        runningCorrect += 1;
      }

      return {
        day: getDayLabel(index),
        confidence: Math.round((runningCorrect / (index + 1)) * 100),
      };
    });
  }, [attempts]);

  const blendDifficulty = useMemo(() => {
    if (attempts.length === 0) return fallbackBlendDifficulty;

    const blendMap = new Map<
      string,
      {
        totalAccuracy: number;
        count: number;
      }
    >();

    attempts.forEach((attempt) => {
      const blend = extractBlend(attempt.expectedResponse);
      const accuracy = Number(attempt.feedback?.accuracyScore ?? 0);

      const existing = blendMap.get(blend) ?? {
        totalAccuracy: 0,
        count: 0,
      };

      blendMap.set(blend, {
        totalAccuracy: existing.totalAccuracy + accuracy,
        count: existing.count + 1,
      });
    });

    return Array.from(blendMap.entries())
      .map(([blend, data]) => ({
        blend,
        accuracy: Math.round(data.totalAccuracy / data.count),
      }))
      .sort((a, b) => a.accuracy - b.accuracy)
      .slice(0, 5);
  }, [attempts]);

  const weakestBlend = blendDifficulty[0]?.blend ?? "sp";

  return (
    <PatientShell active="analytics">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-md px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="mb-1 text-3xl font-light text-gray-900">
              Analytics
            </h1>
            <p className="text-gray-500">Your rehabilitation progress</p>

            {isLoading && (
              <p className="mt-2 text-sm text-gray-400">
                Loading your latest practice attempts...
              </p>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 grid grid-cols-2 gap-3"
          >
            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <Award className="h-5 w-5 text-teal-600" />
                <span className="text-sm text-gray-500">Accuracy</span>
              </div>
              <p className="text-3xl font-bold text-teal-600">
                {averageAccuracy}%
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                {attempts.length > 0 ? "Based on attempts" : "+14% this week"}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <Target className="h-5 w-5 text-purple-600" />
                <span className="text-sm text-gray-500">Confidence</span>
              </div>
              <p className="text-3xl font-bold text-purple-600">
                {confidenceScore}%
              </p>
              <p className="mt-1 flex items-center gap-1 text-xs text-green-600">
                <TrendingUp className="h-3 w-3" />
                {attempts.length > 0 ? "Correct attempt rate" : "+15% this week"}
              </p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-600" />
                <span className="text-sm text-gray-500">Streak</span>
              </div>
              <p className="text-3xl font-bold text-blue-600">
                {currentStreak}
              </p>
              <p className="mt-1 text-xs text-gray-500">successful tries</p>
            </div>

            <div className="rounded-2xl bg-white p-5 shadow-md">
              <div className="mb-2 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-orange-600" />
                <span className="text-sm text-gray-500">Sessions</span>
              </div>
              <p className="text-3xl font-bold text-orange-600">
                {completedSessions}
              </p>
              <p className="mt-1 text-xs text-gray-500">total completed</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 font-semibold text-gray-900">
              Weekly S Articulation Progress
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={pronunciationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="accuracy"
                  stroke="url(#colorAccuracy)"
                  strokeWidth={3}
                  dot={{ fill: "#14B8A6", strokeWidth: 2, r: 5 }}
                />
                <defs>
                  <linearGradient
                    id="colorAccuracy"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 font-semibold text-gray-900">
              Confidence vs Performance Trend
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={confidenceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="confidence"
                  stroke="url(#colorConfidence)"
                  strokeWidth={3}
                  dot={{ fill: "#A855F7", strokeWidth: 2, r: 5 }}
                />
                <defs>
                  <linearGradient
                    id="colorConfidence"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#A855F7" />
                    <stop offset="100%" stopColor="#EC4899" />
                  </linearGradient>
                </defs>
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 flex items-center gap-2 font-semibold text-gray-900">
              Most Difficult Consonant Blends
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </h3>

            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={blendDifficulty}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="blend"
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                />
                <YAxis
                  tick={{ fontSize: 12, fill: "#6B7280" }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                  }}
                />
                <Bar
                  dataKey="accuracy"
                  fill="url(#colorBar)"
                  radius={[8, 8, 0, 0]}
                />
                <defs>
                  <linearGradient
                    id="colorBar"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#14B8A6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>

            <p className="mt-3 text-sm text-gray-600">
              <strong className="text-orange-600">
                “{weakestBlend}”
              </strong>{" "}
              blend needs focused practice.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-8 rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 to-blue-50 p-5"
          >
            <p className="mb-2 text-sm text-teal-900">
              <strong>Key Insight:</strong>{" "}
              {averageAccuracy >= 75
                ? "Your airflow control is getting stronger."
                : "Slow, clear repetitions may help improve accuracy."}
            </p>
            <p className="text-xs text-teal-700">
              {attempts.length > 0
                ? "This insight is based on your latest saved practice attempts."
                : "Complete more practice attempts to generate personalised insights."}
            </p>
          </motion.div>
        </div>
      </div>
    </PatientShell>
  );
}