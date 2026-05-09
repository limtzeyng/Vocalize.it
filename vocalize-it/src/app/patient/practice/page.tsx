"use client";

import { useMemo, useState } from "react";
import AudioRecorder from "@/components/practice/AudioRecorder";
import CameraPreview from "@/components/practice/CameraPreview";
import FeedbackCard from "@/components/practice/FeedbackCard";
import MouthGuide from "@/components/practice/MouthGuide";
import RepetitionCounter from "@/components/practice/RepetitionCounter";
import { mockAssignment } from "@/data/practiceBank";
import { isAttemptSuccessful } from "@/lib/scoring";
import { practiceLevelLabels } from "@/lib/therapyLevels";
import type {
  ObjectPracticeResult,
  PracticeItem,
  PronunciationFeedback,
} from "@/types/practice";

export default function PracticePage() {
  const [selectedItemId, setSelectedItemId] = useState(
    mockAssignment.items[0]?.id
  );

  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [objectPracticeResult, setObjectPracticeResult] =
    useState<ObjectPracticeResult | null>(null);

  const selectedItem = useMemo<PracticeItem>(() => {
    return (
      mockAssignment.items.find((item) => item.id === selectedItemId) ||
      mockAssignment.items[0]
    );
  }, [selectedItemId]);

  function handleFeedback(newFeedback: PronunciationFeedback) {
    setFeedback(newFeedback);

    if (isAttemptSuccessful(newFeedback)) {
      setCorrectCount((current) =>
        Math.min(current + 1, mockAssignment.requiredCorrectRepetitions)
      );
    }
  }

  function handleSelectItem(itemId: string) {
    setSelectedItemId(itemId);
    setFeedback(null);
    setCorrectCount(0);
  }

  function handleObjectDetected(result: ObjectPracticeResult) {
    setObjectPracticeResult(result);
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
            Vocalize.it Patient Practice
          </p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
            {mockAssignment.title}
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Practise your assigned sound at home. Record your attempt and get
            AI-assisted feedback to help guide your next try.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Current Prompt
                  </p>
                  <h2 className="mt-2 text-5xl font-bold text-gray-950">
                    {selectedItem.expectedResponse}
                  </h2>
                  <p className="mt-3 text-lg text-gray-700">
                    {selectedItem.promptText}
                  </p>
                </div>

                <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
                  {practiceLevelLabels[selectedItem.level]}
                </span>
              </div>

              <div className="mt-6 rounded-2xl bg-gray-50 p-4">
                <p className="text-sm font-medium text-gray-500">
                  Listen and repeat
                </p>
                <p className="mt-1 text-gray-700">
                  Say the prompt clearly, then stop the recording when you are
                  done.
                </p>
              </div>
            </div>

            <AudioRecorder
              practiceItem={selectedItem}
              onFeedback={handleFeedback}
              onLoadingChange={setIsLoadingFeedback}
            />

            <FeedbackCard
              feedback={feedback}
              isLoading={isLoadingFeedback}
              correctCount={correctCount}
              requiredCount={mockAssignment.requiredCorrectRepetitions}
            />
          </section>

          <aside className="space-y-6">
            <RepetitionCounter
              correctCount={correctCount}
              requiredCount={mockAssignment.requiredCorrectRepetitions}
            />

            <MouthGuide
              targetSound={selectedItem.targetSound}
              tip={selectedItem.mouthTip}
            />

            <section className="rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                Practice List
              </p>
              <div className="mt-4 space-y-2">
                {mockAssignment.items.map((item) => {
                  const selected = item.id === selectedItem.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectItem(item.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition ${
                        selected
                          ? "border-black bg-black text-white"
                          : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {item.expectedResponse}
                        </span>
                        <span
                          className={`text-xs ${
                            selected ? "text-gray-200" : "text-gray-500"
                          }`}
                        >
                          {practiceLevelLabels[item.level]}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>

        <section className="mt-8">
          <CameraPreview onObjectDetected={handleObjectDetected} />

          {objectPracticeResult && (
            <div className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
              <p className="text-sm font-medium text-gray-500">
                AR-inspired Practice Prompt
              </p>
              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                Say: “{objectPracticeResult.phrase}”
              </h2>
              <p className="mt-2 text-gray-600">
                This connects speech practice to real objects around the
                patient’s home.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}