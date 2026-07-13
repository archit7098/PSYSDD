# Contributing to PSYSDD

Thanks for helping improve this clinical decision-support reference. The most valuable contributions are **corrections and refinements to the diagnostic logic** and improvements to clarity.

## Ground rules

- **Original wording only.** All explanatory text must be an original synthesis. Do **not** paste or lightly paraphrase text from DSM-5, the DSM-5 Handbook of Differential Diagnosis, or other copyrighted sources.
- **Clinical accuracy first.** Content should be consistent with DSM-5 diagnostic concepts. Cite the relevant DSM-5 grouping/disorder in your PR description when proposing a change.
- **Keep the disclaimer intact.** Nothing here is a substitute for the full DSM-5 criteria or clinical judgment, and content should not drift toward prescriptive treatment advice.

## Where content lives

All diagnostic content is in versioned JSON under [`/data`](data/):

- `framework.json` — the six-step method.
- `trees.json` — the 29 symptom decision trees.
- `tables.json` — the 66 disorder differential tables.
- `meta.json` — groupings, indexes, and attribution.
- `schema/` — JSON Schemas describing the shape of trees and tables.

The app (`/app`, `index.html`) and the Markdown docs (`/docs`) are both driven by this data. **Do not hand-edit files in `/docs`** — they are generated.

## Making a change

1. Edit the relevant JSON file(s) in `/data`.
2. Validate and regenerate docs:
   ```bash
   node scripts/validate-data.js     # structural + cross-reference checks
   node scripts/generate-docs.js     # regenerate /docs from /data
   ```
3. Optionally serve the app locally to eyeball the change:
   ```bash
   python3 -m http.server 8000   # then open http://localhost:8000
   ```
4. Commit both the data change and the regenerated docs, and open a pull request describing the clinical rationale.

## Adding a decision tree or table

- Give it the correct DSM-5-style `id` (e.g. `2.30`, `3.19.1`) and a URL-safe `slug`.
- Add its `id` to the appropriate group in `meta.json` so it appears in the app and docs indexes.
- Follow the JSON Schema in `data/schema/`. The validator will flag broken node references and dangling cross-links.

## Style

- Decision-tree questions are phrased so that **Yes** advances toward a diagnosis.
- Keep distinctions to the single differentiating feature that matters most; brevity is a feature.
- Prefer DSM-5 disorder names as they appear in the manual.
