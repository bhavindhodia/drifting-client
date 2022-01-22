import { lazy } from "react";

const routes = [
  {
    path: "studentDashboard",
    component: lazy(() => import("pages/StudentDashboard/StudentDashboard")),
    exact: true,
  },
  {
    path: "teacherDashboard",
    component: lazy(() => import("pages/TeacherDashboard/TeacherDashboard")),
    exact: true,
  },
];

export default routes;
