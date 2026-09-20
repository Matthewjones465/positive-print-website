import { NextResponse } from "next/server";
import { getAmrodToken } from "@/lib/amrod";

// Diagnostic endpoint — confirms the server can authenticate with Amrod
// without ever exposing the token or credentials to the browser.
// Visit /api/amrod/token after deploying (with AMROD_* env vars set) to check.
export async function GET() {
  try {
    await getAmrodToken();
    return NextResponse.json({ ok: true, message: "Amrod authentication succeeded." });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
