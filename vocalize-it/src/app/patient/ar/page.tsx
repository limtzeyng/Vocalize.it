"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Camera, Mic, X, Scan, CircleDot, Sparkles } from "lucide-react";

import AudioRecorder from "@/components/practice/AudioRecorder";
import FeedbackCard from "@/components/practice/FeedbackCard";
import PatientShell from "@/components/patient/PatientShell";
import { createPracticeAttempt } from "@/lib/firebaseAttempts";
import type {
  ObjectPracticeResult,
  PracticeItem,
  PronunciationFeedback,
} from "@/types/practice";

const DEMO_PATIENT_ID = "patient-001";

const objectPhrases: Record<string, string[]> = {
  spoon: [
    "Can you pass the spoon?",
    "I need a spoon, please.",
    "Where is my spoon?",
  ],
  sofa: [
    "Move me to the sofa.",
    "I want to sit on the sofa.",
    "Is the sofa comfortable?",
  ],
  sink: [
    "Turn on the sink.",
    "The sink is over there.",
    "Can you help me at the sink?",
  ],
  cup: [
    "Can I have the cup?",
    "Please pass me the cup.",
    "The cup is on the table.",
  ],
  chair: [
    "I want to sit on the chair.",
    "Move the chair closer.",
    "This chair is comfortable.",
  ],
  bottle: [
    "I need my water bottle.",
    "Please open the bottle.",
    "Where is my bottle?",
  ],
};

function normaliseObjectName(name: string) {
  return name.toLowerCase().trim();
}

function createFunctionalPracticeItem(phrase: string): PracticeItem {
  return {
    id: `ar-functional-${phrase.toLowerCase().replace(/\s+/g, "-")}`,
    targetSound: "functional",
    level: "functional_phrase",
    promptText: `Say: ${phrase}`,
    expectedResponse: phrase,
    mouthTip:
      "Say the phrase slowly and clearly. Focus on making each word understandable.",
  };
}

export default function ARConversationCoachPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [cameraError, setCameraError] = useState("");

  const [detectedObject, setDetectedObject] = useState<string | null>(null);
  const [objectResult, setObjectResult] = useState<ObjectPracticeResult | null>(
    null
  );

  const [selectedPhrase, setSelectedPhrase] = useState("");
  const [feedback, setFeedback] = useState<PronunciationFeedback | null>(null);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  const currentPhrases = useMemo(() => {
    if (!detectedObject) return [];

    const key = normaliseObjectName(detectedObject);
    const defaultPhrases = objectPhrases[key] ?? [
      `Can you pass the ${detectedObject}?`,
      `I need the ${detectedObject}, please.`,
      `Where is the ${detectedObject}?`,
    ];

    if (objectResult?.phrase && !defaultPhrases.includes(objectResult.phrase)) {
      return [objectResult.phrase, ...defaultPhrases].slice(0, 3);
    }

    return defaultPhrases.slice(0, 3);
  }, [detectedObject, objectResult]);

  const selectedPracticeItem = useMemo(() => {
    if (!selectedPhrase) return null;
    return createFunctionalPracticeItem(selectedPhrase);
  }, [selectedPhrase]);

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  async function startCamera() {
    try {
      setCameraError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
        },
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraOn(true);
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(
        "Camera access was blocked. Please allow camera permission and try again."
      );
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOn(false);
  }

  async function captureAndDetectObject() {
    try {
      if (!videoRef.current || !canvasRef.current) return;

      setIsDetecting(true);
      setCameraError("");
      setSelectedPhrase("");
      setFeedback(null);

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth || 720;
      canvas.height = video.videoHeight || 1280;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not create image capture context.");
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
      });

      if (!imageBlob) {
        throw new Error("Could not capture image from camera.");
      }

      const formData = new FormData();
      formData.append("image", imageBlob, "ar-snapshot.jpg");

      const response = await fetch("/api/gemini/object-detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Object detection failed.");
      }

      const data = await response.json();
      const result = data.result as ObjectPracticeResult;

      setObjectResult(result);
      setDetectedObject(result.object || "object");
    } catch (error) {
      console.error("Object detection error:", error);
      setCameraError(
        error instanceof Error
          ? error.message
          : "Something went wrong while detecting the object."
      );
    } finally {
      setIsDetecting(false);
    }
  }

  async function handleFeedback(newFeedback: PronunciationFeedback) {
    setFeedback(newFeedback);

    if (!selectedPracticeItem) return;

    try {
      const attemptId = await createPracticeAttempt({
        patientId: DEMO_PATIENT_ID,
        assignmentId: "ar-object-practice",
        itemId: selectedPracticeItem.id,
        targetSound: selectedPracticeItem.targetSound,
        expectedResponse: selectedPracticeItem.expectedResponse,
        practiceLevel: selectedPracticeItem.level,
        feedback: newFeedback,
        isCorrect: newFeedback.isCorrect,
        accuracyScore: newFeedback.accuracyScore,
      });

      console.log("AR practice attempt saved:", attemptId);
    } catch (error) {
      console.error("Failed to save AR practice attempt:", error);
    }
  }

  return (
    <PatientShell active="ar">
      <div className="min-h-screen bg-black">
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-950">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover opacity-70"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Camera className="mx-auto mb-4 h-24 w-24 opacity-30" />
                  <p className="text-sm">Camera preview loading</p>
                  <p className="mt-2 text-xs">Point at household objects</p>
                </div>
              </div>
            )}

            <canvas ref={canvasRef} className="hidden" />

            <div className="absolute inset-0 bg-black/20" />

            {detectedObject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute left-1/2 top-[30%] -translate-x-1/2 -translate-y-1/2"
              >
                <div className="relative">
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0 0px rgba(20, 184, 166, 0.4)",
                        "0 0 0 20px rgba(20, 184, 166, 0)",
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                    }}
                    className="flex h-32 w-32 items-center justify-center rounded-2xl border-4 border-teal-400 bg-teal-400/10 backdrop-blur-sm"
                  >
                    <Scan className="h-12 w-12 text-teal-400" />
                  </motion.div>

                  <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <div className="rounded-full bg-teal-500 px-4 py-2 text-sm font-medium text-white">
                      {detectedObject} detected
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-6">
            <Link
              href="/patient"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm"
            >
              <X className="h-6 w-6 text-white" />
            </Link>

            <div className="rounded-full bg-black/40 px-4 py-2 backdrop-blur-sm">
              <p className="text-sm font-medium text-white">AR Mode Active</p>
            </div>

            <button
              type="button"
              onClick={captureAndDetectObject}
              disabled={isDetecting || !isCameraOn}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500 text-white shadow-lg disabled:bg-gray-500"
              aria-label="Detect object"
            >
              {isDetecting ? (
                <Sparkles className="h-5 w-5 animate-pulse" />
              ) : (
                <Scan className="h-5 w-5" />
              )}
            </button>
          </div>

          {!detectedObject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-32 left-0 right-0 px-6"
            >
              <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <h3 className="mb-2 flex items-center gap-2 font-semibold text-gray-900">
                  <Scan className="h-5 w-5 text-teal-600" />
                  Find an object
                </h3>

                <p className="text-sm text-gray-600">
                  Point your camera at an everyday object, then tap the scan
                  button to create functional speech phrases.
                </p>

                <button
                  type="button"
                  onClick={captureAndDetectObject}
                  disabled={isDetecting || !isCameraOn}
                  className="mt-5 w-full rounded-2xl bg-gradient-to-r from-teal-500 to-blue-500 px-5 py-4 font-medium text-white shadow-lg transition hover:shadow-xl disabled:bg-gray-400"
                >
                  {isDetecting ? "Detecting..." : "Scan Object"}
                </button>

                {cameraError && (
                  <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    {cameraError}
                  </p>
                )}
              </div>
            </motion.div>
          )}

          {detectedObject && (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-28 left-0 right-0 max-h-[55vh] overflow-y-auto px-6"
            >
              <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <h3 className="mb-3 flex items-center gap-2 font-semibold text-gray-900">
                  <CircleDot className="h-5 w-5 text-teal-600" />
                  Try saying:
                </h3>

                <div className="space-y-2">
                  {currentPhrases.map((phrase) => (
                    <button
                      key={phrase}
                      type="button"
                      onClick={() => {
                        setSelectedPhrase(phrase);
                        setFeedback(null);
                      }}
                      className={`w-full rounded-xl border p-4 text-left transition-all duration-200 hover:scale-[1.02] ${
                        selectedPhrase === phrase
                          ? "border-teal-400 bg-teal-50"
                          : "border-teal-100 bg-gradient-to-r from-teal-50 to-blue-50 hover:border-teal-300"
                      }`}
                    >
                      <p className="font-medium text-gray-900">{phrase}</p>
                    </button>
                  ))}
                </div>

                {selectedPracticeItem && (
                  <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-700">
                        Record phrase
                      </p>
                      <Mic className="h-5 w-5 text-teal-600" />
                    </div>

                    <AudioRecorder
                      practiceItem={selectedPracticeItem}
                      onFeedback={handleFeedback}
                      onLoadingChange={setIsLoadingFeedback}
                    />
                  </div>
                )}

                {(feedback || isLoadingFeedback) && (
                  <div className="mt-4">
                    <FeedbackCard
                      feedback={feedback}
                      isLoading={isLoadingFeedback}
                      correctCount={feedback?.isCorrect ? 1 : 0}
                      requiredCount={1}
                    />
                  </div>
                )}

                {cameraError && (
                  <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                    {cameraError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={captureAndDetectObject}
                  disabled={isDetecting || !isCameraOn}
                  className="mt-5 w-full rounded-2xl border border-gray-200 bg-white px-5 py-3 text-sm font-medium text-gray-800 transition hover:bg-gray-50 disabled:text-gray-400"
                >
                  {isDetecting ? "Scanning..." : "Scan another object"}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PatientShell>
  );
}