import { useState } from "react";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, setDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db, secondaryAuth } from "../firebase";
import { BRANCHES, STAFF_ROLES, ROLE_TITLES, classOptions } from "../branches";

const NEEDS_CLASS = ["primary_class_teacher", "secondary_form_master"];

export default function StaffManager() {
  const [f, setF] = useState({ fullName: "", email: "", password: "", role: "admission_officer", branchId: "PRI_MAIN", classCode: "" });
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const set = k => e => setF({ ...f, [k]: e.target.value });

  const section = BRANCHES[f.branchId].section;
  const allowedAt = STAFF_ROLES[f.role];
  const needsClass = NEEDS_CLASS.includes(f.role);

  async function submit(e) {
    e.preventDefault();
    setMsg("");
    if (allowedAt !== "both" && allowedAt !== section) {
      return setMsg(ROLE_TITLES[f.role] + " can only be placed at a " + allowedAt + " branch.");
    }
    if (needsClass && !f.classCode) return setMsg("Please choose the class.");
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(secondaryAuth, f.email.trim(), f.password);
      await signOut(secondaryAuth);
      await setDoc(doc(db, "users", cred.user.uid), {
        fullName: f.fullName.trim(),
        role: f.role,
        section: section,
        branchId: f.branchId,
        formClassId: needsClass ? f.branchId + "_" + f.classCode : null,
        subjectAssignments: null,
        accountStatus: "active",
        createdBy: auth.currentUser.uid,
        createdAt: serverTimestamp()
      });
      await addDoc(collection(db, "auditLogs"), {
        actorUid: auth.currentUser.uid, actorRole: "director", branchId: f.branchId, section: section,
        action: "staff_created", targetType: "user", targetId: cred.user.uid, reason: f.role, timestamp: serverTimestamp()
      });
      setMsg("Created " + f.fullName + " (" + ROLE_TITLES[f.role] + ").");
      setF({ ...f, fullName: "", email: "", password: "", classCode: "" });
    } catch (err) {
      setMsg("Could not create the account (" + (err.code || err.message) + ").");
    }
    setBusy(false);
  }

  return (
    <form className="card" onSubmit={submit}>
      <h2>Create staff account</h2>
      <div className="field"><label>Full name</label>
        <input required value={f.fullName} onChange={set("fullName")} /></div>
      <div className="field"><label>Email</label>
        <input type="email" required value={f.email} onChange={set("email")} /></div>
      <div className="field"><label>Temporary password (at least 6 characters)</label>
        <input required minLength={6} value={f.password} onChange={set("password")} /></div>
      <div className="field"><label>Role</label>
        <select value={f.role} onChange={set("role")}>
          {Object.keys(STAFF_ROLES).map(r => <option key={r} value={r}>{ROLE_TITLES[r]}</option>)}
        </select></div>
      <div className="field"><label>Branch</label>
        <select value={f.branchId} onChange={e => setF({ ...f, branchId: e.target.value, classCode: "" })}>
          {Object.entries(BRANCHES).map(([id, b]) => <option key={id} value={id}>{b.name}</option>)}
        </select></div>
      {needsClass && (
        <div className="field"><label>Class</label>
          <select value={f.classCode} onChange={set("classCode")}>
            <option value="">Choose a class</option>
            {classOptions(section).map(([code, name]) => <option key={code} value={code}>{name}</option>)}
          </select></div>
      )}
      <button disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      {msg && <p role="status">{msg}</p>}
    </form>
  );
}
