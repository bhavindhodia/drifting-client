import React, { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useIsAuthenticated, useUserData } from "hooks";
import { Center } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { axiosClient } from "services";

export type PrivateRouteProps = {
  isAuthenticated: boolean;
  redirectPath?: string;
} & RouteProps;

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,

  isAuthenticated,
  ...rest
}) => {
  const { isLoading, data, status } = useIsAuthenticated();
  /* console.log("PrivateRoute", data); */

  //  let isTokenAvaliable = false;
  if (data?.token !== undefined) {
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
    ///  isTokenAvaliable = true;
    //console.log("isTokenAvaliable data", data, status);
  }

  const isAuth = data?.token !== undefined || data?.success ? true : false;

  return isLoading ? (
    <Center h={"100vh"}>
      <Spinner />
    </Center>
  ) : (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location, message: data?.errorMessage },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
