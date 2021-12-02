import React, {
  useState,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  useCallback,
} from "react";
import axios from "axios";
enum UserRole {
  STUDENT,
  TEACHER,
}
export type UserDataType = {
  authStrategy: string;
  email: string;
  id: string;
  isEmailVerified: boolean;
  name: string;
  refreshToken: [{ refreshToken: string }];
  role: UserRole;
  username: string;
};

export type AuthContextType = {
  success: boolean;
  token?: string | null;
  userData?: UserDataType | null;
  role?: UserRole;
  redirectPath: string;
};

//type AppContextState = { success: boolean; token: string };

export type AuthContextValue = {
  auth: AuthContextType;
  // type, you get when hovering over `setState` from `useState`
  setAuth: Dispatch<SetStateAction<AuthContextType>>;
};

const appCtxDefaultValue: AuthContextValue = {
  auth: {
    success: false,
    // token: "",
    redirectPath: "/login",
    /*   userData: {
      authStrategy: "",
      email: "",
      id: "",
      isEmailVerified: false,
      name: "",
      refreshToken: [{ refreshToken: "" }],
      role: UserRole.STUDENT,
      username: "",
    }, */
  },
  setAuth: (auth) => {},
};

const AuthContext = React.createContext(appCtxDefaultValue);
const AuthProvider: FC = (props) => {
  const [auth, setAuth] = useState(appCtxDefaultValue.auth);

  const verifyUser = useCallback(() => {
    //setLoading(true);
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
        // setLoading(false);
      });
  }, [setAuth]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
