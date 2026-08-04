'use client';

import Link from 'next/link';

export default function Error({ error, reset }) {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-red-400/30 bg-slate-900/80 p-8 text-center shadow-lg">
        <h1 className="text-2xl font-bold text-white">
          Something went wrong while loading the shop
        </h1>
        <p className="mt-3 text-slate-300">
          Please try again. If the issue continues, our team can help you from the contact page.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={reset}
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Try Again
          </button>
          <Link
            href="/contact"
            className="rounded-lg border border-slate-600 px-5 py-2.5 text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
