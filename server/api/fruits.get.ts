import { collection, getDocs } from "firebase/firestore";
import { useFirebaseDb } from "../utils/firebase";

export default defineEventHandler(async () => {
  const db = useFirebaseDb();

  const snapshot = await getDocs(collection(db, "fruits"));

  const fruits = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });

  return {
    fruits,
  };
});
