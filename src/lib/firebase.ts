// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZsaS0Q_DxlcHRA5-oZ0o3sq76jmpT0bI",
  authDomain: "transacttrace-nexus-e2429.firebaseapp.com",
  projectId: "transacttrace-nexus-e2429",
  storageBucket: "transacttrace-nexus-e2429.firebasestorage.app",
  messagingSenderId: "368835209510",
  appId: "1:368835209510:web:234dae70aacab0ff82f9e7",
  measurementId: "G-HF2FV96V31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
