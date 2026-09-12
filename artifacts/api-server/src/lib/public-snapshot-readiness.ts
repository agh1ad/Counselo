let dataStartupPrewarmPending = false;
let workFileStartupPrewarmPending = false;

/**
 * A new production process must not serve or cache the previous snapshot while
 * it is rebuilding the active publication epoch from PostgreSQL.
 */
export function beginPublicSnapshotStartupPrewarm(): void {
  dataStartupPrewarmPending = true;
  workFileStartupPrewarmPending = true;
}

export function completePublicDataSnapshotStartupPrewarm(): void {
  dataStartupPrewarmPending = false;
}

export function completePublicWorkFileSnapshotStartupPrewarm(): void {
  workFileStartupPrewarmPending = false;
}

export function publicDataSnapshotReadsReady(): boolean {
  return !dataStartupPrewarmPending;
}

export function publicWorkFileSnapshotReadsReady(): boolean {
  return !workFileStartupPrewarmPending;
}