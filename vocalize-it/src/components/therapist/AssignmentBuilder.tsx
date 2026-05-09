"use client";

import { useMemo, useState } from "react";
import { createAssignment } from "@/lib/firebaseAssignments";
import type {
  PracticeItem,
  PracticeLevel,
  PracticeType,
} from "@/types/practice";
import { practiceLevelLabels } from "@/lib/therapyLevels";

const targetSoundOptions = ["s", "p", "b", "m", "k", "g", "t", "d", "f", "sh"];

const practiceTypeOptions: {
  value: PracticeType;
  label: string;
  description: string;
}[] = [
  {
    value: "sound_hierarchy",
    label: "Sound Hierarchy",
    description:
      "Practise from isolated sounds to syllables, words, blends, and phrases.",
  },
  {
    value: "repetition_drill",
    label: "Repetition Drill",
    description:
      "Repeat sounds, syllables, and short words to support motor speech practice.",
  },
  {
    value: "functional_ar",
    label: "Functional Object Practice",
    description:
      "Use the camera to identify everyday objects and generate useful phrases.",
  },
];

const levelOptions: PracticeLevel[] = [
  "isolation",
  "syllable",
  "word_initial",
  "word_medial",
  "word_final",
  "blend",
  "phrase",
  "functional_phrase",
];

const sampleWordsBySound: Record<string, string[]> = {
  s: ["sssss", "sa", "sun", "soap", "pencil", "bus", "spoon", "star"],
  p: ["pa", "pa-pa", "paper", "paper clip", "pop", "puppy"],
  b: ["ba", "baby", "bubble", "book", "big ball"],
  m: ["mmm", "ma", "mama", "moon", "more milk"],
  k: ["ka", "key", "cookie", "cup", "take cake"],
  g: ["ga", "go", "goat", "green grapes"],
  t: ["ta", "tea", "table", "take turns"],
  d: ["da", "dog", "door", "daddy"],
  f: ["fff", "fan", "fish", "coffee"],
  sh: ["shhh", "shoe", "shell", "washing"],
};

function createPracticeItemsFromSelection(params: {
  targetSound: string;
  selectedLevels: PracticeLevel[];
  words: string[];
}): PracticeItem[] {
  const { targetSound, selectedLevels, words } = params;

  return words.map((word, index) => {
    const level = selectedLevels[index % selectedLevels.length] ?? "phrase";

    return {
      id: `${targetSound}-${level}-${index + 1}`,
      targetSound,
      level,
      promptText: `Say: ${word}`,
      expectedResponse: word,
      mouthTip:
        targetSound === "s"
          ? "Keep your tongue close to the ridge behind your teeth and let the air flow smoothly."
          : "Say the sound slowly and clearly.",
    };
  });
}

export default function AssignmentBuilder() {
  const [patientName, setPatientName] = useState("Avery Tan");
  const [patientId, setPatientId] = useState("patient-001");
  const [targetSound, setTargetSound] = useState("s");
  const [practiceType, setPracticeType] =
    useState<PracticeType>("sound_hierarchy");
  const [requiredRepetitions, setRequiredRepetitions] = useState(5);
  const [selectedLevels, setSelectedLevels] = useState<PracticeLevel[]>([
    "isolation",
    "syllable",
    "word_initial",
    "blend",
  ]);
  const [notes, setNotes] = useState(
    "Focus on clear sound production and short attempts."
  );

  const [savedMessage, setSavedMessage] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const previewWords = useMemo(() => {
    return sampleWordsBySound[targetSound] ?? [];
  }, [targetSound]);

  const previewItems = useMemo(() => {
    return createPracticeItemsFromSelection({
      targetSound,
      selectedLevels,
      words: previewWords,
    });
  }, [targetSound, selectedLevels, previewWords]);

  function toggleLevel(level: PracticeLevel) {
    setSavedMessage("");
    setError("");

    setSelectedLevels((current) => {
      if (current.includes(level)) {
        return current.filter((item) => item !== level);
      }

      return [...current, level];
    });
  }

  async function handleSaveAssignment() {
    try {
      setIsSaving(true);
      setSavedMessage("");
      setError("");

      if (!patientName.trim()) {
        throw new Error("Please enter a patient name.");
      }

      if (!patientId.trim()) {
        throw new Error("Please enter a patient ID.");
      }

      if (selectedLevels.length === 0) {
        throw new Error("Please select at least one difficulty level.");
      }

      const assignmentId = await createAssignment({
        patientId,
        patientName,
        therapistId: "therapist-001",
        title: `Practice the /${targetSound}/ sound`,
        targetSound,
        practiceType,
        requiredCorrectRepetitions: requiredRepetitions,
        levels: selectedLevels,
        items: previewItems,
        notes,
      });

      setSavedMessage(
        `Assignment saved to Firebase. Assignment ID: ${assignmentId}`
      );
    } catch (err) {
      console.error(err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while saving the assignment."
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
      <div className="space-y-6">
        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Patient</p>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-gray-700">
              Patient Name
            </span>
            <input
              value={patientName}
              onChange={(event) => {
                setPatientName(event.target.value);
                setSavedMessage("");
              }}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              placeholder="Enter patient name"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-gray-700">
              Patient ID
            </span>
            <input
              value={patientId}
              onChange={(event) => {
                setPatientId(event.target.value);
                setSavedMessage("");
              }}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              placeholder="Example: patient-001"
            />
          </label>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Target Sound</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Choose the sound to practise
          </h2>

          <div className="mt-4 flex flex-wrap gap-2">
            {targetSoundOptions.map((sound) => {
              const selected = sound === targetSound;

              return (
                <button
                  key={sound}
                  type="button"
                  onClick={() => {
                    setTargetSound(sound);
                    setSavedMessage("");
                  }}
                  className={`rounded-xl border px-4 py-2 text-sm font-medium transition ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  /{sound}/
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Practice Type</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Select assignment mode
          </h2>

          <div className="mt-4 grid gap-3">
            {practiceTypeOptions.map((option) => {
              const selected = option.value === practiceType;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    setPracticeType(option.value);
                    setSavedMessage("");
                  }}
                  className={`rounded-2xl border p-4 text-left transition ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  <p className="font-semibold">{option.label}</p>
                  <p
                    className={`mt-1 text-sm ${
                      selected ? "text-gray-200" : "text-gray-600"
                    }`}
                  >
                    {option.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Difficulty Levels</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Choose levels to include
          </h2>

          <div className="mt-4 grid gap-2 sm:grid-cols-2">
            {levelOptions.map((level) => {
              const selected = selectedLevels.includes(level);

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => toggleLevel(level)}
                  className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition ${
                    selected
                      ? "border-black bg-gray-950 text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:bg-gray-50"
                  }`}
                >
                  {practiceLevelLabels[level]}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">Goal</p>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-gray-700">
              Correct repetitions required per item
            </span>

            <input
              type="number"
              min={1}
              max={20}
              value={requiredRepetitions}
              onChange={(event) => {
                setRequiredRepetitions(Number(event.target.value));
                setSavedMessage("");
              }}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
            />
          </label>

          <label className="mt-4 block">
            <span className="text-sm font-medium text-gray-700">
              Therapist Notes
            </span>

            <textarea
              value={notes}
              onChange={(event) => {
                setNotes(event.target.value);
                setSavedMessage("");
              }}
              rows={4}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-black"
              placeholder="Add simple guidance for the patient"
            />
          </label>
        </div>
      </div>

      <aside className="space-y-6">
        <div className="sticky top-6 rounded-2xl border bg-white p-5 shadow-sm">
          <p className="text-sm font-medium text-gray-500">
            Assignment Preview
          </p>

          <h2 className="mt-2 text-2xl font-bold text-gray-900">
            /{targetSound}/ Practice
          </h2>

          <div className="mt-4 space-y-4">
            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">Patient</p>
              <p className="mt-1 font-semibold text-gray-900">{patientName}</p>
              <p className="mt-1 text-sm text-gray-500">{patientId}</p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">
                Correct Repetition Goal
              </p>
              <p className="mt-1 font-semibold text-gray-900">
                {requiredRepetitions} correct attempts per item
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">
                Selected Levels
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selectedLevels.length > 0 ? (
                  selectedLevels.map((level) => (
                    <span
                      key={level}
                      className="rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {practiceLevelLabels[level]}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">
                    No levels selected yet.
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">
                Example Practice Items
              </p>

              <div className="mt-2 space-y-2">
                {previewItems.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-800"
                  >
                    {item.expectedResponse}
                    <span className="ml-2 text-xs font-normal text-gray-500">
                      {practiceLevelLabels[item.level]}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm font-medium text-gray-500">Notes</p>
              <p className="mt-1 text-sm text-gray-700">{notes}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSaveAssignment}
            disabled={isSaving}
            className="mt-5 w-full rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isSaving ? "Saving..." : "Save Assignment to Firebase"}
          </button>

          {savedMessage && (
            <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700">
              {savedMessage}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <p className="mt-4 text-xs text-gray-500">
            This now saves to Firestore. You can check Firebase Console →
            Firestore Database → assignments.
          </p>
        </div>
      </aside>
    </section>
  );
}