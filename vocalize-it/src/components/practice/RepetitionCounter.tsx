type RepetitionCounterProps = {
  correctCount?: number;
  requiredCount?: number;
};

export default function RepetitionCounter({
  correctCount = 0,
  requiredCount = 5,
}: RepetitionCounterProps) {
  const safeRequiredCount = requiredCount > 0 ? requiredCount : 5;
  const safeCorrectCount = Math.max(0, Math.min(correctCount, safeRequiredCount));

  const progressPercentage = Math.round(
    (safeCorrectCount / safeRequiredCount) * 100
  );

  const completed = safeCorrectCount >= safeRequiredCount;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">Practice Goal</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">
            {safeCorrectCount}/{safeRequiredCount} correct
          </h2>
        </div>

        {completed && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            Completed
          </span>
        )}
      </div>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-black transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mt-4 flex gap-2">
        {Array.from({ length: safeRequiredCount }).map((_, index) => {
          const filled = index < safeCorrectCount;

          return (
            <div
              key={index}
              className={`h-8 w-8 rounded-full border text-center text-sm leading-8 ${
                filled
                  ? "border-black bg-black text-white"
                  : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-sm text-gray-600">
        Aim to pronounce the target correctly {safeRequiredCount} times.
      </p>
    </section>
  );
}