// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dapper-indian-322e7.firebaseapp.com",
  projectId: "dapper-indian-322e7",
  storageBucket: "dapper-indian-322e7.appspot.com",  // 🔥 fix: should end with .appspot.com
  messagingSenderId: "131205706927",
  appId: "1:131205706927:web:1343738d6000a3b193105a",
  measurementId: "G-TC6QHYHSLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firebase services
export const db = getFirestore(app);   // Firestore DB
export const auth = getAuth(app);      // Authentication
export const storage = getStorage(app); // Cloud Storage
