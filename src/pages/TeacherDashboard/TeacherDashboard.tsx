import { Sidebar } from "atoms";
import { useIsAuthenticated } from "hooks";
import BasicStatistics from "./Stats";
import Profile from "./Profile";
import Payments from "./Payments";
import TeacherAppointments from "./TeacherAppointments";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const TeacherDashboard = () => {
  const { isLoading, data } = useIsAuthenticated();
  // const history = useHistory();
  const myRole = data?.role ? data.role.toString() : "";

  return myRole !== "TEACHER" ? (
    <Redirect to={`/${myRole.toLowerCase().concat("Dashboard")}`} />
  ) : (
    <Router forceRefresh={true}>
      <Sidebar>
        <Switch>
          <Route exact path="/teacherDashboard" component={BasicStatistics} />
          {/*   <Redirect to="/home" /> */}
          <Route exact path="/home" render={() => <Redirect to="/home" />} />
          <Route
            path="/teacherDashboard/appointment"
            component={TeacherAppointments}
          />
          <Route path="/teacherDashboard/profile" component={Profile} />
          <Route path="/teacherDashboard/payments" component={Payments} />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default TeacherDashboard;
