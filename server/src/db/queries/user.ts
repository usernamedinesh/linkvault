import { eq } from "drizzle-orm";
import { dbPromise } from "../index";
import { users } from "../schema";

export async function findUserByEmail(email: string) {
  const db = await dbPromise; // Await the DB instance
  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result[0] || null;
}

export async function createUser({
  name,
  email,
  password,
}: {
  name: string;
  email: string;
  password: string;
}) {
  const db = await dbPromise;
  const result = await db
    .insert(users)
    .values({ name, email, password })
    .returning();
  return result[0];
}

export async function get_user_profile(userId: number) {
    const db = await dbPromise;
    const result = await db.select({id: users.id, name: users.name, email: users.email}).from(users).where(eq(users.id, userId)).limit(1);
    return result[0] || null;
}

