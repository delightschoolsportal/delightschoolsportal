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

// Online only: nothing is saved on the device
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true
});

// A second, separate login connection used only to create new staff logins,
// so the Director stays signed in while doing it
export const secondaryAuth = getAuth(initializeApp(firebaseConfig, "secondary"));
