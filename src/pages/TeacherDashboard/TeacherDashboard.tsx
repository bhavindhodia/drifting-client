import { useContext, useEffect } from "react";
import Sidebar from "./SideBar";
import BasicStatistics from "./Stats";
import Profile from "./Profile";
import Payments from "./Payments";
import TeacherAppointments from "./TeacherAppointments";
import Feedback from "./Feedback";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContext } from "services/AuthContext";
import axios from "axios";
import { useAuth } from "hooks";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const TeacherDashboard = () => {
  const { auth } = useContext(AuthContext);

  if (auth.token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  }

  const { fetchUserDetails } = useAuth();

  useEffect(() => {
    if (auth.userData === undefined) {
      console.log("Getting Teachers data");
      fetchUserDetails();
    }
  }, [auth.userData, fetchUserDetails]);

  return auth.userData === null ? (
    <Redirect to={auth.redirectPath} />
  ) : (
    <Router forceRefresh={true}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
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
      </QueryClientProvider>
    </Router>
  );
};

export default TeacherDashboard;
