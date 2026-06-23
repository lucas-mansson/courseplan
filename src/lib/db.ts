import { Pool, PoolClient, QueryResultRow } from "pg";

declare global {
  var pgPool: Pool | undefined;
}

const pool =
  global.pgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,
  });

pool.on("error", (err) => {
  console.error("Unexpected error on idle pg client", err);
});

if (process.env.NODE_ENV !== "production") {
  global.pgPool = pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  sql: string,
  params?: unknown[]
) {
  const start = Date.now();
  const result = await pool.query<T>(sql, params);
  if (process.env.NODE_ENV !== "production") {
    console.log("query", {
      sql,
      duration: Date.now() - start,
      rows: result.rowCount,
    });
  }
  return result;
}

export async function withTransaction<T>(
  fn: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const result = await fn(client);
    await client.query("COMMIT");
    return result;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
