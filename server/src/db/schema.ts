
import { pgTable, integer, identity, varchar, timestamp, relations } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: identity("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  password: varchar("password", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const links = pgTable("links", {
  id: identity("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  name: varchar("name", { length: 512 }).notNull(),
  url: varchar("url", { length: 5000 }),
  tag: varchar("tag", {length:200}),
  publishedAt: timestamp("published_at"),
});

export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}));
export const linksRelations = relations(links, ({ one }) => ({
  author: one(users, { fields: [links.userId], references: [users.id] }),
}));
