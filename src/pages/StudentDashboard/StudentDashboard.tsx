import { useContext, useEffect } from "react";
import Calender from "./Calender";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import Meeting from "./Meeting";
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
} from "react-router-dom";
import { AuthContext } from "services/AuthContext";
import { useAuth } from "hooks";

const StudentDashboard = () => {
  const { auth } = useContext(AuthContext);
  const { fetchUserDetails } = useAuth();
  /* const fetchUserDetails = useCallback(async () => {
    axios
      .get("/auth/me", { headers: { Authorization: `Bearer ${auth.token}` } })
      .then(async (response) => {
        if (response.status === 200) {
          console.log("userData", response.data);

          setAuth((oldValues) => {
            return { ...oldValues, userData: response.data?.user };
          });
        } else {
          if (response.status === 401) {
            window.location.reload();
            return;
            //history.replace(auth.redirectPath);
          } else {
            setAuth((oldValues) => {
              return { ...oldValues, userData: null };
            });
          }
        }
      });
  }, [setAuth, auth.token]); */

  console.log("auth", auth);
  console.log("isUserData", auth.userData === undefined);
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
        <Switch>
          <Route exact path="/studentDashboard" component={Calender} />
          <Route path="/studentDashboard/profile" component={Profile} />
          <Route path="/studentDashboard/meeting" component={Meeting} />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default StudentDashboard;
