export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  "Missing environment variable: NEXT_PUBLIC_SANITY_DATASET"
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  "Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID"
);

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    // Don't throw at import time in environments where the Sanity
    // integration isn't configured yet (e.g. before env vars are set) —
    // callers that actually need Sanity will fail loudly when they try
    // to fetch, which is easier to diagnose than a build-time crash.
    console.warn(errorMessage);
    return "" as T;
  }
  return v;
}
