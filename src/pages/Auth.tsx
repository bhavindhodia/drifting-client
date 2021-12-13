import React from "react";
import { useEffect, useCallback, useContext } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "hooks";
import { AuthContext } from "services/AuthContext";

import { Spinner } from "@chakra-ui/spinner";
import { StudentDashboard } from "pages";
const Auth = () => {
  const { auth } = useContext(AuthContext);
  const { verifyUser } = useAuth();
  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return !auth.success ? (
    <Redirect to={{ pathname: "/login" }} />
  ) : auth.token ? (
    <StudentDashboard />
  ) : (
    <Spinner />
  );
};

export default Auth;
