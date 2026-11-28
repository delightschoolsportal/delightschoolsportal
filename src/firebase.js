import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

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

// Keeps recent data on the device so the portal still works on a weak connection.
// The long-connection setting helps on networks that block the normal connection.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
