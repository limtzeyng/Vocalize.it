import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <section className="mx-auto flex max-w-5xl flex-col items-start justify-center py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-500">
          Vocalize.it
        </p>

        <h1 className="mt-4 max-w-3xl text-5xl font-bold tracking-tight text-gray-950">
          AI-assisted speech therapy practice at home.
        </h1>

        <p className="mt-5 max-w-2xl text-lg text-gray-600">
          Vocalize.it helps patients practise assigned speech sounds, receive
          AI-assisted feedback, and turn everyday objects into functional speech
          prompts.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/patient"
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white transition hover:bg-gray-800"
          >
            Patient Details
          </Link>

          <Link
            href="/therapist/dashboard"
            className="rounded-xl border bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Therapist Dashboard
          </Link>

          <Link
            href="/therapist/assign"
            className="rounded-xl border bg-white px-5 py-3 text-sm font-medium text-gray-900 transition hover:bg-gray-50"
          >
            Create Assignment
          </Link>
        </div>
      </section>
    </main>
  );
}