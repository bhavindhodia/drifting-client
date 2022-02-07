import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { useIsAuthenticated } from "hooks";
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
  const { isLoading, data } = useIsAuthenticated();

  if (data?.token !== undefined) {
    axiosClient.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${data.token}`;
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
