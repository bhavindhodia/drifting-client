import { Heading } from "@chakra-ui/layout";
import React from "react";
import Sidebar from "./SideBar";
import BasicStatistics from "./Stats";
import Profile from "./Profile";
import Feedback from "./Feedback";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const TeacherDashboard = () => {
  return (
    <Router>
      <Sidebar>
        <Switch>
          <Route exact path="/t" component={BasicStatistics} />
          <Route exact path="/t/appointment" component={BasicStatistics} />
          <Route exact path="/t/profile" component={Profile} />
          <Route exact path="/t/feedback" component={Feedback} />
        </Switch>
      </Sidebar>
    </Router>
  );
};

export default TeacherDashboard;
