import React, { useState, FC, Dispatch, SetStateAction } from "react";
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

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
