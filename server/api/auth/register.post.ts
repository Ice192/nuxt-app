import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { hash } from "bcrypt-ts";
import { useFirebaseDb } from "../../utils/firebase";

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

  const existingUserQuery = query(usersRef, where("username", "==", username));

  const existingUserSnapshot = await getDocs(existingUserQuery);

  if (!existingUserSnapshot.empty) {
    throw createError({
      statusCode: 409,
      message: "Username already exists",
    });
  }

  const hashedPassword = await hash(password, 8);

  const docRef = await addDoc(usersRef, {
    username: username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    id: docRef.id,
    message: "User registered successfully",
  };
});
