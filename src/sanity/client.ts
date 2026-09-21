import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Published content only, cached — matches the rest of the site's
  // hourly revalidation pattern (see src/lib/amrod.ts).
  useCdn: true,
});
