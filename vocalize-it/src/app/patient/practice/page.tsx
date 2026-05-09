// "use client";

// import { useEffect, useMemo, useState } from "react";
// import AudioRecorder from "@/components/practice/AudioRecorder";
// import CameraPreview from "@/components/practice/CameraPreview";
// import FeedbackCard from "@/components/practice/FeedbackCard";
// import MouthGuide from "@/components/practice/MouthGuide";
// import RepetitionCounter from "@/components/practice/RepetitionCounter";
// import { mockAssignment } from "@/data/practiceBank";
// import { createPracticeAttempt } from "@/lib/firebaseAttempts";
// import { getAssignmentsForPatient } from "@/lib/firebaseAssignments";
// import { isAttemptSuccessful } from "@/lib/scoring";
// import { practiceLevelLabels } from "@/lib/therapyLevels";
// import type {
//   ObjectPracticeResult,
//   PracticeItem,
//   PronunciationFeedback,
//   TherapyAssignment,
// } from "@/types/practice";

// const DEMO_PATIENT_ID = "patient-001";

// export default function PracticePage() {
//   const [assignment, setAssignment] =
//     useState<TherapyAssignment>(mockAssignment);

//   const [selectedItemId, setSelectedItemId] = useState(
//     mockAssignment.items[0]?.id
//   );

//   const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
//   const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [objectPracticeResult, setObjectPracticeResult] =
//     useState<ObjectPracticeResult | null>(null);

//   const [isLoadingAssignment, setIsLoadingAssignment] = useState(true);
//   const [assignmentSource, setAssignmentSource] = useState<"firebase" | "mock">(
//     "mock"
//   );

//   useEffect(() => {
//     async function loadAssignment() {
//       try {
//         const firebaseAssignments =
//           await getAssignmentsForPatient(DEMO_PATIENT_ID);

//         if (firebaseAssignments.length > 0) {
//           const latestAssignment = firebaseAssignments[0];

//           setAssignment(latestAssignment);
//           setSelectedItemId(latestAssignment.items[0]?.id);
//           setAssignmentSource("firebase");
//         } else {
//           setAssignment(mockAssignment);
//           setSelectedItemId(mockAssignment.items[0]?.id);
//           setAssignmentSource("mock");
//         }
//       } catch (error) {
//         console.error("Failed to load Firebase assignment:", error);

//         setAssignment(mockAssignment);
//         setSelectedItemId(mockAssignment.items[0]?.id);
//         setAssignmentSource("mock");
//       } finally {
//         setIsLoadingAssignment(false);
//       }
//     }

//     loadAssignment();
//   }, []);

//   const selectedItem = useMemo<PracticeItem>(() => {
//     return (
//       assignment.items.find((item) => item.id === selectedItemId) ||
//       assignment.items[0]
//     );
//   }, [assignment, selectedItemId]);

//   async function handleFeedback(newFeedback: PronunciationFeedback) {
//     setFeedback(newFeedback);

//     const successful = isAttemptSuccessful(newFeedback);

//     if (successful) {
//       setCorrectCount((current) =>
//         Math.min(current + 1, assignment.requiredCorrectRepetitions)
//       );
//     }

//     try {
//       const attemptId = await createPracticeAttempt({
//         patientId: DEMO_PATIENT_ID,
//         assignmentId: assignment.id,
//         itemId: selectedItem.id,
//         expectedResponse: selectedItem.expectedResponse,
//         targetSound: selectedItem.targetSound,
//         practiceLevel: selectedItem.level,
//         feedback: newFeedback,
//         isCorrect: successful,
//         accuracyScore: newFeedback.accuracyScore,
//       });

//       console.log("Practice attempt saved:", attemptId);
//     } catch (error) {
//       console.error("Failed to save practice attempt:", error);
//     }
//   }

//   function handleSelectItem(itemId: string) {
//     setSelectedItemId(itemId);
//     setFeedback(null);
//     setCorrectCount(0);
//   }

//   function handleObjectDetected(result: ObjectPracticeResult) {
//     setObjectPracticeResult(result);
//   }

//   if (isLoadingAssignment) {
//     return (
//       <main className="min-h-screen bg-gray-50 px-5 py-8">
//         <div className="mx-auto max-w-6xl">
//           <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
//             Vocalize.it Patient Practice
//           </p>
//           <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
//             Loading assignment...
//           </h1>
//           <p className="mt-3 text-gray-600">
//             Preparing your practice session.
//           </p>
//         </div>
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-gray-50 px-5 py-8">
//       <div className="mx-auto max-w-6xl">
//         <header className="mb-8">
//           <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
//             Vocalize.it Patient Practice
//           </p>

//           <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-950">
//             {assignment.title}
//           </h1>

//           <p className="mt-3 max-w-2xl text-gray-600">
//             Practise your assigned sound at home. Record your attempt and get
//             AI-assisted feedback to help guide your next try.
//           </p>

//           <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600">
//             Assignment source: {assignmentSource}
//           </p>
//         </header>

//         <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
//           <section className="space-y-6">
//             <div className="rounded-3xl border bg-white p-6 shadow-sm">
//               <div className="flex flex-wrap items-start justify-between gap-4">
//                 <div>
//                   <p className="text-sm font-medium text-gray-500">
//                     Current Prompt
//                   </p>

//                   <h2 className="mt-2 text-5xl font-bold text-gray-950">
//                     {selectedItem.expectedResponse}
//                   </h2>

//                   <p className="mt-3 text-lg text-gray-700">
//                     {selectedItem.promptText}
//                   </p>
//                 </div>

//                 <span className="rounded-full bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
//                   {practiceLevelLabels[selectedItem.level]}
//                 </span>
//               </div>

//               <div className="mt-6 rounded-2xl bg-gray-50 p-4">
//                 <p className="text-sm font-medium text-gray-500">
//                   Listen and repeat
//                 </p>
//                 <p className="mt-1 text-gray-700">
//                   Say the prompt clearly, then stop the recording when you are
//                   done.
//                 </p>
//               </div>
//             </div>

//             <AudioRecorder
//               practiceItem={selectedItem}
//               onFeedback={handleFeedback}
//               onLoadingChange={setIsLoadingFeedback}
//             />

//             <FeedbackCard
//               feedback={feedback}
//               isLoading={isLoadingFeedback}
//               correctCount={correctCount}
//               requiredCount={assignment.requiredCorrectRepetitions}
//             />
//           </section>

//           <aside className="space-y-6">
//             <RepetitionCounter
//               correctCount={correctCount}
//               requiredCount={assignment.requiredCorrectRepetitions}
//             />

//             <MouthGuide
//               targetSound={selectedItem.targetSound}
//               tip={selectedItem.mouthTip}
//             />

//             <section className="rounded-2xl border bg-white p-5 shadow-sm">
//               <p className="text-sm font-medium text-gray-500">
//                 Practice List
//               </p>

//               <div className="mt-4 space-y-2">
//                 {assignment.items.map((item) => {
//                   const selected = item.id === selectedItem.id;

//                   return (
//                     <button
//                       key={item.id}
//                       type="button"
//                       onClick={() => handleSelectItem(item.id)}
//                       className={`w-full rounded-xl border px-4 py-3 text-left transition ${
//                         selected
//                           ? "border-black bg-black text-white"
//                           : "border-gray-200 bg-white text-gray-800 hover:bg-gray-50"
//                       }`}
//                     >
//                       <div className="flex items-center justify-between gap-3">
//                         <span className="font-medium">
//                           {item.expectedResponse}
//                         </span>

//                         <span
//                           className={`text-xs ${
//                             selected ? "text-gray-200" : "text-gray-500"
//                           }`}
//                         >
//                           {practiceLevelLabels[item.level]}
//                         </span>
//                       </div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </section>
//           </aside>
//         </div>

//         <section className="mt-8">
//           <CameraPreview onObjectDetected={handleObjectDetected} />

//           {objectPracticeResult && (
//             <div className="mt-4 rounded-2xl border bg-white p-5 shadow-sm">
//               <p className="text-sm font-medium text-gray-500">
//                 AR-inspired Practice Prompt
//               </p>

//               <h2 className="mt-2 text-2xl font-bold text-gray-900">
//                 Say: “{objectPracticeResult.phrase}”
//               </h2>

//               <p className="mt-2 text-gray-600">
//                 This connects speech practice to real objects around the
//                 patient&apos;s home.
//               </p>
//             </div>
//           )}
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Info,
  RotateCcw,
  Volume2,
} from "lucide-react";

import AudioRecorder from "@/components/practice/AudioRecorder";
import CameraPreview from "@/components/practice/CameraPreview";
import FeedbackCard from "@/components/practice/FeedbackCard";
import MouthGuide from "@/components/practice/MouthGuide";
import RepetitionCounter from "@/components/practice/RepetitionCounter";

import { mockAssignment } from "@/data/practiceBank";
import { createPracticeAttempt } from "@/lib/firebaseAttempts";
import { getAssignmentsForPatient } from "@/lib/firebaseAssignments";
import { isAttemptSuccessful } from "@/lib/scoring";
import { practiceLevelLabels } from "@/lib/therapyLevels";

import type {
  ObjectPracticeResult,
  PracticeItem,
  PronunciationFeedback,
  TherapyAssignment,
} from "@/types/practice";

const DEMO_PATIENT_ID = "patient-001";

export default function PracticePage() {
  const [assignment, setAssignment] =
    useState<TherapyAssignment>(mockAssignment);

  const [selectedItemId, setSelectedItemId] = useState(
    mockAssignment.items[0]?.id
  );

  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);

  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const [correctCount, setCorrectCount] = useState(0);

  const [objectPracticeResult, setObjectPracticeResult] =
    useState<ObjectPracticeResult | null>(null);

  const [isLoadingAssignment, setIsLoadingAssignment] = useState(true);

  const [assignmentSource, setAssignmentSource] = useState<
    "firebase" | "mock"
  >("mock");

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
      assignment.items[0]
    );
  }, [assignment, selectedItemId]);

  async function handleFeedback(newFeedback: PronunciationFeedback) {
    setFeedback(newFeedback);

    const successful = isAttemptSuccessful(newFeedback);

    if (successful) {
      setCorrectCount((current) =>
        Math.min(current + 1, assignment.requiredCorrectRepetitions)
      );
    }

    try {
      const attemptId = await createPracticeAttempt({
        patientId: DEMO_PATIENT_ID,
        assignmentId: assignment.id,
        itemId: selectedItem.id,
        expectedResponse: selectedItem.expectedResponse,
        targetSound: selectedItem.targetSound,
        practiceLevel: selectedItem.level,
        feedback: newFeedback,
        isCorrect: successful,
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

  function handleObjectDetected(result: ObjectPracticeResult) {
    setObjectPracticeResult(result);
  }

  if (isLoadingAssignment) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 px-5 py-10">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-3xl border border-white/50 bg-white/80 p-8 shadow-xl backdrop-blur">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Vocalize.it
            </p>

            <h1 className="mt-3 text-4xl font-light text-slate-900">
              Loading assignment...
            </h1>

            <p className="mt-3 text-slate-600">
              Preparing your speech therapy session.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-4 py-8 md:px-6">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
                Vocalize.it Patient Practice
              </p>

              <h1 className="mt-2 text-4xl font-light tracking-tight text-slate-900 md:text-5xl">
                {assignment.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                Practise your assigned sound at home. Record your attempt and
                receive AI-assisted feedback to improve pronunciation and speech
                confidence.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Assignment Source
              </p>

              <p className="mt-1 font-medium text-slate-700 capitalize">
                {assignmentSource}
              </p>
            </div>
          </div>
        </header>

        {/* MAIN GRID */}
        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          {/* LEFT SIDE */}
          <section className="space-y-6">
            {/* CURRENT PROMPT */}
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-7 shadow-xl backdrop-blur">
              <div className="flex flex-wrap items-start justify-between gap-5">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Current Prompt
                  </p>

                  <h2 className="mt-3 text-6xl font-semibold tracking-tight text-slate-950">
                    {selectedItem.expectedResponse}
                  </h2>

                  <p className="mt-4 text-xl text-slate-700">
                    {selectedItem.promptText}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">
                  {practiceLevelLabels[selectedItem.level]}
                </span>
              </div>

              <div className="mt-7 rounded-3xl bg-slate-50 p-5">
                <div className="flex gap-3">
                  <div className="mt-0.5">
                    <Info className="h-5 w-5 text-blue-500" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-700">
                      Listen and repeat
                    </p>

                    <p className="mt-1 text-slate-600">
                      Say the prompt clearly, then stop the recording when you
                      are done.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AUDIO RECORDER */}
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">
                    Voice Activity
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Record your voice to receive feedback.
                  </p>
                </div>

                <div className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {isLoadingFeedback ? "Analyzing" : "Idle"}
                </div>
              </div>

              <div className="rounded-3xl bg-slate-50 p-5">
                <AudioRecorder
                  practiceItem={selectedItem}
                  onFeedback={handleFeedback}
                  onLoadingChange={setIsLoadingFeedback}
                />
              </div>

              <p className="mt-4 text-sm text-slate-500">
                Keep your recording short and say only the target prompt.
              </p>
            </div>

            {/* FEEDBACK */}
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">
                  Feedback
                </h3>

                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <RotateCcw className="h-4 w-4" />
                  Live Analysis
                </div>
              </div>

              <FeedbackCard
                feedback={feedback}
                isLoading={isLoadingFeedback}
                correctCount={correctCount}
                requiredCount={assignment.requiredCorrectRepetitions}
              />
            </div>
          </section>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">
            {/* REP COUNTER */}
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <RepetitionCounter
                correctCount={correctCount}
                requiredCount={assignment.requiredCorrectRepetitions}
              />
            </div>

            {/* MOUTH GUIDE */}
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <div className="mb-5 flex items-center gap-3">
                <div className="rounded-2xl bg-purple-100 p-3">
                  <Volume2 className="h-5 w-5 text-purple-700" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Mouth Guide</p>

                  <h3 className="text-2xl font-semibold text-slate-900">
                    Sound: /{selectedItem.targetSound}/
                  </h3>
                </div>
              </div>

              <MouthGuide
                targetSound={selectedItem.targetSound}
                tip={selectedItem.mouthTip}
              />
            </div>

            {/* PRACTICE LIST */}
            <section className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <div className="mb-5">
                <p className="text-sm font-medium text-slate-500">
                  Practice List
                </p>
              </div>

              <div className="space-y-3">
                {assignment.items.map((item) => {
                  const selected = item.id === selectedItem.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleSelectItem(item.id)}
                      className={`group w-full rounded-2xl border px-5 py-4 text-left transition-all duration-200 ${
                        selected
                          ? "border-black bg-black text-white shadow-lg"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-2xl font-semibold tracking-tight">
                            {item.expectedResponse}
                          </p>
                        </div>

                        <div
                          className={`text-sm ${
                            selected
                              ? "text-slate-300"
                              : "text-slate-500"
                          }`}
                        >
                          {practiceLevelLabels[item.level]}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          </aside>
        </div>

        {/* CAMERA PREVIEW */}
        <section className="mt-8 space-y-5">
          <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-slate-900">
                  Camera Practice
                </h3>

                <p className="mt-1 text-slate-500">
                  Connect speech therapy with real-world objects around you.
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 px-5 py-3 text-sm font-medium text-white shadow-lg transition hover:scale-[1.02]">
                Continue
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <CameraPreview onObjectDetected={handleObjectDetected} />
          </div>

          {objectPracticeResult && (
            <div className="rounded-[32px] border border-white/60 bg-white/90 p-6 shadow-xl backdrop-blur">
              <p className="text-sm font-medium text-slate-500">
                AR-inspired Practice Prompt
              </p>

              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">
                Say: “{objectPracticeResult.phrase}”
              </h2>

              <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
                This activity links speech practice with familiar objects in the
                patient&apos;s environment to encourage natural communication.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}