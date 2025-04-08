import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDaeY081ZllYfyIUbEEuBnthVNfAlKVxtM",
  authDomain: "vote-a9b90.firebaseapp.com",
  projectId: "vote-a9b90",
  storageBucket: "vote-a9b90.appspot.com",
  messagingSenderId: "417903220094",
  appId: "1:417903220094:web:edcefea6bab191c4b5cf2f",
  measurementId: "G-JYLMMNNWN3",
  databaseURL: "https://vote-a9b90-default-rtdb.asia-southeast1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
const storage = getStorage(app);

const database = getDatabase(app);

export { auth, googleProvider, storage, database };
