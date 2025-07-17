import { dbPromise } from "../index";
import { links, users } from "../schema";
import { eq, and } from "drizzle-orm";

// Create a new link
export async function createLink(title: string, url: string, tag: string, userId: number) {
  const db = await dbPromise;

 // 🔍 Check if a link with this title already exists for the user
  const existing = await db
    .select()
    .from(links)
    .where(and(eq(links.title, title), eq(links.userId, userId)))
    .limit(1);

  if (existing.length > 0) {
    // 🚫 Title already exists for this user
    return null;
  }

  const inserted = await db
    .insert(links)
    .values({
      title,
      url,
      tag,
      userId,
      publishedAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

  return inserted[0]; // return the inserted row
}

// Check if userId is valid (user exists)
export async function isValidUserId(userId: number): Promise<boolean> {
  const db = await dbPromise;

  const [user] = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return !!user;
}


export async function getLink(userId: string) {
    const db = await dbPromise;

    const result = await db
        .select()
        .from(links)
        .where(eq(links.userId, userId))
        .orderBy(links.publishedAt); // optional: order by publish date
    return result;
}

// Update link by ID
export async function updateLinkById(id: number, updates: { title?: string; url?: string; tag?: string }) {
  const db = await dbPromise;

  const updated = await db
    .update(links)
    .set({
      ...updates,
      updatedAt: new Date(),
    })
    .where(eq(links.id, id))
    .returning();

  return updated[0];
}

// Delete link by ID
export async function deleteLinkById(id: number) {
  const db = await dbPromise;

  await db.delete(links).where(eq(links.id, id));
}

// Check if user owns the link
export async function isLinkOwnedByUser(linkId: number, userId: number): Promise<boolean> {
  const db = await dbPromise;

  const [link] = await db
    .select()
    .from(links)
    .where(eq(links.id, linkId))
    .limit(1);

  return !!link && link.userId === userId;
}
