import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Spinner } from "@chakra-ui/spinner";
import ProtectedRoutes from "components/ProtectedRoutes"; //Authenticated routes
import PublicRoute from "components/PublicRoute";
import PrivateRoute from "components/PrivateRoute";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./styles/theme";
import "@fontsource/poppins/400.css";
import "@fontsource/lato/700.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Homepage } from "pages";

const LoginPage = lazy(() => import("pages/Login"));
const Signup = lazy(() => import("pages/Signup"));
//const ForgotPassword = lazy(() => import("pages/ForgotPassword"));
//const NoFoundComponent = lazy(() => import("pages/NoFoundComponent"));

const App2 = () => {
  //const isAuthenticated = getToken();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const isAuthenticated = false;
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <Router>
        <ChakraProvider theme={theme}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              <Route path="/" exact component={Homepage} />

              <Route path="/home" exact component={Homepage} />

              <PublicRoute path="/login" isAuthenticated={isAuthenticated}>
                <LoginPage />
              </PublicRoute>
              <PublicRoute path="/register" isAuthenticated={isAuthenticated}>
                <Signup />
              </PublicRoute>
              {/* <PublicRoute
            path="/forgot-password"
            isAuthenticated={isAuthenticated}
          >
            <ForgotPassword /> 
            
          </PublicRoute>
            */}
              <PrivateRoute path="/" isAuthenticated={isAuthenticated}>
                <ProtectedRoutes />
              </PrivateRoute>
              {/* <Route path="*">
            <NoFoundComponent />
          </Route> */}
            </Switch>
          </Suspense>
        </ChakraProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App2;
