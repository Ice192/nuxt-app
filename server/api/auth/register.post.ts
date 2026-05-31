import { hash } from "bcrypt-ts";
import * as tables from "../../db/schema";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "Username & Password must be provided in data body",
    });
  }

  const hashpassword = await hash(password, 8);

  const db = useDrizzle();
  const insertResult = await db
    .insert(tables.userTable)
    .values({
      username: username,
      password: hashpassword,
    })
    .returning();

  return { insertResult };
});
