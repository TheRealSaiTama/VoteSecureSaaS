import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDaeY081ZllYfyIUbEEuBnthVNfAlKVxtM",
  authDomain: "vote-a9b90.firebaseapp.com",
  projectId: "vote-a9b90",
  storageBucket: "vote-a9b90.firebasestorage.app",
  messagingSenderId: "417903220094",
  appId: "1:417903220094:web:edcefea6bab191c4b5cf2f",
  measurementId: "G-JYLMMNNWN3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});
const storage = getStorage(app);

export { auth, googleProvider, storage };