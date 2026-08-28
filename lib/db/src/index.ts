import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Keep the pool burst-capable, but release idle connections quickly so the
  // serverless database has a better chance to return to an idle state between
  // traffic bursts. Active requests still reuse warm pooled connections.
  idleTimeoutMillis: 5_000,
  allowExitOnIdle: true,
});
export const db = drizzle(pool, { schema });

export * from "./schema";
