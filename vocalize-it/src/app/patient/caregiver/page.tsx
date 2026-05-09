"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Volume2, Info, RotateCcw, ArrowRight } from "lucide-react";

import AudioRecorder from "@/components/practice/AudioRecorder";
import FeedbackCard from "@/components/practice/FeedbackCard";
import PatientShell from "@/components/patient/PatientShell";
import { mockAssignment } from "@/data/practiceBank";
import { createPracticeAttempt } from "@/lib/firebaseAttempts";
import { getAssignmentsForPatient } from "@/lib/firebaseAssignments";
import { isAttemptSuccessful } from "@/lib/scoring";
import { practiceLevelLabels } from "@/lib/therapyLevels";
import type {
  PracticeItem,
  PronunciationFeedback,
  TherapyAssignment,
} from "@/types/practice";

const DEMO_PATIENT_ID = "patient-001";

function formatTargetWord(word: string) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default function PracticePage() {
  const [assignment, setAssignment] =
    useState<TherapyAssignment>(mockAssignment);

  const [selectedItemId, setSelectedItemId] = useState(
    mockAssignment.items[0]?.id
  );

  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const [isLoadingAssignment, setIsLoadingAssignment] = useState(true);
  const [assignmentSource, setAssignmentSource] = useState<"firebase" | "mock">(
    "mock"
  );

  useEffect(() => {
    async function loadAssignment() {
      try {
        const firebaseAssignments =
          await getAssignmentsForPatient(DEMO_PATIENT_ID);

        if (firebaseAssignments.length > 0) {
          const latestAssignment = firebaseAssignments[0];

          setAssignment(latestAssignment);
          setSelectedItemId(latestAssignment.items[0]?.id);
          setAssignmentSource("firebase");
        } else {
          setAssignment(mockAssignment);
          setSelectedItemId(mockAssignment.items[0]?.id);
          setAssignmentSource("mock");
        }
      } catch (error) {
        console.error("Failed to load Firebase assignment:", error);

        setAssignment(mockAssignment);
        setSelectedItemId(mockAssignment.items[0]?.id);
        setAssignmentSource("mock");
      } finally {
        setIsLoadingAssignment(false);
      }
    }

    loadAssignment();
  }, []);

  const selectedItem = useMemo<PracticeItem>(() => {
    return (
      assignment.items.find((item) => item.id === selectedItemId) ||
      assignment.items[0] ||
      mockAssignment.items[0]
    );
  }, [assignment, selectedItemId]);

  async function handleFeedback(newFeedback: PronunciationFeedback) {
    setFeedback(newFeedback);

    if (isAttemptSuccessful(newFeedback)) {
      setCorrectCount((current) =>
        Math.min(current + 1, assignment.requiredCorrectRepetitions)
      );
    }

    try {
      const attemptId = await createPracticeAttempt({
        patientId: DEMO_PATIENT_ID,
        assignmentId: assignment.id,
        itemId: selectedItem.id,
        targetSound: selectedItem.targetSound,
        expectedResponse: selectedItem.expectedResponse,
        practiceLevel: selectedItem.level,
        feedback: newFeedback,
        isCorrect: newFeedback.isCorrect,
        accuracyScore: newFeedback.accuracyScore,
      });

      console.log("Practice attempt saved:", attemptId);
    } catch (error) {
      console.error("Failed to save practice attempt:", error);
    }
  }

  function handleSelectItem(itemId: string) {
    setSelectedItemId(itemId);
    setFeedback(null);
    setCorrectCount(0);
  }

  function handlePlayTarget() {
    if (typeof window === "undefined") return;

    const utterance = new SpeechSynthesisUtterance(
      selectedItem.expectedResponse
    );
    utterance.rate = 0.75;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  if (isLoadingAssignment) {
    return (
      <PatientShell active="practice">
        <section className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-6 pt-8">
          <p className="text-sm text-gray-500">Vocalize.it Practice</p>
          <h1 className="mt-2 text-3xl font-light text-gray-900">
            Loading assignment...
          </h1>
          <p className="mt-2 text-gray-500">Preparing your practice session.</p>
        </section>
      </PatientShell>
    );
  }

  return (
    <PatientShell active="practice">
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="mx-auto max-w-md px-6 pt-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h1 className="mb-1 text-3xl font-light text-gray-900">
              Speech Practice
            </h1>

            <div className="flex flex-wrap items-center gap-2">
              <p className="text-gray-500">
                {practiceLevelLabels[selectedItem.level]}
              </p>

              <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-500 shadow-sm">
                Source: {assignmentSource}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <div className="mb-6 text-center">
              <h2 className="mb-2 text-sm text-gray-500">Target Word</h2>

              <p className="mb-4 text-5xl font-light text-gray-900">
                {formatTargetWord(selectedItem.expectedResponse)}
              </p>

              <button
                type="button"
                onClick={handlePlayTarget}
                className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-teal-50 text-teal-600 transition hover:bg-teal-100 hover:text-teal-700"
                aria-label="Play target word"
              >
                <Volume2 className="h-6 w-6" />
              </button>
            </div>

            <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-purple-50 p-5">
              <div className="flex items-start gap-3">
                <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />

                <div>
                  <h3 className="mb-1 text-sm font-medium text-gray-900">
                    Articulation Guidance
                  </h3>

                  <p className="text-sm text-gray-600">
                    {selectedItem.mouthTip ||
                      "Say the sound slowly and clearly. Keep your airflow steady and focus on one target at a time."}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
                Practice items
              </p>

              <div className="flex gap-2 overflow-x-auto pb-1">
                {assignment.items.map((item) => {
                  const selected = item.id === selectedItem.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectItem(item.id)}
                      className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition ${
                        selected
                          ? "bg-gradient-to-r from-teal-500 to-blue-500 text-white shadow-sm"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {item.expectedResponse}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <h3 className="mb-4 font-medium text-gray-900">
              Mouth Positioning
            </h3>

            <div className="mb-4 rounded-2xl bg-gradient-to-br from-teal-50 to-blue-50 p-6">
              <div className="flex items-center justify-center">
                <svg viewBox="0 0 200 150" className="w-full max-w-xs">
                  <ellipse
                    cx="100"
                    cy="75"
                    rx="80"
                    ry="50"
                    fill="#FDE8E9"
                    stroke="#E5989B"
                    strokeWidth="2"
                  />

                  <path
                    d="M 40 75 Q 100 85 160 75"
                    fill="none"
                    stroke="#B5838D"
                    strokeWidth="3"
                  />

                  <path
                    d="M 70 75 Q 75 65 80 75"
                    fill="#FFB4A2"
                    stroke="#E5989B"
                    strokeWidth="2"
                  />

                  <motion.path
                    d="M 85 75 L 115 75"
                    stroke="#14B8A6"
                    strokeWidth="3"
                    strokeDasharray="4 2"
                    animate={{
                      x: [0, 15, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <text
                    x="100"
                    y="140"
                    fontSize="10"
                    fill="#6B7280"
                    textAnchor="middle"
                  >
                    Airflow direction →
                  </text>
                </svg>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-600">Tongue position:</span>
                <span className="text-right font-medium text-gray-900">
                  Behind upper teeth
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-600">Lip shape:</span>
                <span className="text-right font-medium text-gray-900">
                  Slightly rounded
                </span>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-600">Airflow:</span>
                <span className="text-right font-medium text-teal-600">
                  Strong & steady
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 rounded-3xl bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-gray-900">Live Recording</h3>

              <div className="flex items-center gap-2">
                <RotateCcw className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">
                  {correctCount}/{assignment.requiredCorrectRepetitions}
                </span>
              </div>
            </div>

            <AudioRecorder
              practiceItem={selectedItem}
              onFeedback={handleFeedback}
              onLoadingChange={setIsLoadingFeedback}
            />

            <p className="mt-4 text-center text-sm text-gray-500">
              Speak clearly and at your own pace.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-6"
          >
            <FeedbackCard
              feedback={feedback}
              isLoading={isLoadingFeedback}
              correctCount={correctCount}
              requiredCount={assignment.requiredCorrectRepetitions}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="pb-8"
          >
            <Link
              href="/patient/analytics"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 px-6 py-4 font-medium text-white shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              View Progress
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </div>
    </PatientShell>
  );
}