#!/usr/bin/env node

import { access, cp, mkdir, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const source = resolve(scriptDir, "../assets/site-template");
const outputFlag = process.argv.indexOf("--output");

if (outputFlag === -1 || !process.argv[outputFlag + 1]) {
  console.error("Usage: node scripts/scaffold.mjs --output <target-directory>");
  process.exit(2);
}

const target = resolve(process.cwd(), process.argv[outputFlag + 1]);
if (target === resolve(process.cwd()) || target === "/") {
  console.error("Refusing to scaffold into the current directory or filesystem root.");
  process.exit(2);
}

try {
  await access(source, constants.R_OK);
} catch {
  console.error(`Bundled template is missing: ${source}`);
  process.exit(1);
}

await mkdir(target, { recursive: true });
const existing = (await readdir(target)).filter((name) => name !== ".DS_Store");
if (existing.length > 0) {
  console.error(`Target directory is not empty: ${target}`);
  process.exit(2);
}

await cp(source, target, { recursive: true, force: true });
console.log(`Created bilingual portfolio scaffold at ${target}`);
console.log("Next: replace all REPLACE_ME content and add approved assets under public/media and public/resume.");
