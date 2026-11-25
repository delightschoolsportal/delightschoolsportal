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

// Defaults; will move to academic config so they can be edited
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
