# Installing PSYSDD as a skill in a local AI chat model

This folder is a ready-made **skill package**:

```
skill/
├── SKILL.md                          # the skill definition (instructions + when to use)
└── references/
    └── psysdd-knowledge-pack.md      # the full framework: 6-step method, 29 trees, 66 tables
```

`SKILL.md` is written in the **Claude Agent Skills** format (YAML frontmatter + Markdown body). The sections below show how to install it in Claude tooling and how to adapt it to other local runtimes. The pattern is always the same:

> **system prompt = the body of `SKILL.md`** &nbsp;·&nbsp; **knowledge = `references/psysdd-knowledge-pack.md`** (pasted into context for large windows, or indexed for retrieval on smaller ones).

> ⚠️ **Local-model reality check.** The knowledge pack is ~1.7k lines. If your model's context window is small (≤8k tokens), don't paste the whole pack — use **retrieval (RAG)** so only the relevant tree/table is pulled in, or attach just the specific `docs/trees/*.md` / `docs/tables/*.md` files you need. Always enter **de-identified** case information only.

---

## 1. Claude Code (CLI) or Claude Agent SDK

Agent Skills load from a `skills/` directory.

```bash
# project-scoped
mkdir -p .claude/skills
cp -r skill .claude/skills/psysdd-differential-diagnosis

# or user-scoped (available in every project)
mkdir -p ~/.claude/skills
cp -r skill ~/.claude/skills/psysdd-differential-diagnosis
```

The directory name should match the skill `name` (`psysdd-differential-diagnosis`). Claude will auto-invoke it when a request matches the `description`, or you can call it explicitly. The bundled `references/psysdd-knowledge-pack.md` is read on demand.

For the **Agent SDK**, point your skills directory at the copied folder (see the SDK's skills configuration), and the skill becomes available to the agent.

## 2. Claude.ai (Projects)

Claude.ai doesn't take a folder, but you get the same behavior with a Project:

1. Create a Project.
2. **Add knowledge:** upload `references/psysdd-knowledge-pack.md`.
3. **Project instructions:** paste the body of `SKILL.md` (everything below the `---` frontmatter).

(See `knowledge/project-instructions.md` in the repo for a ready-to-paste version.)

## 3. Ollama (local models: Llama, Mistral, Qwen, etc.)

Create a **Modelfile** that bakes the skill instructions into the system prompt:

```dockerfile
# Modelfile
FROM llama3.1

SYSTEM """
<paste the body of SKILL.md here — everything below the frontmatter>
The full framework (six-step method, 29 decision trees, 66 differential
tables) will be supplied to you as reference context. Use only that
material plus the case facts. Never give a definitive diagnosis or
treatment advice. Ask for de-identified information only.
"""

PARAMETER temperature 0.3
```

```bash
ollama create psysdd -f Modelfile
ollama run psysdd
```

Ollama has no built-in document store, so supply the knowledge one of two ways:
- **Small pack / large context:** paste `references/psysdd-knowledge-pack.md` as the first message of a session, then ask your case.
- **Better:** put the pack behind a RAG front-end (Open WebUI, AnythingLLM, LlamaIndex, LangChain) so only the relevant tree/table is retrieved. See below.

## 4. Open WebUI

1. **Workspace → Models → Create a Model.** Set the base model and paste the body of `SKILL.md` as the **System Prompt**. Save it as "PSYSDD Differential Dx."
2. **Workspace → Knowledge → Create a collection**, upload `references/psysdd-knowledge-pack.md` (and optionally the per-tree/per-table files from `docs/`). Attach the collection to the model. Open WebUI will retrieve the relevant chunks per query — ideal for small local models.
3. Start a chat with that model and paste a de-identified case.

## 5. LM Studio

1. Load your model, open the **System Prompt** field, and paste the body of `SKILL.md`.
2. Save it as a **Preset** ("PSYSDD Differential Dx") so it's reusable.
3. For the knowledge: if your context window is large, paste the pack at the start of the chat; otherwise use LM Studio's document/attachment (RAG) feature to attach `references/psysdd-knowledge-pack.md`.

## 6. AnythingLLM

1. Create a **Workspace** ("PSYSDD").
2. **Upload documents:** add `references/psysdd-knowledge-pack.md` (embedded automatically for retrieval).
3. **Workspace settings → Prompt:** paste the body of `SKILL.md` as the system prompt.
4. Chat with the workspace. AnythingLLM handles retrieval, so this works well on modest local models.

## 7. Any other chat app (generic)

Any interface with a system prompt works:
- **System prompt** = the body of `SKILL.md`.
- **Knowledge** = paste `references/psysdd-knowledge-pack.md` into context (large windows), or use whatever file-attachment / RAG feature the app offers (small windows).

---

## Keeping the skill up to date

The knowledge pack is generated from the repo's single source of truth (`/data`). After any change to the framework, regenerate so the skill copy stays in sync:

```bash
node scripts/generate-docs.js   # rewrites references/psysdd-knowledge-pack.md
```

Then re-copy the `skill/` folder (or re-upload the pack) into your runtime.

## Reminder

This skill provides **decision support only**. It does not diagnose, does not advise on treatment, and does not replace clinical judgment or the full DSM-5 criteria. See the repository `DISCLAIMER.md`.
