import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

export function useFirebaseDb() {
  const config = useRuntimeConfig();

  const firebaseConfig = {
    apiKey: config.firebaseApiKey,
    authDomain: config.firebaseAuthDomain,
    projectId: config.firebaseProjectId,
    storageBucket: config.firebaseStorageBucket,
    messagingSenderId: config.firebaseMessagingSenderId,
    appId: config.firebaseAppId,
  };

  const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

  return getFirestore(app!);
}
