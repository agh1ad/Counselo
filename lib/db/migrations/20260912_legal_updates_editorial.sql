-- Additive follow-up, safe to apply after the base legal-updates migration.
BEGIN;
ALTER TABLE legal_updates ADD COLUMN IF NOT EXISTS editorial jsonb NOT NULL DEFAULT '{}'::jsonb;
ALTER TABLE legal_updates ADD COLUMN IF NOT EXISTS source_checked_at timestamptz;
ALTER TABLE legal_updates ADD COLUMN IF NOT EXISTS source_check_status text;
CREATE INDEX IF NOT EXISTS legal_updates_public_order ON legal_updates(published_at DESC,id DESC) WHERE status='published';
CREATE INDEX IF NOT EXISTS legal_updates_public_services ON legal_updates USING gin ((draft->'serviceSlugs')) WHERE status='published';
CREATE INDEX IF NOT EXISTS legal_updates_source_check ON legal_updates(source_checked_at ASC NULLS FIRST) WHERE status='published';
CREATE INDEX IF NOT EXISTS legal_updates_audit_history ON legal_update_audit(update_id,created_at DESC);
COMMIT;
