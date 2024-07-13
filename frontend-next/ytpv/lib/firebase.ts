import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage();

const addUnixTimeToFilename = (filename: string) => {
  const unixTime = Math.floor(Date.now() / 1000);
  const dotIndex = filename.lastIndexOf(".");

  if (dotIndex === -1) {
    // If there is no extension, just append the unix time
    return `${filename}_${unixTime}`;
  }

  const name = filename.substring(0, dotIndex);
  const extension = filename.substring(dotIndex);

  return `${name}_${unixTime}${extension}`;
};

const uploadImage = async (file: File) => {
  const filename = addUnixTimeToFilename(file.name);
  const storageRef = ref(storage, filename);
  const snapshot = await uploadBytes(storageRef, file);

  return snapshot;
};

export { uploadImage };
