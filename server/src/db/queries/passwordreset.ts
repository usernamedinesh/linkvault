import { eq } from "drizzle-orm";
import  dbPromise  from "../index"; // your DB instance
import { users, passwordResetTokens } from "../schema";
import bcrypt from "bcrypt";

// Delete all reset tokens for user (cleanup old tokens)
export async function deleteToken(userId: number) {
  const db = await dbPromise;
  await db.delete(passwordResetTokens).where(eq(passwordResetTokens.userId, userId));
}

// Save a new reset token with expiry (1 hour from now)
export async function saveToken(userId: number, token: string) {
  const db = await dbPromise;
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry

  const result = await db.insert(passwordResetTokens).values({
    userId,
    token,
    expiresAt,
    createdAt: new Date(),
  }).returning();

  return result[0];
}

// Validate if token exists and not expired
export async function validateExpiryAndToken(userId: number, rawToken: string): Promise<boolean> {
  const db = await dbPromise;

  const now = new Date();

  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, userId))
    .limit(1);

  if (!record) return false;
  if (record.expiresAt < now) return false;

  const isMatch = await bcrypt.compare(rawToken, record.token);
  return isMatch;
}

// Save new hashed password to user
export async function saveNewPassword(userId: number, password: string) {
  const db = await dbPromise;
  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, userId))
    .returning();

  return result[0];
}

