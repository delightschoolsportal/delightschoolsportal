import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { BRANCHES, ROLE_ROUTES } from "./branches";

const Ctx = createContext(null);
export const useAuth = () => useContext(Ctx);

function validate(p) {
  if (!p || p.accountStatus !== "active" || !ROLE_ROUTES[p.role]) return false;
  if (p.role === "director") return true;
  const b = BRANCHES[p.branchId];
  return !!b && b.section === p.section;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, async (u) => {
    setError("");
    if (!u) { setUser(null); setProfile(null); setLoading(false); return; }
    try {
      const snap = await getDoc(doc(db, "users", u.uid));
      const p = snap.exists() ? { uid: u.uid, ...snap.data() } : null;
      if (!validate(p)) {
        setError("Your account is not ready. Please contact the school office.");
        await signOut(auth); setUser(null); setProfile(null);
      } else { setUser(u); setProfile(p); }
    } catch {
      setError("Could not load your account. Check your connection and try again.");
      await signOut(auth);
    }
    setLoading(false);
  }), []);

  const login = (email, pw) => signInWithEmailAndPassword(auth, email, pw);
  const logout = () => signOut(auth);
  return <Ctx.Provider value={{ user, profile, error, loading, login, logout }}>{children}</Ctx.Provider>;
}
