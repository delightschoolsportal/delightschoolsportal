export const BRANCHES = {
  PRI_MAIN: { name: "Delight Academy Main Branch", section: "primary", label: "Main" },
  PRI_NAS:  { name: "Delight Academy Nasarawa Branch", section: "primary", label: "Nasarawa" },
  PRI_BAK:  { name: "Delight Academy Bakori Branch", section: "primary", label: "Bakori" },
  PRI_SAB:  { name: "Delight Academy Sabon Layi Branch", section: "primary", label: "Sabon Layi" },
  SEC_MAIN: { name: "Delight Secondary Main Branch", section: "secondary", label: "Main" },
  SEC_NAS:  { name: "Delight Secondary Nasarawa Branch", section: "secondary", label: "Nasarawa" },
  SEC_BAK:  { name: "Delight Secondary Bakori Branch", section: "secondary", label: "Bakori" }
};

export const ROLE_ROUTES = {
  director: "/director", headteacher: "/headteacher", principal: "/principal",
  admission_officer: "/admissions", cashier: "/cashier",
  primary_class_teacher: "/class-teacher", secondary_subject_teacher: "/subject-teacher",
  secondary_form_master: "/form-master", student: "/student", parent: "/student"
};

export const ROLE_TITLES = {
  director: "Director", headteacher: "Headteacher", principal: "Principal",
  admission_officer: "Admission Officer", cashier: "Cashier",
  primary_class_teacher: "Class Teacher", secondary_subject_teacher: "Subject Teacher",
  secondary_form_master: "Form Master", student: "Student", parent: "Parent"
};

// Score parts and their highest marks (can be changed later)
export const SCORE_COMPONENTS = [
  { key: "ca1", label: "1st CA", max: 10 },
  { key: "assign1", label: "1st Assignment", max: 5 },
  { key: "ca2", label: "2nd CA", max: 10 },
  { key: "assign2", label: "2nd Assignment", max: 5 },
  { key: "exam", label: "Exam", max: 70 }
];

export const GRADES = [
  { min: 70, grade: "A", remark: "Excellent" },
  { min: 60, grade: "B", remark: "Very Good" },
  { min: 50, grade: "C", remark: "Good" },
  { min: 45, grade: "D", remark: "Pass" },
  { min: 40, grade: "E", remark: "Fair" },
  { min: 0,  grade: "F", remark: "Fail" }
];

// Arms for each group of classes. Add or remove arms here. Format: [code, name]
export const ARMS = {
  primary: [["A","A"],["B","B"],["C","C"]],
  jss: [["A","A"],["B","B"],["C","C"]],
  ss: [["HUM","Humanities"],["SCI","Sciences"]]
};

// Classes in each section. Format: [code, name, which arms it uses]
export const LEVELS = {
  primary: [["CRE","Creche","primary"],["NU1","Nursery 1","primary"],["NU2","Nursery 2","primary"],["P1","Primary 1","primary"],["P2","Primary 2","primary"],["P3","Primary 3","primary"],["P4","Primary 4","primary"],["P5","Primary 5","primary"],["P6","Primary 6","primary"]],
  secondary: [["JSS1","JSS 1","jss"],["JSS2","JSS 2","jss"],["JSS3","JSS 3","jss"],["SS1","SS 1","ss"],["SS2","SS 2","ss"],["SS3","SS 3","ss"]]
};

// Full list of classes for a section, for example ["P4A", "Primary 4 A"]
export function classOptions(section) {
  return LEVELS[section].flatMap(([code, name, group]) =>
    ARMS[group].map(([armCode, armName]) => [code + armCode, name + " " + armName]));
}

// Staff roles the Director can create, and where each can work
export const STAFF_ROLES = {
  headteacher: "primary", principal: "secondary", admission_officer: "both", cashier: "both",
  primary_class_teacher: "primary", secondary_subject_teacher: "secondary", secondary_form_master: "secondary"
};

// Makes numbers like DA/MAIN/PRI/2026/001
export function admissionNo(branchId, year, n) {
  const [pre, code] = branchId.split("_");
  return `${pre === "PRI" ? "DA" : "DS"}/${code}/${pre}/${year}/${String(n).padStart(3, "0")}`;
}
