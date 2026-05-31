import { fruitTable } from "../db/schema";
import { useDrizzle } from "../utils/drizzle";

export const database = ["apple", "banana", "orange", "grape", "strawberry"];

export default defineEventHandler((event) => {
  const fruits = useDrizzle().select().from(fruitTable).all();

  return {
    database,
    fruits,
  };
});
