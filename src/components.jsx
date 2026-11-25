import { BRANCHES, ROLE_TITLES } from "./branches";
import { useAuth } from "./AuthContext";

export function BranchBadge({ branchId }) {
  const b = BRANCHES[branchId];
  if (!b) return <span className="badge"><b>ALL</b>All branches</span>;
  return <span className="badge"><b>{branchId}</b>{b.name}</span>;
}

export function Shell({ branchId, children }) {
  const { profile, logout } = useAuth();
  return (
    <>
      <header className="shell">
        <div><h1>Delight Schools Portal</h1><small>{ROLE_TITLES[profile.role]} · {profile.fullName}</small></div>
        <div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap"}}>
          {children}<button className="ghost" onClick={logout}>Sign out</button>
        </div>
      </header>
      <div className="wrap" style={{paddingBottom:0}}><BranchBadge branchId={branchId} /></div>
    </>
  );
}
