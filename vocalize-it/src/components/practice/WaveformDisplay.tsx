type WaveformDisplayProps = {
  isRecording: boolean;
};

export default function WaveformDisplay({ isRecording }: WaveformDisplayProps) {
  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-gray-500">Voice Activity</p>
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            isRecording
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {isRecording ? "Recording" : "Idle"}
        </span>
      </div>

      <div className="mt-5 flex h-24 items-center justify-center gap-1 rounded-xl bg-gray-50 px-4">
        {Array.from({ length: 28 }).map((_, index) => {
          const height = isRecording
            ? 20 + ((index * 17) % 56)
            : 12 + ((index * 7) % 20);

          return (
            <div
              key={index}
              className={`w-2 rounded-full transition-all duration-300 ${
                isRecording ? "bg-black" : "bg-gray-300"
              }`}
              style={{ height }}
            />
          );
        })}
      </div>

      <p className="mt-3 text-sm text-gray-600">
        This visual helps patients see that their voice has been captured.
      </p>
    </div>
  );
}