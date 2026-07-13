#!/usr/bin/env node
/*
 * Generates Markdown documentation under /docs from the JSON source of truth in /data.
 * Trees are rendered as readable outlines plus a Mermaid flowchart; tables as Markdown tables.
 * Run: node scripts/generate-docs.js
 */
"use strict";
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DATA = path.join(ROOT, "data");
const DOCS = path.join(ROOT, "docs");

const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));
const meta = read("meta.json");
const framework = read("framework.json");
const trees = read("trees.json");
const tables = read("tables.json");

const treeById = Object.fromEntries(trees.map((t) => [t.id, t]));
const tableById = Object.fromEntries(tables.map((t) => [t.id, t]));

function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); }
function write(rel, content) {
  const abs = path.join(DOCS, rel);
  ensureDir(path.dirname(abs));
  fs.writeFileSync(abs, content, "utf8");
}
function esc(s) { return String(s).replace(/\|/g, "\\|"); }
function slug(id) { return id.replace(/\./g, "-"); }

/* ---------- framework ---------- */
function genFramework() {
  let md = `# ${framework.title}\n\n> ${framework.intro}\n\n`;
  for (const s of framework.steps) {
    md += `## Step ${s.n}: ${s.title}\n\n**${s.summary}**\n\n${s.detail}\n\n`;
    if (s.considerFlags) {
      md += `Raise your index of suspicion when:\n\n`;
      s.considerFlags.forEach((f) => (md += `- ${f}\n`));
      md += `\n`;
    }
  }
  md += `## A note on comorbidity\n\n${framework.comorbidityNote}\n`;
  write("framework.md", md);
}

/* ---------- trees ---------- */
function mermaidId(nodeId) { return "N" + nodeId.replace(/[^a-zA-Z0-9]/g, "_"); }
function mermaidLabel(s) { return '"' + String(s).replace(/"/g, "'").replace(/\n/g, " ").slice(0, 90) + '"'; }

function treeMermaid(tree) {
  let out = ["```mermaid", "flowchart TD"];
  out.push(`  START([${mermaidLabel(tree.presenting)}]) --> ${mermaidId(tree.start)}`);
  let termCount = 0;
  for (const node of tree.nodes) {
    out.push(`  ${mermaidId(node.id)}{${mermaidLabel(node.question)}}`);
    for (const [ans, label] of [["yes", "Yes"], ["no", "No"]]) {
      const b = node[ans];
      if (b.goto) {
        out.push(`  ${mermaidId(node.id)} -->|${label}| ${mermaidId(b.goto)}`);
      } else {
        const tId = "T" + (termCount++);
        const dx = (b.diagnoses || []).map((d) => d.name).join("; ");
        out.push(`  ${mermaidId(node.id)} -->|${label}| ${tId}[${mermaidLabel(b.outcome + (dx ? " → " + dx : ""))}]`);
      }
    }
  }
  out.push("```");
  return out.join("\n");
}

function treeOutline(tree) {
  let md = "";
  for (const node of tree.nodes) {
    md += `- **${node.question}**\n`;
    if (node.note) md += `  - _${node.note}_\n`;
    for (const [ans, label] of [["yes", "Yes"], ["no", "No"]]) {
      const b = node[ans];
      if (b.goto) {
        const g = tree.nodes.find((n) => n.id === b.goto);
        md += `  - **${label} →** ${g ? g.question : b.goto}\n`;
      } else {
        let line = `  - **${label} →** ${b.outcome}`;
        const links = (b.diagnoses || []).map((d) => {
          if (d.table && tableById[d.table]) return `[${d.name}](../tables/${slug(d.table)}.md)`;
          if (d.seeTree && treeById[d.seeTree]) return `[${d.name}](${treeById[d.seeTree].slug}.md)`;
          return d.name;
        });
        if (links.length) line += ` — _${links.join("; ")}_`;
        md += line + "\n";
      }
    }
  }
  return md;
}

function genTrees() {
  let index = `# Symptom Decision Trees\n\nStart from the presenting symptom. ${trees.length} trees, organized by DSM-5 grouping.\n\n`;
  for (const g of meta.treeGroups) {
    index += `### ${g.label}\n\n`;
    for (const id of g.trees) {
      const t = treeById[id];
      if (t) index += `- [${t.id} — ${t.title}](trees/${t.slug}.md) · _${t.presenting}_\n`;
    }
    index += `\n`;
  }
  write("trees.md", index);

  for (const tree of trees) {
    let md = `# ${tree.id} — ${tree.title}\n\n`;
    md += `**Presenting symptom:** ${tree.presenting}\n\n`;
    if (tree.overview) md += `> ${tree.overview}\n\n`;
    md += `## Decision flow\n\n${treeMermaid(tree)}\n\n`;
    md += `## Decision points\n\n${treeOutline(tree)}\n`;
    md += `\n---\n_Summarizes differentiating features only. Confirm against the full DSM-5 criteria. See [the six-step method](../framework.md)._\n`;
    write(`trees/${tree.slug}.md`, md);
  }
}

/* ---------- tables ---------- */
function genTables() {
  let index = `# Disorder Differential Tables\n\nConfirm a candidate diagnosis by ruling out its main competitors. ${tables.length} tables, organized by DSM-5 grouping.\n\n`;
  for (const g of meta.tableGroups) {
    index += `### ${g.label}\n\n`;
    for (const id of g.tables) {
      const t = tableById[id];
      if (t) index += `- [${t.id} — ${t.title}](tables/${t.slug}.md)\n`;
    }
    index += `\n`;
  }
  write("tables.md", index);

  for (const t of tables) {
    let md = `# ${t.id} — ${t.title}\n\n`;
    if (t.targetDescription) md += `**${t.target}:** ${t.targetDescription}\n\n`;
    md += `| Consider and rule out | How it is distinguished from ${esc(t.target)} |\n| --- | --- |\n`;
    for (const d of t.differentials) {
      const name = d.table && tableById[d.table] ? `[${d.disorder}](${slug(d.table)}.md)` : d.disorder;
      md += `| ${esc(name)} | ${esc(d.distinction)} |\n`;
    }
    md += `\n---\n_Distinctions summarize differentiating features only. Confirm the full DSM-5 criteria for each disorder considered._\n`;
    write(`tables/${t.slug}.md`, md);
  }
}

/* ---------- docs index ---------- */
function genIndex() {
  const md = `# PSYSDD Documentation

Browse the decision framework as Markdown (rendered natively on GitHub). For the interactive version, open the [web app](../index.html) or the published GitHub Pages site.

- **[The six-step method](framework.md)** — orient every case before touching a tree.
- **[Symptom decision trees](trees.md)** — ${trees.length} trees, start from the presenting symptom.
- **[Disorder differential tables](tables.md)** — ${tables.length} head-to-head tables.

> Educational decision support only. Not a substitute for clinical judgment or the DSM-5 text. See the repository [disclaimer](../DISCLAIMER.md).
`;
  write("README.md", md);
}

/* ---------- consolidated knowledge pack (single upload for a Claude Project) ---------- */
function packTreeOutline(tree) {
  let md = "";
  for (const node of tree.nodes) {
    md += `- **Q: ${node.question}**\n`;
    if (node.note) md += `  - _${node.note}_\n`;
    for (const [ans, label] of [["yes", "YES"], ["no", "NO"]]) {
      const b = node[ans];
      if (b.goto) {
        const g = tree.nodes.find((n) => n.id === b.goto);
        md += `  - ${label} → next question: ${g ? g.question : b.goto}\n`;
      } else {
        let line = `  - ${label} → ${b.outcome}`;
        const dx = (b.diagnoses || []).map((d) => {
          let s = d.name;
          if (d.table && tableById[d.table]) s += ` (differential Table ${d.table})`;
          if (d.seeTree && treeById[d.seeTree]) s += ` (see Tree ${d.seeTree})`;
          return s;
        });
        if (dx.length) line += ` — ${dx.join("; ")}`;
        md += line + "\n";
      }
    }
  }
  return md;
}

function genKnowledgePack() {
  const KDIR = path.join(ROOT, "knowledge");
  ensureDir(KDIR);
  let md = `# PSYSDD Knowledge Pack

_A single, self-contained reference for the PSYSDD psychiatric differential-diagnosis framework, intended for upload as knowledge to a Claude Project (or any assistant). Generated from the versioned data in \`/data\` — do not edit by hand._

**How an assistant should use this pack for a case**
1. Apply the **six-step method** below in order — rule out feigning, substances, and a medical cause before pursuing a primary disorder.
2. Choose the **decision tree** matching the presenting symptom and reason through its decision points using the case facts, stating YES/NO and the reason at each point.
3. On reaching a candidate diagnosis, open that disorder's **differential table** and show how the main competitors are excluded.
4. State what additional history, exam, or investigations would change the conclusion, and note that the **full DSM-5 criteria** must be confirmed. Never present output as a definitive diagnosis.

> **Educational decision support, not a diagnostic authority.** ${DATA_disclaimer()}

---

## Part 1 — ${framework.title}

${framework.intro}

`;
  for (const s of framework.steps) {
    md += `### Step ${s.n}: ${s.title}\n\n**${s.summary}**\n\n${s.detail}\n\n`;
    if (s.considerFlags) { md += `Raise suspicion when:\n`; s.considerFlags.forEach((f) => (md += `- ${f}\n`)); md += `\n`; }
  }
  md += `**On comorbidity.** ${framework.comorbidityNote}\n\n---\n\n## Part 2 — Symptom Decision Trees (${trees.length})\n\n`;
  for (const g of meta.treeGroups) {
    for (const id of g.trees) {
      const t = treeById[id];
      if (!t) continue;
      md += `### Tree ${t.id} — ${t.title}\n\n_Presenting: ${t.presenting} · Group: ${g.label}_\n\n`;
      if (t.overview) md += `${t.overview}\n\n`;
      md += packTreeOutline(t) + `\n`;
    }
  }
  md += `---\n\n## Part 3 — Disorder Differential Tables (${tables.length})\n\n`;
  for (const g of meta.tableGroups) {
    for (const id of g.tables) {
      const t = tableById[id];
      if (!t) continue;
      md += `### Table ${t.id} — ${t.title}\n\n`;
      if (t.targetDescription) md += `**${t.target}:** ${t.targetDescription}\n\n`;
      for (const d of t.differentials) {
        md += `- **${d.disorder}**${d.table ? ` (Table ${d.table})` : ""} — ${d.distinction}\n`;
      }
      md += `\n`;
    }
  }
  md += `---\n\n## Attribution\n\n${meta.attribution}\n\nPSYSDD is independent and not affiliated with or endorsed by the American Psychiatric Association.\n`;
  fs.writeFileSync(path.join(KDIR, "psysdd-knowledge-pack.md"), md, "utf8");
}
function DATA_disclaimer() {
  return "This pack summarizes differentiating features only; it omits full criteria, durations, and severity thresholds. It does not diagnose and does not replace clinical judgment or the full DSM-5 text.";
}

ensureDir(DOCS);
genFramework();
genTrees();
genTables();
genIndex();
genKnowledgePack();
console.log(`Generated docs: framework + ${trees.length} trees + ${tables.length} tables, plus knowledge pack.`);
