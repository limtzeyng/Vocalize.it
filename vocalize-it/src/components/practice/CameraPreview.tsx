"use client";

import { useRef, useState } from "react";
import type { ObjectPracticeResult } from "@/types/practice";

type CameraPreviewProps = {
  onObjectDetected?: (result: ObjectPracticeResult) => void;
};

export default function CameraPreview({ onObjectDetected }: CameraPreviewProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [error, setError] = useState("");
  const [detectedResult, setDetectedResult] =
    useState<ObjectPracticeResult | null>(null);

  async function startCamera() {
    try {
      setError("");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setIsCameraOn(true);
    } catch (err) {
      console.error(err);
      setError(
        "Camera access was blocked. Please allow camera permission and try again."
      );
    }
  }

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setIsCameraOn(false);
  }

  async function captureAndDetect() {
    try {
      if (!videoRef.current || !canvasRef.current) return;

      setIsDetecting(true);
      setError("");

      const video = videoRef.current;
      const canvas = canvasRef.current;

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Could not create canvas context.");
      }

      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageBlob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg", 0.9);
      });

      if (!imageBlob) {
        throw new Error("Could not capture image.");
      }

      const formData = new FormData();
      formData.append("image", imageBlob, "snapshot.jpg");

      const response = await fetch("/api/gemini/object-detect", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Object detection failed.");
      }

      const data = await response.json();
      const result = data.result as ObjectPracticeResult;

      setDetectedResult(result);
      onObjectDetected?.(result);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while detecting the object.");
    } finally {
      setIsDetecting(false);
    }
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Object Practice</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            Turn your room into practice
          </h2>
        </div>

        {isCameraOn && (
          <button
            type="button"
            onClick={stopCamera}
            className="rounded-xl border px-4 py-2 text-sm font-medium"
          >
            Stop Camera
          </button>
        )}
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl bg-gray-100">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-64 w-full object-cover"
        />
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-4 flex flex-wrap gap-3">
        {!isCameraOn ? (
          <button
            type="button"
            onClick={startCamera}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Start Camera
          </button>
        ) : (
          <button
            type="button"
            onClick={captureAndDetect}
            disabled={isDetecting}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isDetecting ? "Detecting..." : "Detect Object"}
          </button>
        )}
      </div>

      {detectedResult && (
        <div className="mt-4 rounded-xl bg-gray-50 p-4">
          <p className="text-sm font-medium text-gray-500">Detected object</p>
          <p className="mt-1 text-lg font-bold text-gray-900">
            {detectedResult.object}
          </p>

          <p className="mt-3 text-sm font-medium text-gray-500">
            Functional phrase
          </p>
          <p className="mt-1 text-lg text-gray-900">
            “{detectedResult.phrase}”
          </p>
        </div>
      )}

      {error && (
        <p className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </section>
  );
}