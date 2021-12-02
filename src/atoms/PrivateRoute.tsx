import { useEffect, useCallback, useContext, useState } from "react";
import { Redirect, Route, RouteProps, useHistory } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext } from "services/AuthContext";
import { Spinner } from "@chakra-ui/spinner";
import axios from "axios";

export type ProtectedRouteProps = {
  isAuthenticated?: boolean;
} & RouteProps;

export default function ProtectedRoute({
  isAuthenticated = false,
  ...routeProps
}: ProtectedRouteProps) {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  //const { verifyUser, authLoading } = useAuth();

  const verifyUser = useCallback(() => {
    setLoading(true);
    const refreshTokenURL = "auth/refreshToken";
    axios
      .post(refreshTokenURL)
      .then(async (response) => {
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [setAuth]);

  /*  useEffect(() => {
    verifyUser();
  }, [verifyUser]); */
  console.log("AUTH", auth);
  console.log("Loading", loading);
  /* return (
    <>
      <Route {...routeProps} /> 
   
    </>
  ); */

  return auth.token === null || !auth.token ? (
    <Redirect to="/login" />
  ) : auth.token ? (
    <Route {...routeProps} />
  ) : (
    <Spinner />
  );
}
