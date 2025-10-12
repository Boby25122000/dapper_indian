import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAnECPQMltJKOSugWzf1rnE4InbkEv_O3Q",
  authDomain: "dapper-indian-322e7.firebaseapp.com",
  projectId: "dapper-indian-322e7",
  storageBucket: "dapper-indian-322e7.appspot.com", // ✅ correct
  messagingSenderId: "131205706927",
  appId: "1:131205706927:web:76beb8c78f85db7f93105a",
  measurementId: "G-096E9SCCH7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
