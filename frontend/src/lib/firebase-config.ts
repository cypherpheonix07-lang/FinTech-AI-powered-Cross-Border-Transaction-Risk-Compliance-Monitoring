/**
 * 🛡️ PATHGUARD (PROJECT AEGIS): OMEGA PROTOCOL V2.0
 * LIB/FIREBASE-CONFIG.TS - Secure Backend Initialization
 * 
 * ☢️ NUCLEAR WARNING:
 * API Keys are public in client-side Firebase. 
 * Secure your data using Firestore Security Rules and App Check.
 * If Firestore rules are 'allow read, write: if true', the company is dead.
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID,
  measurementId: process.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// OMEGA: Zero-Trust Identity Verification State
console.info("🛡️ OMEGA: Project AEGIS (V2.0) Infrastructure initialized.");
