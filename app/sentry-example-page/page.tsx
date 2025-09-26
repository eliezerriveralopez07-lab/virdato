// app/sentry-example-page/page.tsx
"use client";

import * as Sentry from "@sentry/nextjs";
import { useState } from "react";

export default function SentryExamplePage() {
  const [sent, setSent] = useState(false);

  const throwClientError = () => {
    try {
      throw new Error("Sentry client test: button click");
    } catch (err) {
      Sentry.captureException(err);
      setSent(true);
      // rethrow so it shows as an unhandled error too (optional)
      setTimeout(() => { throw err; }, 0);
    }
  };

  return (
    <main className="min-h-screen grid place-items-center p-8">
      <div className="p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-bold">Sentry Test</h1>
        <p className="mt-2 opacity-70">Click to send an error to Sentry.</p>
        <button
          onClick={throwClientError}
          className="mt-4 px-4 py-2 rounded-lg border"
        >
          Trigger Client Error
        </button>
        {sent && <p className="mt-3 text-sm">Event captured — check Sentry Issues.</p>}
      </div>
    </main>
  );
}
