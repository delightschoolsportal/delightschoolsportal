import { useState } from "react";
import { useAuth } from "../AuthContext";
import { Shell } from "../components";
import { BRANCHES } from "../branches";

function Placeholder({ title, note }) {
  const { profile } = useAuth();
  return (
    <>
      <Shell branchId={profile.branchId} />
      <main className="wrap"><div className="card"><h2>{title}</h2><p>{note}</p></div></main>
    </>
  );
}
export const Headteacher = () => <Placeholder title="Headteacher dashboard" note="Result approval and branch overview arrive in Milestone 4." />;
export const Principal = () => <Placeholder title="Principal dashboard" note="Result approval and branch overview arrive in Milestone 4." />;
export const Admissions = () => <Placeholder title="Admissions" note="Student registration arrives in Milestone 2." />;
export const Cashier = () => <Placeholder title="Cashier" note="Fees and receipts arrive in Milestone 3." />;
export const ClassTeacher = () => <Placeholder title="Class teacher" note="Score entry arrives in Milestone 4." />;
export const SubjectTeacher = () => <Placeholder title="Subject teacher" note="Score entry arrives in Milestone 4." />;
export const FormMaster = () => <Placeholder title="Form master" note="Attendance and remarks arrive in Milestone 4." />;
export const Student = () => <Placeholder title="Student / Parent" note="Fees, receipts and report cards arrive in Milestones 3 and 4." />;

export function Director() {
  const [scope, setScope] = useState("all");
  const section = BRANCHES[scope] ? BRANCHES[scope].section : scope;
  const theme = section === "all" ? "director" : section;
  return (
    <div data-theme={theme}>
      <Shell branchId={BRANCHES[scope] ? scope : "all"}>
        <label htmlFor="sw" style={{fontSize:".8rem"}}>View</label>
        <select id="sw" value={scope} onChange={e=>setScope(e.target.value)}>
          <option value="all">Whole school</option>
          <option value="primary">All Primary</option>
          <option value="secondary">All Secondary</option>
          {Object.entries(BRANCHES).map(([id,b]) => <option key={id} value={id}>{id} · {b.name}</option>)}
        </select>
      </Shell>
      <main className="wrap"><div className="card"><h2>Director overview</h2><p>Revenue, debtors and audit logs arrive in later milestones.</p></div></main>
    </div>
  );
}
