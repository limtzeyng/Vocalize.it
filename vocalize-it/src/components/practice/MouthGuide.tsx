type MouthGuideProps = {
  targetSound: string;
  tip?: string;
};

export default function MouthGuide({ targetSound, tip }: MouthGuideProps) {
  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <p className="text-sm font-medium text-gray-500">Mouth Guide</p>

      <div className="mt-4 flex items-center gap-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-3xl">
          🗣️
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Sound: /{targetSound}/
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Watch your mouth position and keep your sound steady.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gray-50 p-4">
        <p className="text-sm font-medium text-gray-500">Tip</p>
        <p className="mt-1 text-gray-800">
          {tip ||
            "Speak slowly, keep your face relaxed, and focus on one clear sound at a time."}
        </p>
      </div>

      {targetSound.toLowerCase() === "s" && (
        <ul className="mt-4 space-y-2 text-sm text-gray-700">
          <li>• Keep your teeth close, but do not clench.</li>
          <li>• Place your tongue near the ridge behind your teeth.</li>
          <li>• Let the air flow smoothly forward.</li>
          <li>• Try not to add an extra vowel sound after /s/.</li>
        </ul>
      )}
    </section>
  );
}