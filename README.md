# AI Text Detection Benchmark

A small, labeled corpus for testing how well AI-text detectors distinguish between raw AI output, human writing, and various "humanized" rewrites of the same source material.

Built and maintained by [AI2Human](https://ai2human.app) — an [AI humanizer](https://ai2human.app) and [AI content detector](https://ai2human.app/ai-detector).

## What's in the corpus

| Category | Samples | Description |
|---|---|---|
| `corpus/raw-ai/` | 37 | Unedited output from ChatGPT/DeepSeek on a range of topics (healthcare AI, industrial controls, autonomous vehicles, cybersecurity, academic literature review passages) |
| `corpus/human-rewrite/` | 32 | The same raw-AI passages manually rewritten by a human editor, paragraph-for-paragraph |
| `corpus/stealthwriter-humanized/` | 6 | Raw-AI passages run through a third-party humanizing tool (StealthWriter), including paired before/after samples |
| `corpus/ai2human-humanized/` | 9 | The same style of raw-AI passages run through [AI2Human's humanizer](https://ai2human.app) |

Each file is one sample — a single paragraph or short passage, plain text, no metadata embedded in the file itself (category is the folder name).

## Why this exists

Most public AI-detection benchmarks only label "AI" vs. "human." That misses the actual failure mode detectors run into in practice: AI text that has been *rewritten* — by a human editor or by another tool — to read more naturally. This corpus keeps raw-AI, human-rewritten, and multiple humanized variants of comparable source material side by side, so a detector's behavior across all four categories can be compared directly.

## Scoring the corpus

`scripts/score.mjs` sends every sample to the live AI2Human detector API and records the AI-likelihood score. It doesn't ship any detection logic itself — it's a thin client against the hosted API, so results reflect the same detector the [ai2human.app/ai-detector](https://ai2human.app/ai-detector) tool uses in production.

```bash
npm install
# get a free account + token at https://ai2human.app, then:
DETECT_TOKEN=your_token_here node scripts/score.mjs
```

Results are written to `results/latest.json`.

To benchmark a different detector, point your own scoring script at `corpus/` — the folder name is the label.

## License

MIT — see [LICENSE](LICENSE). Corpus text is provided for research/benchmarking use.
