import { useContext, useEffect } from "react";
import StudentAppointment from "./StudentAppointments";
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
import { QueryClient, QueryClientProvider } from "react-query";
import axios from "axios";
import PaymentResult from "./PaymentResult";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
const StudentDashboard = () => {
  const { auth } = useContext(AuthContext);

  if (auth.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }

  const { fetchUserDetails } = useAuth();

  useEffect(() => {
    // fetch only when user details are not present
    if (auth.userData === undefined) {
      console.log("Getting Students data");
      fetchUserDetails();
    }
  }, [auth.userData, fetchUserDetails]);

  return auth.userData === null ? (
    <Redirect to={auth.redirectPath} />
  ) : (
    <Router>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </Router>
  );
};

export default StudentDashboard;
