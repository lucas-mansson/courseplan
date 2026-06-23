import { query } from "@/lib/db";
import { createUser } from "@/app/users/actions";

export default async function Home() {
  const { rows } = await query("SELECT id, name, email FROM users ORDER BY id");

  return (
    <div>
      <main>
        {rows.map((user) => (
          <li key={user.id}>
            {user.name} — {user.email}
          </li>
        ))}
        <form action={createUser}>
          <input name="name" placeholder="Name" required />
          <input name="email" type="email" placeholder="Email" required />
          <button type="submit">Create User</button>
        </form>
      </main>
    </div>
  );
}
