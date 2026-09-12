---
name: Public snapshot publication fence
description: Public content is served from object-storage snapshots prepared before a publication epoch becomes active.
---

Public blog, work, legal-update, and approved work-file requests must read only the object-storage snapshot for the active publication epoch. PostgreSQL is reserved for startup or fenced publication prewarming; a missing production snapshot fails closed with a temporary-unavailable response.

**Why:** Allowing a public cache miss to query PostgreSQL made crawler bursts, deployments, and cache-namespace changes expensive and could expose withdrawn content during an incomplete refresh.

**How to apply:** Any new anonymous published-content route must consume an epoch-keyed snapshot and be included in the startup/publication prewarm. Keep drafts, admin data, contacts, and private files outside this path.