"use client";

/**
 * This config is used to power Sanity Studio, embedded into the Next.js
 * app at /studio. Learn more: https://github.com/sanity-io/next-sanity
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [
    structureTool({ structure }),
    // Vision lets you run GROQ queries inside the Studio — handy for
    // debugging, harmless to leave in.
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
