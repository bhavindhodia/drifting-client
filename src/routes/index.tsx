import { lazy } from "react";

const routes = [
  {
    path: "studentDashboard",
    component: lazy(() => import("pages/StudentDashboard/StudentDashboard")),
    exact: false,
  },
  {
    path: "teacherDashboard",
    component: lazy(() => import("pages/TeacherDashboard/TeacherDashboard")),
    exact: false,
  },
];

export default routes;
