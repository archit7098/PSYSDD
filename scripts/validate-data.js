#!/usr/bin/env node
/*
 * Validates the JSON source of truth in /data:
 *  - JSON parses
 *  - every tree.start and node goto references an existing node
 *  - every diagnosis table/seeTree reference resolves
 *  - every differential table cross-reference resolves
 *  - meta groupings and the actual trees/tables agree
 * Exits non-zero on any problem. Run: node scripts/validate-data.js
 */
"use strict";
const fs = require("fs");
const path = require("path");
const DATA = path.resolve(__dirname, "..", "data");
const read = (f) => JSON.parse(fs.readFileSync(path.join(DATA, f), "utf8"));

const errors = [];
const err = (m) => errors.push(m);

const meta = read("meta.json");
const trees = read("trees.json");
const tables = read("tables.json");

const treeIds = new Set(trees.map((t) => t.id));
const tableIds = new Set(tables.map((t) => t.id));

// meta <-> data agreement
const metaTrees = new Set(meta.treeGroups.flatMap((g) => g.trees));
const metaTables = new Set(meta.tableGroups.flatMap((g) => g.tables));
treeIds.forEach((id) => { if (!metaTrees.has(id)) err(`tree ${id} missing from meta.treeGroups`); });
tableIds.forEach((id) => { if (!metaTables.has(id)) err(`table ${id} missing from meta.tableGroups`); });
metaTrees.forEach((id) => { if (!treeIds.has(id)) err(`meta.treeGroups references unknown tree ${id}`); });
metaTables.forEach((id) => { if (!tableIds.has(id)) err(`meta.tableGroups references unknown table ${id}`); });

// tree structure
const slugs = new Set();
trees.forEach((t) => {
  if (slugs.has(t.slug)) err(`duplicate tree slug ${t.slug}`);
  slugs.add(t.slug);
  const nodeIds = new Set(t.nodes.map((n) => n.id));
  if (!nodeIds.has(t.start)) err(`tree ${t.id}: start "${t.start}" is not a node`);
  const reachable = new Set();
  (function walk(id, seen) {
    if (!id || reachable.has(id) || seen.has(id)) return;
    reachable.add(id);
    const node = t.nodes.find((n) => n.id === id);
    if (!node) return;
    ["yes", "no"].forEach((b) => { if (node[b] && node[b].goto) walk(node[b].goto, new Set(seen).add(id)); });
  })(t.start, new Set());
  t.nodes.forEach((n) => {
    ["yes", "no"].forEach((b) => {
      const br = n[b];
      if (!br) return err(`tree ${t.id} node ${n.id}: missing "${b}" branch`);
      if (br.goto && !nodeIds.has(br.goto)) err(`tree ${t.id} node ${n.id}: ${b}.goto -> unknown node ${br.goto}`);
      if (!br.goto && !br.outcome) err(`tree ${t.id} node ${n.id}: ${b} has neither goto nor outcome`);
      (br.diagnoses || []).forEach((d) => {
        if (d.table && !tableIds.has(d.table)) err(`tree ${t.id} node ${n.id}: diagnosis "${d.name}" -> unknown table ${d.table}`);
        if (d.seeTree && !treeIds.has(d.seeTree)) err(`tree ${t.id} node ${n.id}: diagnosis "${d.name}" -> unknown tree ${d.seeTree}`);
      });
    });
    if (!reachable.has(n.id)) err(`tree ${t.id}: node ${n.id} is unreachable from start`);
  });
});

// table structure
const tslugs = new Set();
tables.forEach((t) => {
  if (tslugs.has(t.slug)) err(`duplicate table slug ${t.slug}`);
  tslugs.add(t.slug);
  if (!t.differentials || !t.differentials.length) err(`table ${t.id}: no differentials`);
  (t.differentials || []).forEach((d) => {
    if (!d.disorder || !d.distinction) err(`table ${t.id}: differential missing disorder/distinction`);
    if (d.table && !tableIds.has(d.table)) err(`table ${t.id}: xref -> unknown table ${d.table}`);
  });
});

if (errors.length) {
  console.error(`✗ validation failed with ${errors.length} problem(s):`);
  errors.forEach((e) => console.error("  - " + e));
  process.exit(1);
}
console.log(`✓ data valid: ${trees.length} trees, ${tables.length} tables, all references resolve.`);
