import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const fruitTable = sqliteTable("fruit", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
});

export const userTable = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  username: text().notNull(),
  password: text().notNull(),
});
