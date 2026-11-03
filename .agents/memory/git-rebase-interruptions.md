---
name: Git operation interruptions
description: Handling in-progress rebases or merges that disappear between workspace operations.
---

On 2026-09-27, a rebase paused on a generated sitemap conflict, then the rebase state disappeared between separate tool calls; the reflog recorded an abort even though no explicit abort command had been run. Retrying produced the same behavior.

On 2026-10-06, an in-progress merge with source conflicts was reported, but the next workspace continuation had a clean tree and no `MERGE_HEAD`. The remote commit was still unmerged, so a fresh fetch and status/ref inspection were needed before merging again.

**Why:** Paused Git operation state may not persist reliably across workspace operations, even when the branch and its local commits remain intact.

**How to apply:** If this recurs, inspect `git status`, the reflog, and remote refs before acting. If the operation state is gone, fetch and recompute divergence before starting again. Keep resolution and continuation together where practical, and do not auto-resolve source-code conflicts without reviewing them.