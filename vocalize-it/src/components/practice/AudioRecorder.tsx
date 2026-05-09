"use client";

import { useRef, useState } from "react";
import type { PracticeItem, PronunciationFeedback } from "@/types/practice";
import WaveformDisplay from "./WaveformDisplay";

type AudioRecorderProps = {
  practiceItem: PracticeItem;
  onFeedback: (feedback: PronunciationFeedback) => void;
  onLoadingChange?: (isLoading: boolean) => void;
};

export default function AudioRecorder({
  practiceItem,
  onFeedback,
  onLoadingChange,
}: AudioRecorderProps) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState("");

  async function startRecording() {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data);
        }
      };

      recorder.onstop = async () => {
        await submitRecording();

        stream.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      };

      recorder.start();
      setIsRecording(true);
    } catch (err) {
      console.error(err);
      setError(
        "Microphone access was blocked. Please allow microphone permission and try again."
      );
    }
  }

  function stopRecording() {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    setIsRecording(false);
  }

  async function submitRecording() {
    try {
      onLoadingChange?.(true);

      const audioBlob = new Blob(chunksRef.current, {
        type: "audio/webm",
      });

      const formData = new FormData();
      formData.append("audio", audioBlob, "recording.webm");
      formData.append("expectedResponse", practiceItem.expectedResponse);
      formData.append("targetSound", practiceItem.targetSound);
      formData.append("practiceLevel", practiceItem.level);

      const response = await fetch("/api/gemini/pronunciation", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to analyse recording.");
      }

      const data = await response.json();

      if (!data.feedback) {
        throw new Error("No feedback returned.");
      }

      onFeedback(data.feedback);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while analysing your recording.");
    } finally {
      onLoadingChange?.(false);
    }
  }

  return (
    <section className="space-y-4">
      <WaveformDisplay isRecording={isRecording} />

      <div className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Record Your Attempt</p>

        <div className="mt-4 flex gap-3">
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
            >
              Start Recording
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-red-700"
            >
              Stop Recording
            </button>
          )}
        </div>

        <p className="mt-3 text-sm text-gray-600">
          Keep your recording short and say only the target prompt.
        </p>

        {error && (
          <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}