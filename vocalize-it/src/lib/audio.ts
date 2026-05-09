export function createAudioFileFromBlob(blob: Blob, fileName = "recording.webm") {
  return new File([blob], fileName, {
    type: blob.type || "audio/webm",
  });
}

export function formatSeconds(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}