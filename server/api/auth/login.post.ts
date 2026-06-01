import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { compare } from "bcrypt-ts";
import jwt from "jsonwebtoken";
import { useFirebaseDb } from "../../utils/firebase";

type Users = {
  username: string;
  password: string;
};

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "Username & Password must be provided in data body",
    });
  }

  const db = useFirebaseDb();

  const usersRef = collection(db, "users");

  const userQuery = query(
    usersRef,
    where("username", "==", username),
    limit(1),
  );

  const snapshot = await getDocs(userQuery);

  if (snapshot.empty) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  const userDoc = snapshot.docs.at(0);
  if (!userDoc) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }
  const userData = userDoc.data() as Users;

  const passwordIsValid = await compare(password, userData.password);

  if (!passwordIsValid) {
    throw createError({
      statusCode: 401,
      message: "Invalid password",
    });
  }

  const config = useRuntimeConfig();

  const token = jwt.sign(
    {
      id: userDoc.id,
      username: userData.username,
    },
    config.secretKey,
    {
      algorithm: "HS256",
      expiresIn: "1d",
    },
  );

  return {
    success: true,
    token,
    user: {
      id: userDoc.id,
      username: userData.username,
    },
  };
});
