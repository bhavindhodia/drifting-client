import { useContext, useEffect } from "react";
import StudentAppointment from "./StudentAppointments";
import Profile from "./Profile";
import { Sidebar } from "atoms";
import Meeting from "./Meeting";
import Checkout from "./Checkout";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PaymentResult from "./PaymentResult";
import { useUserData, useIsAuthenticated } from "hooks";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Redirect } from "react-router-dom";
const StudentDashboard = () => {
  const { isLoading: userDataLoading, data: userData } = useUserData();
  const { isLoading, data } = useIsAuthenticated();
  // const history = useHistory();
  const myRole = data?.role ? data.role.toString() : "";
  return myRole !== "STUDENT" ? (
    <Redirect to={"/teacherDashboard"} />
  ) : (
    <Router>
      <Sidebar>
        <Switch>
          <Route
            exact
            path="/studentDashboard"
            component={StudentAppointment}
          />
          <Route path="/studentDashboard/profile" component={Profile} />
          <Route path="/studentDashboard/meeting" component={Meeting} />
          <Route path="/studentDashboard/checkout" component={Checkout} />
          <Route
            path="/studentDashboard/payment-status"
            component={PaymentResult}
          />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default StudentDashboard;
