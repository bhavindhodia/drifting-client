import { useEffect, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext } from "services/AuthContext";
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";

export type PrivateRouteProps = {
  isAuthenticated?: boolean;
} & RouteProps;

export default function PrivateRoute({
  component: Component,
  ...routeProps
}: PrivateRouteProps) {
  const { auth } = useContext(AuthContext);

  const { verifyUser } = useAuth();
  //const { verifyUser, authLoading } = useAuth();

  useEffect(() => {
    if (auth.token === undefined) {
      console.log("Verifying User");
      verifyUser();
    }
  }, [verifyUser, auth?.token]);

  return auth.token === null ? (
    <Redirect to="/login" />
  ) : auth.token ? (
    <Route component={Component} />
  ) : (
    <Center py={6} minH={"100vh"}>
      <Spinner />
    </Center>
  );
}
