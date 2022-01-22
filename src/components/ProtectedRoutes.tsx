import { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import routes from "routes"; // Route list
import { Spinner } from "@chakra-ui/spinner";
import { Center } from "@chakra-ui/layout";
import { useIsAuthenticated } from "hooks";
const ProtectedRoutes = () => {
  const { data: isAuthenticated = false } = useIsAuthenticated();
  console.log("isAuthenticated", isAuthenticated);

  return (
    <Switch>
      <Suspense
        fallback={
          <Center>
            <Spinner />
          </Center>
        }
      >
        {routes.map(({ component: Component, path, exact }) => (
          <Route path={`/${path}`} key={path} exact={exact}>
            <Component />
          </Route>
        ))}
      </Suspense>
    </Switch>
  );
};

export default ProtectedRoutes;
