import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ROLE_ROUTES, BRANCHES } from "./branches";
import Login from "./pages/Login";
import * as D from "./pages/Dashboards";

const ROUTES = [
  ["/director", ["director"], D.Director], ["/headteacher", ["headteacher"], D.Headteacher],
  ["/principal", ["principal"], D.Principal], ["/admissions", ["admission_officer"], D.Admissions],
  ["/cashier", ["cashier"], D.Cashier], ["/class-teacher", ["primary_class_teacher"], D.ClassTeacher],
  ["/subject-teacher", ["secondary_subject_teacher"], D.SubjectTeacher],
  ["/form-master", ["secondary_form_master"], D.FormMaster], ["/student", ["student","parent"], D.Student]
];

// Role check is UX only; Firestore rules are the real enforcement.
function Guard({ roles, children }) {
  const { profile } = useAuth();
  return roles.includes(profile.role) ? children : <Navigate to={ROLE_ROUTES[profile.role]} replace />;
}

export default function App() {
  const { profile, loading } = useAuth();
  if (loading) return <p style={{padding:24}}>Loading…</p>;
  const theme = !profile ? "primary" : profile.role === "director" ? "director" : BRANCHES[profile.branchId].section;
  return (
    <div data-theme={theme}>
      <HashRouter>
        <Routes>
          <Route path="/login" element={profile ? <Navigate to={ROLE_ROUTES[profile.role]} replace /> : <Login />} />
          {ROUTES.map(([p, roles, C]) => (
            <Route key={p} path={p} element={profile ? <Guard roles={roles}><C /></Guard> : <Navigate to="/login" replace />} />
          ))}
          <Route path="*" element={<Navigate to={profile ? ROLE_ROUTES[profile.role] : "/login"} replace />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
