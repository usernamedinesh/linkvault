import {
  pgTable,
  integer,
  identity,
  varchar,
  timestamp,
  text,
  relations,
  uniqueIndex,
} from "drizzle-orm/pg-core";

// USERS TABLE
export const users = pgTable(
  "users",
  {
    id: identity("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    email: varchar("email", { length: 256 }).notNull(),
    password: varchar("password", { length: 256 }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => ({
    emailIndex: uniqueIndex("users_email_unique").on(table.email),
  })
);

// LINKS TABLE
export const links = pgTable("links", {
  id: identity("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 512 }).notNull(),
  url: varchar("url", { length: 2048 }).notNull(),
  tag: varchar("tag", { length: 100 }),
  publishedAt: timestamp("published_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

// RELATIONS
export const usersRelations = relations(users, ({ many }) => ({
  links: many(links),
}));

export const linksRelations = relations(links, ({ one }) => ({
  author: one(users, {
    fields: [links.userId],
    references: [users.id],
  }),
}));

