import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "../db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

export function useDrizzle() {
  return db;
}

export type Fruits = typeof schema.fruitTable.$inferSelect;
