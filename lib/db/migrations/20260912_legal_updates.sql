-- Additive migration. Run explicitly before enabling the worker; no public-request DDL.
BEGIN;
CREATE TABLE IF NOT EXISTS legal_update_runs (
 id uuid PRIMARY KEY, day date NOT NULL UNIQUE, started_at timestamptz NOT NULL DEFAULT now(),
 finished_at timestamptz, status text NOT NULL CHECK (status IN ('running','completed','partial','failed')),
 report jsonb NOT NULL DEFAULT '{}'::jsonb
);
CREATE TABLE IF NOT EXISTS legal_updates (
 id uuid PRIMARY KEY, slug text NOT NULL UNIQUE, region text NOT NULL CHECK (region IN ('sa','uae','syr')),
 source_url text NOT NULL, source_name text NOT NULL, source_hash text NOT NULL,
 source_text text NOT NULL, discovered_at timestamptz NOT NULL DEFAULT now(),
 draft jsonb NOT NULL, status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published','rejected','withdrawn')),
 reviewer text, review_note text, published_at timestamptz, modified_at timestamptz NOT NULL DEFAULT now(),
 revision integer NOT NULL DEFAULT 1, UNIQUE(region, source_url, source_hash),
 CONSTRAINT legal_updates_publication_review_check CHECK (status <> 'published' OR (reviewer IS NOT NULL AND length(trim(reviewer)) >= 3 AND review_note IS NOT NULL AND length(trim(review_note)) >= 10 AND published_at IS NOT NULL))
);
CREATE INDEX IF NOT EXISTS legal_updates_public ON legal_updates(region, published_at DESC) WHERE status = 'published';
CREATE TABLE IF NOT EXISTS legal_update_audit (
 id bigserial PRIMARY KEY, update_id uuid NOT NULL REFERENCES legal_updates(id),
 action text NOT NULL, actor text NOT NULL, snapshot jsonb NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE legal_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_update_runs ENABLE ROW LEVEL SECURITY;
ALTER TABLE legal_update_audit ENABLE ROW LEVEL SECURITY;
COMMIT;
