/* PSYSDD single-page app. Loads JSON data and renders framework, trees, tables, and search. */
(function () {
  "use strict";

  var DATA = { meta: null, framework: null, trees: null, tables: null };
  var TREE_BY_ID = {}, TABLE_BY_ID = {}, TREE_BY_SLUG = {}, TABLE_BY_SLUG = {};
  var app = document.getElementById("app");

  /* ---------- utilities ---------- */
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  function h(tag, attrs, children) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") e.className = attrs[k];
      else if (k === "html") e.innerHTML = attrs[k];
      else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function") e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c == null) return; e.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return e;
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ---------- data loading ---------- */
  function load() {
    return Promise.all([
      fetch("data/meta.json").then(function (r) { return r.json(); }),
      fetch("data/framework.json").then(function (r) { return r.json(); }),
      fetch("data/trees.json").then(function (r) { return r.json(); }),
      fetch("data/tables.json").then(function (r) { return r.json(); })
    ]).then(function (res) {
      DATA.meta = res[0]; DATA.framework = res[1]; DATA.trees = res[2]; DATA.tables = res[3];
      DATA.trees.forEach(function (t) { TREE_BY_ID[t.id] = t; TREE_BY_SLUG[t.slug] = t; });
      DATA.tables.forEach(function (t) { TABLE_BY_ID[t.id] = t; TABLE_BY_SLUG[t.slug] = t; });
    });
  }

  /* ---------- router ---------- */
  var routes = [];
  function route(re, handler) { routes.push({ re: re, handler: handler }); }
  function navigate() {
    var hash = location.hash.replace(/^#/, "") || "/";
    setActiveNav(hash);
    hideSearch();
    for (var i = 0; i < routes.length; i++) {
      var m = hash.match(routes[i].re);
      if (m) { clear(app); routes[i].handler.apply(null, m.slice(1)); window.scrollTo(0, 0); return; }
    }
    clear(app); app.appendChild(h("div", { class: "panel" }, ["Page not found. ", h("a", { href: "#/" }, ["Return home"])]));
  }
  function setActiveNav(hash) {
    document.querySelectorAll(".mainnav a").forEach(function (a) {
      var target = a.getAttribute("href").replace(/^#/, "");
      var on = target === "/" ? hash === "/" : hash.indexOf(target) === 0;
      a.classList.toggle("active", on);
    });
  }

  /* ---------- views ---------- */
  function viewHome() {
    var hero = h("section", { class: "hero" }, [
      h("h1", {}, ["Psychiatric Differential Diagnosis — a decision guide"]),
      h("p", { class: "lede" }, ["A symptom-driven, DSM-5–based decision-support tool: a six-step diagnostic method, ", h("strong", {}, [String(DATA.trees.length)]), " interactive symptom decision trees, and ", h("strong", {}, [String(DATA.tables.length)]), " head-to-head disorder differential tables. Built to support clinical reasoning at the point of care and to teach the structure behind it."]),
      h("div", { class: "cta-row" }, [
        h("a", { class: "btn primary", href: "#/trees" }, ["Start from a symptom →"]),
        h("a", { class: "btn", href: "#/framework" }, ["The six-step method"]),
        h("a", { class: "btn", href: "#/tables" }, ["Browse differential tables"])
      ])
    ]);

    var how = h("section", { class: "panel", style: "margin-top:22px" }, [
      h("h2", {}, ["How to use this guide"]),
      h("ol", { class: "prose" }, [
        h("li", {}, ["Orient with the ", h("a", { href: "#/framework" }, ["six-step method"]), " — rule out feigning, substances, and medical causes before pursuing a primary disorder."]),
        h("li", {}, ["Pick the ", h("a", { href: "#/trees" }, ["decision tree"]), " that matches the presenting symptom and answer each decision point Yes/No to reach candidate diagnoses."]),
        h("li", {}, ["Confirm with the disorder's ", h("a", { href: "#/tables" }, ["differential table"]), " to make sure the main competitors have been considered and ruled out."]),
        h("li", {}, ["Always return to the full DSM-5 criteria before finalizing — the trees summarize only the differentiating features."])
      ])
    ]);

    var quick = h("section", {}, [ h("h2", {}, ["Jump to a common presentation"]) ]);
    var common = ["2.10", "2.5", "2.6", "2.13", "2.8", "2.28", "2.2", "2.16", "2.26", "2.17"];
    var grid = h("div", { class: "card-grid" }, common.map(function (id) {
      var t = TREE_BY_ID[id]; if (!t) return null;
      return h("a", { class: "card", href: "#/tree/" + t.slug }, [
        h("div", { class: "card-id" }, [t.id]),
        h("div", { class: "card-title" }, [t.title]),
        h("div", { class: "card-sub" }, [t.presenting])
      ]);
    }));
    quick.appendChild(grid);

    var caveat = h("div", { class: "callout" }, [
      h("strong", {}, ["Not a diagnostic authority. "]),
      "This is an educational decision-support reference. It does not diagnose, does not replace clinical judgment or the DSM-5 text, and must not be used as the sole basis for any clinical decision. ",
      h("a", { href: "#/about" }, ["Read the full disclaimer."])
    ]);

    app.appendChild(hero); app.appendChild(how); app.appendChild(quick); app.appendChild(caveat);
  }

  function viewFramework() {
    var f = DATA.framework;
    app.appendChild(h("div", { class: "breadcrumb" }, [h("a", { href: "#/" }, ["Home"]), " / Framework"]));
    app.appendChild(h("h1", {}, [f.title]));
    app.appendChild(h("p", { class: "prose" }, [f.intro]));

    f.steps.forEach(function (s) {
      var body = h("div", { class: "step-body", hidden: "" }, [ h("p", {}, [s.detail]) ]);
      if (s.considerFlags) {
        body.appendChild(h("p", { html: "<strong>Raise your index of suspicion when:</strong>" }));
        body.appendChild(h("ul", {}, s.considerFlags.map(function (x) { return h("li", {}, [x]); })));
      }
      var head = h("div", { class: "step-head" }, [
        h("div", { class: "step-num" }, [String(s.n)]),
        h("div", {}, [ h("h3", {}, [s.title]), h("div", { class: "step-summary" }, [s.summary]) ])
      ]);
      head.addEventListener("click", function () { body.hidden = !body.hidden; });
      app.appendChild(h("div", { class: "step" }, [head, body]));
    });

    app.appendChild(h("div", { class: "callout info", style: "margin-top:22px" }, [
      h("strong", {}, ["On comorbidity. "]), f.comorbidityNote
    ]));
  }

  function viewTreeIndex() {
    app.appendChild(h("div", { class: "breadcrumb" }, [h("a", { href: "#/" }, ["Home"]), " / Decision Trees"]));
    app.appendChild(h("h1", {}, ["Symptom Decision Trees"]));
    app.appendChild(h("p", { class: "prose" }, ["Start from the presenting symptom. Each tree walks the differential from etiologic rule-outs through the primary disorders. Organized by DSM-5 grouping."]));
    DATA.meta.treeGroups.forEach(function (g) {
      var chips = h("div", { class: "chip-row" }, g.trees.map(function (id) {
        var t = TREE_BY_ID[id]; if (!t) return null;
        return h("a", { class: "chip", href: "#/tree/" + t.slug }, [ h("span", { class: "chip-id" }, [t.id]), t.title ]);
      }));
      app.appendChild(h("div", { class: "group-block" }, [ h("h3", {}, [g.label]), chips ]));
    });
  }

  function viewTree(slug) {
    var t = TREE_BY_SLUG[slug];
    if (!t) return app.appendChild(h("div", { class: "panel" }, ["Unknown tree."]));
    app.appendChild(h("div", { class: "breadcrumb" }, [ h("a", { href: "#/" }, ["Home"]), " / ", h("a", { href: "#/trees" }, ["Decision Trees"]), " / " + t.id ]));
    app.appendChild(h("h1", {}, [t.title]));
    app.appendChild(h("div", { class: "pill-note" }, ["Presenting: " + t.presenting]));
    if (t.overview) app.appendChild(h("div", { class: "overview-note" }, [t.overview]));

    var tabWalk = h("button", { class: "active" }, ["Interactive walk-through"]);
    var tabOutline = h("button", {}, ["Full tree outline"]);
    var container = h("div", {});
    function showWalk() { tabWalk.classList.add("active"); tabOutline.classList.remove("active"); clear(container); container.appendChild(renderWalker(t)); }
    function showOutline() { tabOutline.classList.add("active"); tabWalk.classList.remove("active"); clear(container); container.appendChild(renderOutline(t)); }
    tabWalk.addEventListener("click", showWalk); tabOutline.addEventListener("click", showOutline);
    app.appendChild(h("div", { class: "viewtabs" }, [tabWalk, tabOutline]));
    app.appendChild(container);
    showWalk();
  }

  function nodeById(tree, id) { for (var i = 0; i < tree.nodes.length; i++) if (tree.nodes[i].id === id) return tree.nodes[i]; return null; }

  function renderWalker(tree) {
    var state = { current: tree.start, trail: [] };
    var panel = h("div", { class: "panel tree-layout" }, []);
    function step() {
      clear(panel);
      // trail
      if (state.trail.length) {
        panel.appendChild(h("div", { class: "trail" }, state.trail.map(function (s) {
          return h("div", { class: "trail-item" }, [ h("span", { class: "ans " + (s.answer === "yes" ? "y" : "n") }, [s.answer === "yes" ? "YES" : "NO"]), h("span", { class: "q" }, [s.question]) ]);
        })));
      }
      var node = nodeById(tree, state.current);
      panel.appendChild(h("div", { class: "walker-question" }, [node.question]));
      if (node.note) panel.appendChild(h("div", { class: "walker-note" }, [node.note]));
      var yesBtn = h("button", { class: "btn-yes" }, ["Yes"]);
      var noBtn = h("button", { class: "btn-no" }, ["No"]);
      yesBtn.addEventListener("click", function () { answer(node, "yes"); });
      noBtn.addEventListener("click", function () { answer(node, "no"); });
      panel.appendChild(h("div", { class: "walker-actions" }, [yesBtn, noBtn]));
      var back = h("button", {}, ["← Back"]); back.disabled = state.trail.length === 0;
      back.addEventListener("click", function () { var last = state.trail.pop(); if (last) { state.current = last.from; step(); } });
      var restart = h("button", {}, ["↺ Restart"]);
      restart.addEventListener("click", function () { state.current = tree.start; state.trail = []; step(); });
      panel.appendChild(h("div", { class: "walker-controls" }, [back, restart]));
    }
    function answer(node, ans) {
      state.trail.push({ from: node.id, question: node.question, answer: ans });
      var branch = node[ans];
      if (branch.goto) { state.current = branch.goto; step(); }
      else { renderOutcome(branch); }
    }
    function renderOutcome(branch) {
      clear(panel);
      panel.appendChild(h("div", { class: "trail" }, state.trail.map(function (s) {
        return h("div", { class: "trail-item" }, [ h("span", { class: "ans " + (s.answer === "yes" ? "y" : "n") }, [s.answer === "yes" ? "YES" : "NO"]), h("span", { class: "q" }, [s.question]) ]);
      })));
      var isNoDx = branch.kind === "no-disorder";
      var box = h("div", { class: "outcome" + (isNoDx ? " no-disorder" : "") }, [
        h("h3", {}, [isNoDx ? "Endpoint" : (branch.kind === "refer" ? "Continue elsewhere" : (branch.kind === "intermediate" ? "Intermediate conclusion" : "Candidate diagnosis"))]),
        h("p", { style: "margin:.2em 0 0;font-size:1.05rem" }, [branch.outcome])
      ]);
      if (branch.diagnoses && branch.diagnoses.length) {
        box.appendChild(h("ul", { class: "dx-list" }, branch.diagnoses.map(function (d) {
          var links = h("div", { class: "dx-links" }, []);
          if (d.table && TABLE_BY_ID[d.table]) links.appendChild(h("a", { class: "tag", href: "#/table/" + TABLE_BY_ID[d.table].slug }, ["Differential table " + d.table]));
          if (d.seeTree && TREE_BY_ID[d.seeTree]) links.appendChild(h("a", { class: "tag", href: "#/tree/" + TREE_BY_ID[d.seeTree].slug }, ["Tree " + d.seeTree]));
          return h("li", {}, [ h("span", { class: "dx-name" }, [d.name]), links ]);
        })));
      }
      panel.appendChild(box);
      var restart = h("button", {}, ["↺ Start over"]);
      restart.addEventListener("click", function () { state.current = tree.start; state.trail = []; step(); });
      var back = h("button", {}, ["← Back"]);
      back.addEventListener("click", function () { var last = state.trail.pop(); if (last) { state.current = last.from; step(); } });
      panel.appendChild(h("div", { class: "walker-controls" }, [back, restart]));
      panel.appendChild(h("p", { class: "walker-note", style: "margin-top:14px" }, ["Confirm against the full DSM-5 criteria before finalizing. Multiple diagnoses may apply — re-run the tree for each co-occurring symptom."]));
    }
    step();
    return panel;
  }

  function renderOutline(tree) {
    var panel = h("div", { class: "panel" }, []);
    panel.appendChild(h("p", { class: "walker-note" }, ["Every decision point in order. Y = yes branch, N = no branch."]));
    var out = h("div", { class: "outline" }, []);
    tree.nodes.forEach(function (node) {
      function branchLine(cls, label, branch) {
        var kids = [ h("span", { class: "lbl " + cls }, [label]) ];
        if (branch.goto) { var gnode = nodeById(tree, branch.goto); kids.push(document.createTextNode("→ " + (gnode ? gnode.question : branch.goto))); }
        else {
          kids.push(document.createTextNode(branch.outcome));
          (branch.diagnoses || []).forEach(function (d) {
            if (d.table && TABLE_BY_ID[d.table]) kids.push(h("a", { class: "tag", href: "#/table/" + TABLE_BY_ID[d.table].slug, style: "margin-left:6px" }, [d.name + " (" + d.table + ")"]));
            else kids.push(h("span", { class: "pill-note", style: "margin-left:6px" }, [d.name]));
          });
        }
        return h("div", { class: "outline-branch" }, kids);
      }
      out.appendChild(h("div", { class: "outline-node" }, [
        h("div", { class: "outline-q" }, [node.question]),
        branchLine("y", "Y", node.yes),
        branchLine("n", "N", node.no)
      ]));
    });
    panel.appendChild(out);
    return panel;
  }

  function viewTableIndex() {
    app.appendChild(h("div", { class: "breadcrumb" }, [h("a", { href: "#/" }, ["Home"]), " / Differential Tables"]));
    app.appendChild(h("h1", {}, ["Disorder Differential Tables"]));
    app.appendChild(h("p", { class: "prose" }, ["After reaching a candidate diagnosis, use its table to confirm the main competitors have been considered and ruled out. Organized by DSM-5 grouping."]));
    DATA.meta.tableGroups.forEach(function (g) {
      var chips = h("div", { class: "chip-row" }, g.tables.map(function (id) {
        var t = TABLE_BY_ID[id]; if (!t) return null;
        return h("a", { class: "chip", href: "#/table/" + t.slug }, [ h("span", { class: "chip-id" }, [t.id]), t.title ]);
      }));
      app.appendChild(h("div", { class: "group-block" }, [ h("h3", {}, [g.label]), chips ]));
    });
  }

  function viewTable(slug) {
    var t = TABLE_BY_SLUG[slug];
    if (!t) return app.appendChild(h("div", { class: "panel" }, ["Unknown table."]));
    app.appendChild(h("div", { class: "breadcrumb" }, [ h("a", { href: "#/" }, ["Home"]), " / ", h("a", { href: "#/tables" }, ["Differential Tables"]), " / " + t.id ]));
    app.appendChild(h("h1", {}, [t.title]));
    if (t.targetDescription) app.appendChild(h("div", { class: "target-desc" }, [ h("strong", {}, [t.target + ": "]), t.targetDescription ]));
    var rows = t.differentials.map(function (d) {
      var name = d.table && TABLE_BY_ID[d.table] ? h("a", { href: "#/table/" + TABLE_BY_ID[d.table].slug }, [d.disorder]) : document.createTextNode(d.disorder);
      return h("tr", {}, [ h("td", { class: "disorder" }, [name]), h("td", {}, [d.distinction]) ]);
    });
    var table = h("table", { class: "dx-table" }, [
      h("thead", {}, [ h("tr", {}, [ h("th", {}, ["Consider and rule out"]), h("th", {}, ["How it is distinguished from " + t.target]) ]) ]),
      h("tbody", {}, rows)
    ]);
    app.appendChild(h("div", { class: "table-scroll" }, [table]));
    app.appendChild(h("p", { class: "walker-note", style: "margin-top:16px" }, ["Distinctions summarize differentiating features only. Confirm the full DSM-5 criteria for each disorder considered."]));
  }

  function viewAbout() {
    app.appendChild(h("div", { class: "breadcrumb" }, [h("a", { href: "#/" }, ["Home"]), " / About"]));
    app.appendChild(h("h1", {}, ["About & Disclaimer"]));
    app.appendChild(h("div", { class: "callout" }, [
      h("strong", {}, ["Medical disclaimer. "]),
      "PSYSDD is an educational decision-support reference intended for qualified clinicians and trainees. It summarizes DSM-5 differential-diagnosis logic and does not itself establish any diagnosis. It is not a substitute for clinical judgment, a complete evaluation, or the full text of DSM-5, and it must not be used as the sole basis for any diagnostic or treatment decision. No clinician–patient relationship is created by its use."
    ]));
    if (DATA.meta.intendedUse) app.appendChild(h("div", { class: "callout info" }, [ h("strong", {}, ["Intended use. "]), DATA.meta.intendedUse ]));
    app.appendChild(h("div", { class: "prose" }, [
      h("h2", {}, ["What this is"]),
      h("p", {}, [DATA.meta.description]),
      h("h2", {}, ["Sources, attribution & citation"]),
      h("p", {}, [DATA.meta.attribution]),
      DATA.meta.citationStyle ? h("p", {}, [h("strong", {}, ["Citing criteria: "]), DATA.meta.citationStyle]) : null,
      h("h2", {}, ["Independence & trademarks"]),
      h("p", {}, [DATA.meta.nonAffiliation || "PSYSDD is an independent, open project and is not affiliated with, authorized by, or endorsed by the American Psychiatric Association."]),
      h("h2", {}, ["Coverage"]),
      h("p", {}, [String(DATA.trees.length) + " symptom decision trees and " + DATA.tables.length + " disorder differential tables, plus the six-step diagnostic method."]),
      h("h2", {}, ["Contributing & corrections"]),
      h("p", {}, ["The diagnostic content lives in versioned JSON files under ", h("code", {}, ["/data"]), ". Corrections and improvements are welcome via pull request on GitHub."])
    ]));
  }

  /* ---------- search ---------- */
  var searchIndex = [];
  function buildSearchIndex() {
    DATA.trees.forEach(function (t) {
      searchIndex.push({ kind: "Tree", title: t.title, sub: "Symptom: " + t.presenting, href: "#/tree/" + t.slug, hay: (t.title + " " + t.presenting + " " + (t.overview || "")).toLowerCase() });
      t.nodes.forEach(function (n) {
        ["yes", "no"].forEach(function (b) { if (n[b].diagnoses) n[b].diagnoses.forEach(function (d) {
          searchIndex.push({ kind: "Diagnosis in tree", title: d.name, sub: t.title, href: "#/tree/" + t.slug, hay: d.name.toLowerCase() });
        }); });
      });
    });
    DATA.tables.forEach(function (t) {
      searchIndex.push({ kind: "Differential table", title: t.title, sub: t.target, href: "#/table/" + t.slug, hay: (t.title + " " + t.target + " " + (t.targetDescription || "")).toLowerCase() });
      t.differentials.forEach(function (d) {
        searchIndex.push({ kind: "Compared in " + t.id, title: d.disorder, sub: "vs. " + t.target, href: "#/table/" + t.slug, hay: d.disorder.toLowerCase() });
      });
    });
  }
  function dedupeResults(list) {
    var seen = {}, out = [];
    list.forEach(function (r) { var key = r.kind + "|" + r.title + "|" + r.href; if (!seen[key]) { seen[key] = 1; out.push(r); } });
    return out;
  }
  var searchBox = document.getElementById("globalSearch");
  var searchResults = document.getElementById("searchResults");
  function hideSearch() { searchResults.hidden = true; searchResults.innerHTML = ""; }
  searchBox.addEventListener("input", function () {
    var q = searchBox.value.trim().toLowerCase();
    if (q.length < 2) { hideSearch(); return; }
    var terms = q.split(/\s+/);
    var hits = dedupeResults(searchIndex.filter(function (r) { return terms.every(function (tm) { return r.hay.indexOf(tm) !== -1; }); })).slice(0, 40);
    clear(searchResults);
    if (!hits.length) { searchResults.appendChild(h("div", { class: "sr-empty" }, ["No matches for “" + searchBox.value + "”."])); }
    else hits.forEach(function (r) {
      var a = h("a", { href: r.href }, [ h("div", { class: "sr-kind" }, [r.kind]), h("div", {}, [r.title]), h("div", { class: "sr-sub" }, [r.sub]) ]);
      a.addEventListener("click", function () { searchBox.value = ""; hideSearch(); });
      searchResults.appendChild(a);
    });
    searchResults.hidden = false;
  });
  document.addEventListener("click", function (e) {
    if (!searchResults.contains(e.target) && e.target !== searchBox) hideSearch();
  });

  /* ---------- theme ---------- */
  var themeToggle = document.getElementById("themeToggle");
  function applyTheme(t) { if (t) document.documentElement.setAttribute("data-theme", t); }
  try { applyTheme(localStorage.getItem("psysdd-theme")); } catch (e) {}
  themeToggle.addEventListener("click", function () {
    var cur = document.documentElement.getAttribute("data-theme");
    var next = cur === "dark" ? "light" : (cur === "light" ? "dark" : (matchMedia("(prefers-color-scheme: dark)").matches ? "light" : "dark"));
    applyTheme(next); try { localStorage.setItem("psysdd-theme", next); } catch (e) {}
  });

  /* ---------- boot ---------- */
  route(/^\/$/, viewHome);
  route(/^\/framework$/, viewFramework);
  route(/^\/trees$/, viewTreeIndex);
  route(/^\/tree\/([^/]+)$/, viewTree);
  route(/^\/tables$/, viewTableIndex);
  route(/^\/table\/([^/]+)$/, viewTable);
  route(/^\/about$/, viewAbout);

  load().then(function () {
    buildSearchIndex();
    window.addEventListener("hashchange", navigate);
    navigate();
  }).catch(function (err) {
    clear(app);
    app.appendChild(h("div", { class: "callout" }, ["Failed to load data files. If you opened this file directly, serve the folder over HTTP (e.g. ", h("code", {}, ["python3 -m http.server"]), ") — browsers block fetch() on file:// URLs.", h("br"), h("small", {}, [String(err)])]));
  });
})();
