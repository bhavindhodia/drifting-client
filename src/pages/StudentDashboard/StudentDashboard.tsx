import { useContext, useEffect } from "react";
import Calender from "./Calender";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Meeting from "./Meeting";
import Checkout from "./Checkout";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { AuthContext } from "services/AuthContext";
import { useAuth } from "hooks";
import { AppProvider } from "hooks/appointmentContext";
import axios from "axios";
import PaymentResult from "./PaymentResult";

const StudentDashboard = () => {
  const { auth } = useContext(AuthContext);

  if (auth.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }

  const { fetchUserDetails } = useAuth();

  /*  console.log("auth", auth);
  console.log("isUserDataAvaliable", auth.userData !== undefined); */
  useEffect(() => {
    // fetch only when user details are not present
    if (auth.userData === undefined) {
      console.log("Getting user data");
      fetchUserDetails();
    }
  }, [auth.userData, fetchUserDetails]);

  return auth.userData === null ? (
    <Redirect to={auth.redirectPath} />
  ) : (
    <Router>
      <Sidebar>
        <AppProvider>
          <Switch>
            <Route exact path="/studentDashboard" component={Calender} />
            <Route path="/studentDashboard/profile" component={Profile} />
            <Route path="/studentDashboard/meeting" component={Meeting} />
            <Route path="/studentDashboard/checkout" component={Checkout} />
            <Route
              path="/studentDashboard/payment-status"
              component={PaymentResult}
            />
          </Switch>
        </AppProvider>
      </Sidebar>
    </Router>
  );
};

export default StudentDashboard;
