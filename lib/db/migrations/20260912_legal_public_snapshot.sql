-- Supports the public-only legal-update snapshot without scanning unrelated audit rows.
CREATE INDEX IF NOT EXISTS legal_updates_audit_public_corrections
  ON legal_update_audit(update_id, created_at DESC)
  WHERE action = 'publish'
    AND coalesce(snapshot->'afterEditorial'->>'correctionEn','') <> '';