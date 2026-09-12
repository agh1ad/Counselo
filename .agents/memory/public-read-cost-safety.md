---
name: Public read cost safety
description: Rules for reducing CounselO PostgreSQL reads through revisioned public snapshots without leaking private editorial or source material.
---

Public legal-update snapshots may contain only published fields and correction text; source evidence, source reasoning, drafts, and admin records must never enter object storage or public responses. Approved public PDFs and confidentiality-approved legacy attachments may use the same internal response cache. Snapshot keys must be tied to the publication epoch, and every publish, withdrawal, correction, or exposed-monitor update must rotate that epoch before cached content is reused.

**Why:** Legal updates can be withdrawn or corrected, while their source evidence and editorial drafts are confidential. A broad cache saves more PostgreSQL reads only when publication fencing and field-level exclusion remain coupled.

**How to apply:** When adding another public snapshot or cache candidate, reuse the publication data cache and fence, project only public columns, preserve anonymous/authenticated separation, keep failures and private/admin reads uncached, and verify that every mutation affecting the cached public asset rotates the epoch.