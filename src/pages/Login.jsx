import { useState } from "react";
import { useAuth } from "../AuthContext";
export default function Login() {
  const { login, error } = useAuth();
  const [email, setEmail] = useState(""); const [pw, setPw] = useState("");
  const [msg, setMsg] = useState(""); const [busy, setBusy] = useState(false);
  async function submit(e) {
    e.preventDefault(); setBusy(true); setMsg("");
    try { await login(email.trim(), pw); }
    catch { setMsg("Email or password is incorrect."); }
    setBusy(false);
  }
  return (
    <div className="login card">
      <h1>Delight Schools Portal</h1>
      <p style={{color:"var(--muted)"}}>Centre for Academic Excellence</p>
      <form onSubmit={submit}>
        <div className="field"><label htmlFor="e">Email</label><input id="e" type="email" required value={email} onChange={e=>setEmail(e.target.value)} /></div>
        <div className="field"><label htmlFor="p">Password</label><input id="p" type="password" required value={pw} onChange={e=>setPw(e.target.value)} /></div>
        <button disabled={busy} style={{width:"100%"}}>{busy ? "Signing in…" : "Sign in"}</button>
        {(msg || error) && <p className="err" role="alert">{msg || error}</p>}
      </form>
    </div>
  );
}
