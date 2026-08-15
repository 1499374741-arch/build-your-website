#!/usr/bin/env node

import { access, readFile } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";

const input = process.argv[2];
if (!input) {
  console.error("Usage: node scripts/validate-content.mjs <path-to-site-content.ts>");
  process.exit(2);
}

const contentPath = resolve(process.cwd(), input);
const projectRoot = resolve(dirname(contentPath), "../..");
const source = await readFile(contentPath, "utf8");
const errors = [];
const warnings = [];

for (const marker of ["REPLACE_ME", "example.com", "michaeltsirakis.com"]) {
  if (source.includes(marker)) errors.push(`Forbidden placeholder/reference remains: ${marker}`);
}

if (!source.includes('mode: "shared"') && !source.includes('mode: "localized"') && !source.includes('mode: "hidden"')) {
  errors.push("Resume mode must be shared, localized, or hidden.");
}

if (!source.includes("layout:") || !source.includes("work:") || !source.includes("lab:")) {
  errors.push("A Work/Lab layout decision is required.");
}

const adobeUrlMatch = source.match(/stylesheetUrl:\s*"([^"]*)"/);
const adobeFamilyMatch = source.match(/fontFamily:\s*"([^"]*)"/);
const adobeUrl = adobeUrlMatch?.[1].trim() ?? "";
const adobeFamily = adobeFamilyMatch?.[1].trim() ?? "";
if (adobeUrl && !/^https:\/\/use\.typekit\.net\/[a-z0-9]+\.css$/i.test(adobeUrl)) {
  errors.push("Adobe Fonts stylesheet must match https://use.typekit.net/<project-id>.css.");
}
if (adobeUrl && !adobeFamily) {
  errors.push("Adobe Fonts fontFamily is required when stylesheetUrl is set.");
}

const localCalls = [...source.matchAll(/local\(\s*"([^"]*)"\s*,\s*"([^"]*)"\s*\)/g)];
for (const [index, match] of localCalls.entries()) {
  if (!match[1].trim() || !match[2].trim()) errors.push(`Localized pair ${index + 1} contains an empty value.`);
}

const publicPaths = new Set(
  [...source.matchAll(/"(\/(?:media|resume|fonts)\/[^"?#]+)"/g)].map((match) => match[1]),
);
for (const publicPath of publicPaths) {
  const diskPath = resolve(projectRoot, `public${publicPath}`);
  try {
    await access(diskPath, constants.R_OK);
  } catch {
    errors.push(`Referenced public asset is missing: ${publicPath}`);
  }
}

for (const font of [
  "dm-serif-display-regular.ttf",
  "DMSerifDisplay-OFL.txt",
  "inter-latin.woff2",
  "inter-latin-ext.woff2",
  "geist-mono-regular.ttf",
  "geist-mono-bold.ttf",
  "source-han-serif-sc-vf.otf",
]) {
  try {
    await access(resolve(projectRoot, "public/fonts", font), constants.R_OK);
  } catch {
    warnings.push(`Required self-hosted font file is missing: /fonts/${font}`);
  }
}

try {
  await access(resolve(projectRoot, "public/fonts/gallery-modern-regular.otf"), constants.R_OK);
  errors.push("Gallery Modern font binaries must not be bundled; use the site owner's Adobe Web Project stylesheet.");
} catch {
  // Expected: Gallery Modern is remote-only through the owner's Adobe Web Project.
}

if (warnings.length) warnings.forEach((warning) => console.warn(`WARN: ${warning}`));
if (errors.length) {
  errors.forEach((error) => console.error(`ERROR: ${error}`));
  process.exit(1);
}

console.log(`Content validation passed: ${localCalls.length} bilingual string pairs and ${publicPaths.size} public asset references checked.`);
