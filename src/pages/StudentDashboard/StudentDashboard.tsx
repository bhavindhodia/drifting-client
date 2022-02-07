import StudentAppointment from "./StudentAppointments";
import { Profile } from "components";
import { Sidebar } from "atoms";
import Meeting from "./Meeting";
import Checkout from "./Checkout";
import { Route } from "react-router-dom";
import PaymentResult2 from "./PaymentResult";
import { useUserData, useIsAuthenticated } from "hooks";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Redirect } from "react-router-dom";

import Payments from "pages/TeacherDashboard/Payments";
const StudentDashboard = () => {
  const { isLoading: userDataLoading } = useUserData();
  const { isLoading, data } = useIsAuthenticated();
  const myRole = data?.role ? data.role.toString() : "";
  if (isLoading || userDataLoading)
    <Center>
      <Spinner />
    </Center>;
  return myRole !== "STUDENT" ? (
    <Redirect to={"/teacherDashboard"} />
  ) : (
    <Route
      path="/studentDashboard"
      render={({ match: { url } }) => (
        <Sidebar>
          <Route path={`${url}/`} component={StudentAppointment} exact />
          <Route path={`${url}/profile`} component={Profile} />
          <Route path={`${url}/meeting`} component={Meeting} />
          <Route path={`${url}/checkout`} component={Checkout} />
          <Route path={`${url}/payments`} component={Payments} />
          <Route path={`${url}/payment-status`} component={PaymentResult2} />
        </Sidebar>
      )}
    />
  );
};

export default StudentDashboard;
