import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database"; // 1. Import the database module

const firebaseConfig = {
 apiKey: "AIzaSyAAE9Cxq2MRnz1ZputwwZrdz0D5clfEsqM",
  authDomain: "bnosa-staging.firebaseapp.com",
  databaseURL: "https://bnosa-staging-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bnosa-staging",
  storageBucket: "bnosa-staging.firebasestorage.app",
  messagingSenderId: "995319280314",
  appId: "1:995319280314:web:bf42d938ee56cf26ee4883",
  measurementId: "G-PYKE9FSFGD"
    // Note: If your database is NOT in the us-central1 region, 
    // you might need to add: databaseURL: "https://your-db-name.firebaseio.com"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const database = getDatabase(app); // 2. Export the database instance