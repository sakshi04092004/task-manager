// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Add Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5ZTDn7ExV5x3vKgx6jkEGq-lLGrfaAF8",
  authDomain: "task-manager-3b495.firebaseapp.com",
  projectId: "task-manager-3b495",
  storageBucket: "task-manager-3b495.firebasestorage.app",
  messagingSenderId: "864422971829",
  appId: "1:864422971829:web:8b1724a82c2fd4059eb1fc"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Initialize Firestore and export
export const db = getFirestore(app);
