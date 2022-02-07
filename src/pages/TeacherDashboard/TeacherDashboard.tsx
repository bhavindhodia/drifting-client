import { Sidebar } from "atoms";
import { useIsAuthenticated } from "hooks";
import BasicStatistics from "./Stats";
import { Profile } from "components/";
import Payments from "./Payments";
import TeacherAppointments from "./TeacherAppointments";

import { Route, Redirect } from "react-router-dom";
import Meeting from "pages/StudentDashboard/Meeting";

const TeacherDashboard = () => {
  const { data } = useIsAuthenticated();
  const myRole = data?.role ? data.role.toString() : "";

  return myRole !== "TEACHER" ? (
    <Redirect to={`/${myRole.toLowerCase().concat("Dashboard")}`} />
  ) : (
    <Route
      path="/teacherDashboard"
      render={({ match: { url } }) => (
        <Sidebar>
          <Route path={`${url}/`} component={BasicStatistics} exact />
          <Route path={`${url}/appointment`} component={TeacherAppointments} />
          <Route path={`${url}/profile`} component={Profile} />
          <Route path={`${url}/payments`} component={Payments} />
          <Route path={`${url}/meeting`} component={Meeting} />
        </Sidebar>
      )}
    />
  );
};
/* const TeacherDashboard = () => {
  const { data } = useIsAuthenticated();
  const myRole = data?.role ? data.role.toString() : "";

  return myRole !== "TEACHER" ? (
    <Redirect to={`/${myRole.toLowerCase().concat("Dashboard")}`} />
  ) : (
    <Router>
      <Sidebar>
        <Switch>
          <Route exact path="/teacherDashboard" component={BasicStatistics} />
          <Route exact path="/home" render={() => <Redirect to="/home" />} />
          <Route
            exact
            path="/teacherDashboard/appointment"
            component={TeacherAppointments}
          />
          <Route path="/teacherDashboard/profile" component={Profile} />
          <Route path="/teacherDashboard/payments" component={Payments} />
          <Route path="/teacherDashboard/meeting" component={TeacherMeeting} />
        </Switch>
      </Sidebar>
    </Router>
  );
}; */

export default TeacherDashboard;
