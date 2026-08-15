# PSYSDD — Psychiatric Symptom-based Differential Diagnosis

**An interactive, DSM-5–based decision-support framework for psychiatric differential diagnosis.**
Built to be shared as a link: a colleague opens it, starts from a presenting symptom, and works through the differential to a set of candidate diagnoses — then confirms with a head-to-head disorder comparison.

> ⚕️ **For clinician reference and research/educational use only — not a diagnostic substitute.** This tool summarizes DSM-5 differential-diagnosis *logic* to support clinical reasoning. It does **not** establish a diagnosis, does **not** replace clinical judgment or the current DSM-5-TR criteria, and must **not** be the sole basis for any clinical decision. See [DISCLAIMER.md](DISCLAIMER.md).
>
> 🏛️ **Independent project — NOT affiliated with, endorsed by, or authorized by the American Psychiatric Association (APA).** All text is an original synthesis in the authors' own clinical language; **no DSM criteria text is reproduced**. "DSM", "DSM-5", and "DSM-5-TR" are APA trademarks. See [COPYRIGHT.md](COPYRIGHT.md).

---

## What's inside

| Component | Count | Description |
| --- | --- | --- |
| **Six-step diagnostic method** | 6 steps | The ordered rule-out framework applied to every case (feigning → substances → medical → primary disorder → adjustment/residual → boundary with normality). |
| **Symptom decision trees** | 29 | Start from a presenting symptom (depressed mood, delusions, anxiety, cognitive impairment…) and answer Yes/No decision points to reach candidate diagnoses. |
| **Disorder differential tables** | 66 | For a target disorder, the competing conditions to consider and how each is distinguished. |

Everything is cross-linked: a tree endpoint links to the relevant differential table and to related trees; a table links to each competitor's own table.

## Five ways to use it

1. **Interactive web app** — open the published site (GitHub Pages) or run locally. Click through the trees, search, and browse tables.
2. **Markdown docs** — [`/docs`](docs/) renders natively on GitHub, with Mermaid flowcharts for each tree. Good for reading in-repo or offline.
3. **Structured data** — [`/data`](data/) holds the source of truth as validated JSON. Reuse it in your own tools.
4. **As a Claude Project** — upload [`knowledge/psysdd-knowledge-pack.md`](knowledge/psysdd-knowledge-pack.md) (the whole framework in one file) and the project instructions in [`knowledge/project-instructions.md`](knowledge/project-instructions.md) to reason through de-identified cases with an assistant. See that file for step-by-step setup.
5. **As a drop-in skill** — the [`skill/`](skill/) folder is a ready-made skill package (`SKILL.md` in Claude Agent Skills format + a bundled knowledge pack). [`skill/INSTALL.md`](skill/INSTALL.md) shows how to install it in Claude Code, Claude Agent SDK, Ollama, Open WebUI, LM Studio, AnythingLLM, or any chat app with a system prompt.

> ⚠️ Using this with real cases: enter **de-identified** information only, and remember it is decision support, not a diagnosis.

## Run it locally

The app is a dependency-free static site (vanilla HTML/CSS/JS). It only needs to be served over HTTP because it `fetch()`es the JSON data.

```bash
git clone https://github.com/archit7098/psysdd.git
cd psysdd
python3 -m http.server 8000
# open http://localhost:8000
```

Regenerate the Markdown docs from the data after editing:

```bash
node scripts/generate-docs.js
```

## Repository layout

```
psysdd/
├── index.html              # Interactive app entry point (GitHub Pages root)
├── app/
│   ├── css/styles.css      # Theme-aware styling (light/dark)
│   └── js/app.js           # SPA: router, tree walker, tables, search
├── data/                   # SOURCE OF TRUTH (validated JSON)
│   ├── meta.json           # Groupings, indexes, attribution
│   ├── framework.json      # Six-step method
│   ├── trees.json          # 29 decision trees
│   ├── tables.json         # 66 differential tables
│   └── schema/             # JSON Schemas for trees and tables
├── docs/                   # Generated Markdown (Mermaid flowcharts + tables)
├── scripts/generate-docs.js
└── .github/workflows/      # CI: validate data + deploy Pages
```

## How the data is structured

**A decision tree** is a directed graph of Yes/No decision nodes. Each branch either advances to another node (`goto`) or terminates with an `outcome` and candidate `diagnoses` (each optionally linking to a differential `table` or another `seeTree`). See [`data/schema/decision-tree.schema.json`](data/schema/decision-tree.schema.json).

**A differential table** names a `target` disorder and lists `differentials` — each a competing `disorder` plus the `distinction` that separates it from the target. See [`data/schema/differential-table.schema.json`](data/schema/differential-table.schema.json).

## Sources, attribution & copyright

The diagnostic categories and the differential-diagnosis methodology reflected here derive from **DSM-5 / DSM-5-TR** (American Psychiatric Association, 2013/2022) and the **DSM-5 Handbook of Differential Diagnosis** by Michael B. First, M.D. (American Psychiatric Publishing, 2014).

Diagnostic *logic* — symptom clustering, decision pathways, and differential relationships — is not copyrightable; the specific *wording and structure* of DSM criteria is. Accordingly, all explanatory text here is an **original synthesis in the authors' own clinical language, and no DSM criteria text is reproduced.** Criteria are referenced by citation (e.g. "per DSM-5-TR criteria for…"), not reproduction. Confirm exact criteria against the official DSM-5-TR text.

PSYSDD is an independent, unofficial, open project. It is **not affiliated with, authorized by, endorsed by, or sponsored by** the American Psychiatric Association or the author of the Handbook. "DSM", "DSM-5", and "DSM-5-TR" are trademarks of the APA. Full details in [COPYRIGHT.md](COPYRIGHT.md) and [DISCLAIMER.md](DISCLAIMER.md).

## Contributing

Corrections and refinements to the diagnostic logic are welcome — the content lives in the JSON files under [`/data`](data/), so a change there flows into both the app and the docs. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code and original content are released under the [MIT License](LICENSE). This license does not extend to DSM-5 or to any American Psychiatric Association materials.
