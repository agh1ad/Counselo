---
name: Express 5 path-to-regexp v8 wildcards
description: Correct wildcard route syntax for Express 5 + path-to-regexp v8
---

In Express 5, path-to-regexp was upgraded to v8 which broke the old wildcard syntax.

**Rule:** Use `{/*param}` for catch-all segments.

```typescript
// CORRECT — works in Express 5 + path-to-regexp v8
app.get("/sa{/*path}", handler);
app.get(["/sa{/*path}", "/syr{/*path}"], handler);

// WRONG — throws PathError at startup
app.get("/sa/*", handler);         // "Missing parameter name"
app.get("/sa/:name*", handler);    // "Missing parameter name"
app.get("/sa/:name(.*)", handler); // "Unexpected ("
```

**Why:** path-to-regexp v8 requires all wildcard segments to be named. `{/*path}` is the new named-wildcard syntax. The `*` alone has no name; `:name*` suffix-star is also invalid in v8.

**How to apply:** Any time you add a catch-all Express route, use `{/*name}` not `/*`.
