import type { PronunciationFeedback } from "@/types/practice";

type FeedbackCardProps = {
  feedback: PronunciationFeedback | null;
  isLoading?: boolean;
};

export default function FeedbackCard({
  feedback,
  isLoading = false,
}: FeedbackCardProps) {
  if (isLoading) {
    return (
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Analysing...</p>
        <p className="mt-2 text-gray-700">
          Please wait while Vocalize.it checks your attempt.
        </p>
      </section>
    );
  }

  if (!feedback) {
    return (
      <section className="rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-sm font-medium text-gray-500">Feedback</p>
        <p className="mt-2 text-gray-700">
          Record your voice to receive feedback.
        </p>
      </section>
    );
  }

  const statusText = feedback.isCorrect ? "Good attempt!" : "Try again";
  const statusClass = feedback.isCorrect
    ? "bg-green-100 text-green-800"
    : "bg-yellow-100 text-yellow-800";

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Feedback</p>
          <h2 className="mt-1 text-xl font-bold text-gray-900">{statusText}</h2>
        </div>

        <span className={`rounded-full px-3 py-1 text-sm font-medium ${statusClass}`}>
          {feedback.accuracyScore}/100
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {feedback.transcription && (
          <div>
            <p className="text-sm font-medium text-gray-500">Heard as</p>
            <p className="text-gray-900">“{feedback.transcription}”</p>
          </div>
        )}

        <div>
          <p className="text-sm font-medium text-gray-500">What went well</p>
          <p className="text-gray-900">{feedback.feedback}</p>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Next tip</p>
          <p className="text-gray-900">{feedback.nextTip}</p>
        </div>

        <p className="rounded-xl bg-gray-50 p-3 text-sm text-gray-700">
          {feedback.encouragement}
        </p>
      </div>
    </section>
  );
}