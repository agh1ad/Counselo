---
name: Replit rebase interruptions
description: Handling an in-progress Git rebase that disappears between workspace operations.
---

On 2026-09-27, a rebase paused on a generated sitemap conflict, then the rebase state disappeared between separate tool calls; the reflog recorded an abort even though no explicit abort command had been run. Retrying produced the same behavior.

**Why:** A paused rebase did not persist reliably across workspace operations, while the branch itself was restored and remained intact.

**How to apply:** If this recurs, inspect `git status` and the reflog before acting. Keep resolution of a known generated-file conflict and `git rebase --continue` in one shell invocation. Do not auto-resolve source-code conflicts without reviewing them.