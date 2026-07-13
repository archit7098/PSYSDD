# PSYSDD — Psychiatric Symptom-based Differential Diagnosis

**An interactive, DSM-5–based decision-support framework for psychiatric differential diagnosis.**
Built to be shared as a link: a colleague opens it, starts from a presenting symptom, and works through the differential to a set of candidate diagnoses — then confirms with a head-to-head disorder comparison.

> ⚕️ **Educational decision support, not a diagnostic authority.** This tool summarizes DSM-5 differential-diagnosis *logic* to support clinical reasoning. It does **not** establish a diagnosis, does **not** replace clinical judgment or the full DSM-5 text, and must **not** be the sole basis for any clinical decision. See [DISCLAIMER.md](DISCLAIMER.md).

---

## What's inside

| Component | Count | Description |
| --- | --- | --- |
| **Six-step diagnostic method** | 6 steps | The ordered rule-out framework applied to every case (feigning → substances → medical → primary disorder → adjustment/residual → boundary with normality). |
| **Symptom decision trees** | 29 | Start from a presenting symptom (depressed mood, delusions, anxiety, cognitive impairment…) and answer Yes/No decision points to reach candidate diagnoses. |
| **Disorder differential tables** | 66 | For a target disorder, the competing conditions to consider and how each is distinguished. |

Everything is cross-linked: a tree endpoint links to the relevant differential table and to related trees; a table links to each competitor's own table.

## Three ways to use it

1. **Interactive web app** — open the published site (GitHub Pages) or run locally. Click through the trees, search, and browse tables.
2. **Markdown docs** — [`/docs`](docs/) renders natively on GitHub, with Mermaid flowcharts for each tree. Good for reading in-repo or offline.
3. **Structured data** — [`/data`](data/) holds the source of truth as validated JSON. Reuse it in your own tools.

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

## Sources & attribution

The diagnostic categories and the differential-diagnosis methodology derive from **DSM-5** (American Psychiatric Association, 2013) and the **DSM-5 Handbook of Differential Diagnosis** by Michael B. First, M.D. (American Psychiatric Publishing, 2014). All explanatory text in this repository is an **original synthesis** written for this project — no source text is reproduced.

PSYSDD is an independent, open project. It is **not affiliated with, authorized by, or endorsed by** the American Psychiatric Association or the author of the Handbook.

## Contributing

Corrections and refinements to the diagnostic logic are welcome — the content lives in the JSON files under [`/data`](data/), so a change there flows into both the app and the docs. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

Code and original content are released under the [MIT License](LICENSE). This license does not extend to DSM-5 or to any American Psychiatric Association materials.
