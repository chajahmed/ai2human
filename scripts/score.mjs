// Scores every sample in corpus/ against the live AI2Human detector API.
// Requires a free account at https://ai2human.app — grab your access token
// from the dashboard, then run:
//
//   DETECT_TOKEN=your_token_here node scripts/score.mjs
//
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const CORPUS_DIR = path.join(ROOT, "corpus");
const API_URL = "https://ai2human.app/api/detect";

const token = process.env.DETECT_TOKEN;
if (!token) {
  console.error("Missing DETECT_TOKEN. Sign up free at https://ai2human.app, copy your token from the dashboard, then:\n  DETECT_TOKEN=xxx node scripts/score.mjs");
  process.exit(1);
}

async function scoreText(text) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ text }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`${res.status} ${res.statusText}: ${body.error ?? "unknown error"}`);
  }
  return res.json();
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const categories = readdirSync(CORPUS_DIR, { withFileTypes: true })
  .filter(d => d.isDirectory())
  .map(d => d.name);

const results = [];
for (const category of categories) {
  const dir = path.join(CORPUS_DIR, category);
  const files = readdirSync(dir).filter(f => f.endsWith(".txt")).sort();
  for (const file of files) {
    const text = readFileSync(path.join(dir, file), "utf8");
    try {
      const r = await scoreText(text);
      results.push({ category, file, aiPercentage: r.aiPercentage, wordCount: r.wordCount });
      console.log(`${category.padEnd(24)} ${file.padEnd(16)} AI=${String(r.aiPercentage).padStart(3)}%`);
    } catch (err) {
      console.error(`${category}/${file} failed: ${err.message}`);
    }
    await delay(1500); // stay well under scan/rate limits
  }
}

const resultsDir = path.join(ROOT, "results");
mkdirSync(resultsDir, { recursive: true });
writeFileSync(
  path.join(resultsDir, "latest.json"),
  JSON.stringify({ generatedAt: new Date().toISOString(), results }, null, 2)
);
console.log(`\nSaved ${results.length} scores to results/latest.json`);
