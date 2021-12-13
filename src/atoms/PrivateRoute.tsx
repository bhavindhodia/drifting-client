import { useEffect, useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext } from "services/AuthContext";
import { Spinner } from "@chakra-ui/spinner";

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

  /* const verifyUser = useCallback(async () => {
    const refreshTokenURL = "auth/refreshToken";
    axios.post(refreshTokenURL).then(async (response) => {
      console.log("responseStatus", response);
      if (response.status === 200) {
        const redirectPath = "/studentDashboard";
        setAuth((oldValues) => {
          return {
            ...oldValues,
            success: true,
            token: response.data.token,
            redirectPath,
          };
        });
      } else {
        setAuth((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setAuth]); */

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
    <Spinner />
  );
}
