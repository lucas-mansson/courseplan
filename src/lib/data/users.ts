import { query } from '@/lib/db';

export interface User {
  id: string;
  name: string;
  email: string;
  created_at: string;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { rows } = await query<User>(
    `SELECT id, name, email, created_at FROM users WHERE email = $1`,
    [email]
  );
  return rows[0] ?? null;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
}): Promise<User | null> {
  const { rows } = await query<User>(
    `INSERT INTO users (name, email, password_hash)
     VALUES ($1, $2, $3)
     RETURNING id, name, email, created_at`,
    [input.name, input.email, input.passwordHash]
  );
  return rows[0];
}
