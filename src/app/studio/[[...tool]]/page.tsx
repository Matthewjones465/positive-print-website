/**
 * This route mounts the Sanity Studio at /studio in the Next.js app.
 * Learn more: https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
