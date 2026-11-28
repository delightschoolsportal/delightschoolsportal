import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyBaBFCIHt3hHICsI0UsCMCOnGV24n_Wzpo",
  authDomain: "delight-schools-portal.firebaseapp.com",
  projectId: "delight-schools-portal",
  storageBucket: "delight-schools-portal.firebasestorage.app",
  messagingSenderId: "514785167507",
  appId: "1:514785167507:web:df8109685b7f79f828e566"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Simple, forgiving connection for weak or filtered networks
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true
});
