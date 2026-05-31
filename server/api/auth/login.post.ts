import { compare } from "bcrypt-ts";
import * as tables from "../../db/schema";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "Username & Password must be provided in data body",
    });
  }

  const db = useDrizzle();

  const user = db
    .select()
    .from(tables.userTable)
    .where(eq(tables.userTable.username, username))
    .limit(1)
    .get();

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "User not found in Database",
    });
  }

  if (!(await compare(password, user.password))) {
    throw createError({
      statusCode: 401,
      message: "Invalid Password",
    });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.SECRET_KEY!,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    },
  );
  return { token };
});
