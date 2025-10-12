import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnECPQMltJKOSugWzf1rnE4InbkEv_O3Q",
  authDomain: "dapper-indian-322e7.firebaseapp.com",
  projectId: "dapper-indian-322e7",
  storageBucket: "dapper-indian-322e7.appspot.com", // ✅ fix this (.appspot.com)
  messagingSenderId: "131205706927",
  appId: "1:131205706927:web:76beb8c78f85db7f93105a",
  measurementId: "G-096E9SCCH7"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);     // Firestore Database
export const auth = getAuth(app);        // Authentication
export const storage = getStorage(app);  // Storage (for images)
