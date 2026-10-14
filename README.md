# AI2Human — Free AI Humanizer, AI Detector, Grammar Checker, Translator & Citation Generator

**[AI2Human](https://ai2human.app)** is a free AI writing toolkit. Turn AI-generated text into natural, human-sounding writing with the **AI humanizer**, check any text with the **AI detector**, polish it with the **grammar checker**, translate it into 100+ languages, and format sources with the **citation generator**.

This repository also hosts the **AI2Human open benchmark corpus** — a labeled set of raw AI text, human-written text, and humanized rewrites for testing how well **AI text detectors** and **AI content detectors** handle real-world writing.

> Website: **[ai2human.app](https://ai2human.app)** · Chrome extension: **[Add to Chrome](https://chromewebstore.google.com/detail/ai2human-%E2%80%94-ai-humanizer-a/fcocegafnneboemllpkjlbbafdaheefi)**

---

## AI2Human tools

| Tool | What it does | Try it |
|---|---|---|
| **AI Humanizer** | Rewrites text from ChatGPT, Claude and Gemini into natural, human-sounding writing while keeping your meaning, citations and argument intact. Three intensity levels (Light, Medium, Heavy), 40+ languages, no account needed to start. | [ai2human.app](https://ai2human.app) |
| **Free AI Humanizer** | The same humanizer with no sign-up and no login: 5 instant uses, then 2,000 free words a month. | [Free AI humanizer](https://ai2human.app/free-ai-humanizer) |
| **AI Detector** (AI checker) | Estimates how likely a text was written by AI and highlights the exact sentences that drove the result, instead of returning one flat percentage. Works on pasted text or PDF/Word uploads in 50+ languages. | [AI detector](https://ai2human.app/ai-detector) |
| **Grammar Checker** | Finds grammar, spelling, punctuation, clarity and style issues in 50+ languages and explains the reason for every fix in plain English. Accepts pasted text or document upload. | [Grammar checker](https://ai2human.app/grammar-checker) |
| **AI Translator** | Translates between 108+ languages with auto-detect, a built-in grammar check on the source text, text-to-speech, tone rewriting (Formal, Informal, Academic, Business, Simple) and sentence-level rephrasing. | [AI translator](https://ai2human.app/translator) |
| **Citation Generator** | Creates reference-list entries and matching in-text citations in APA, MLA, Chicago, Harvard and IEEE. Auto-fills from a URL, DOI or ISBN and builds a full bibliography. | [Citation generator](https://ai2human.app/citation-generator) |
| **Browser Extension** | Brings AI2Human into your browser so you can humanize text without leaving the page you are writing on. | [Chrome Web Store](https://chromewebstore.google.com/detail/ai2human-%E2%80%94-ai-humanizer-a/fcocegafnneboemllpkjlbbafdaheefi) |

### Who it is for

- **Students and researchers** who want AI-assisted drafts to read as their own voice, with citations and terminology preserved. See [AI humanizer for students](https://ai2human.app/ai-humanizer-for-students) and [for researchers](https://ai2human.app/ai-humanizer-for-researchers).
- **Content creators, marketers and SEO writers** who publish blog posts, product copy and social captions. See [AI tools for content creators](https://ai2human.app/content-creators).
- **Educators, editors and recruiters** who want sentence-level evidence rather than a bare AI-score when reviewing submissions.
- **Non-native writers** who want fluent, natural English and clear explanations for every correction.

### What AI2Human is not

- It is **not a content generator** — it rewrites a draft you already have.
- It is **not a plagiarism remover or fact-checker** — copied text stays copied, and errors in the draft carry through.
- AI detection is **probabilistic**. No detector (including ours) can prove authorship, and no humanizer can guarantee a result against every detector forever. Always follow your school's or employer's policies.

---

## The benchmark corpus

A small, labeled corpus for testing how well AI-text detectors distinguish between raw AI output, human writing, and various "humanized" rewrites of the same source material.

### What's in the corpus

| Folder | Samples | Description |
|---|---|---|
| `corpus/raw-ai/` | 37 | Unedited output from ChatGPT/DeepSeek on a range of topics (healthcare AI, industrial controls, autonomous vehicles, cybersecurity, academic literature review passages) |
| `corpus/human-rewrite/` | 32 | The same raw-AI passages manually rewritten by a human editor, paragraph-for-paragraph |
| `corpus/stealthwriter-humanized/` | 6 | Raw-AI passages run through a third-party humanizing tool (StealthWriter), including paired before/after samples |
| `corpus/ai2human-humanized/` | 9 | The same style of raw-AI passages run through the [AI2Human humanizer](https://ai2human.app) |

**84 samples in total.** Each file is one sample — a single paragraph or short passage in plain text, with no metadata embedded in the file itself. The category is the folder name, so the folder is the label.

### Why this corpus exists

Most public AI-detection benchmarks only label "AI" vs. "human." That misses the failure mode detectors run into in practice: AI text that has been *rewritten* — by a human editor or by another tool — to read more naturally. This corpus keeps raw-AI, human-rewritten, and multiple humanized variants of comparable source material side by side, so a detector's behavior across all four categories can be compared directly.

Useful for:

- Benchmarking an **AI detector** or **AI content detector** on edited and humanized text, not only raw output.
- Measuring **false positives** on human-written and human-edited writing.
- Comparing **AI humanizer** tools against the same source passages.
- Teaching and research on **AI-generated text detection**.

### Scoring the corpus

`scripts/score.mjs` sends every sample to the live AI2Human detector API and records the AI-likelihood score. It ships no detection logic itself — it is a thin client against the hosted API, so results reflect the same detector the [AI detector tool](https://ai2human.app/ai-detector) uses in production.

```bash
npm install
# get a free account + token at https://ai2human.app, then:
DETECT_TOKEN=your_token_here node scripts/score.mjs
```

Results are written to `results/latest.json`. To benchmark a different detector, point your own scoring script at `corpus/` — the folder name is the label.

---

## FAQ

**What is an AI humanizer?**
A tool that rewrites AI-generated text so it reads like natural human writing — varying sentence rhythm, vocabulary and structure — while keeping the original meaning. AI2Human works with text from ChatGPT, Claude, Gemini and other AI writers.

**Is there a free AI detector with no sign-up?**
Yes. The [AI2Human AI detector](https://ai2human.app/ai-detector) is free to start with no login and shows which sentences look AI-written.

**Is the grammar checker free?**
Yes, you can check grammar, spelling and punctuation without an account; longer texts and advanced suggestions need a plan. See [pricing](https://ai2human.app/pricing).

**Which citation styles are supported?**
APA, MLA, Chicago, Harvard and IEEE, each with the full reference and the in-text form.

**How many languages does the translator support?**
108+ languages, with auto-detection of the source language.

---

## Links

[Website](https://ai2human.app) · [How it works](https://ai2human.app/how-it-works) · [Features](https://ai2human.app/features) · [Pricing](https://ai2human.app/pricing) · [Blog](https://ai2human.app/blog) · [Research](https://ai2human.app/research) · [Compare AI humanizers](https://ai2human.app/vs)

## License

MIT — see [LICENSE](LICENSE). Corpus text is provided for research and benchmarking use.
