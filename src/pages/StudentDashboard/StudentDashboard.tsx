import { useContext, useCallback, useEffect } from "react";
import Calender from "./Calender";
import Profile from "./Profile";
import Sidebar from "./Sidebar";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
} from "react-router-dom";
import { AuthContext } from "services/AuthContext";
import axios from "axios";
import { Spinner } from "@chakra-ui/spinner";

const StudentDashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const history = useHistory();
  const fetchUserDetails = useCallback(() => {
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
            //window.location.reload();
            history.replace(auth.redirectPath);
          } else {
            setAuth((oldValues) => {
              return { ...oldValues, userData: null };
            });
          }
        }
      });
  }, [setAuth, auth.token]);

  useEffect(() => {
    console.log("auth.userData", auth.userData);
    // fetch only when user details are not present
    if (!auth.userData) {
      fetchUserDetails();
    }
  }, [auth.userData, fetchUserDetails]);

  return auth.userData === null ? (
    <h2> "Error Loading User"</h2>
  ) : !auth.userData ? (
    <Spinner />
  ) : (
    <Router>
      <Sidebar>
        <Switch>
          <Route exact path="/studentDashboard" component={Calender} />
          <Route path="/studentDashboard/profile" component={Profile} />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default StudentDashboard;
