// app/api/sentry-test/route.ts
import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    throw new Error("Sentry server test: /api/sentry-test");
  } catch (err) {
    Sentry.captureException(err);
    return NextResponse.json({ ok: true });
  }
}
