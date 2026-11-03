---
name: PostgreSQL timestamp precision
description: Avoid false optimistic-concurrency conflicts when PostgreSQL timestamps are read through JavaScript Date.
---

Do not use a PostgreSQL timestamp read into a JavaScript `Date` as an exact compare-and-swap value. PostgreSQL can store microseconds, while JavaScript `Date` retains only milliseconds; equality checks can therefore report a row as changed when it was not.

**Why:** Production content rows with sub-millisecond timestamps failed optimistic checks despite no competing edit, preventing repairs from persisting.

**How to apply:** For optimistic concurrency, compare the exact timestamp representation in SQL or compare the specific source fields the operation intends to update. If using a rounded timestamp, also guard those source fields against concurrent edits.