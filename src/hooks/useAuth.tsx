import { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "services/AuthContext";
import api from "./api";
import { SignupFormInputs } from "atoms/SignupForm";
import { LoginFormInputs } from "atoms/LoginForm";
export default function useAuth() {
  let history = useHistory();
  //const { setUser } = useContext(UserContext);
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

  //set user in context and push them home
  const setUserContext = async () => {
    const meURL = "/auth/me";
    try {
      const response = await axios.get(meURL, { withCredentials: true });
      console.log("resp", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAuthError(error.response?.data.message);
      }
    }
  };
  //register user
  const registerUser = async (data: SignupFormInputs) => {
    const { name, username, email, password } = data;
    return axios
      .post(`auth/register`, {
        name,
        username,
        email,
        password,
      })
      .catch((err) => {
        setAuthError(err.response.data);
      });
  };
  const getUserData = async () => {
    const meURL = "/auth/me";
    try {
      const response = await axios.get(meURL, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAuthError(error.response?.data.message);
      }
    }
  };

  //login user
  const loginUser = async (data: LoginFormInputs) => {
    const loginURL = "/auth/login/";
    const { email, password } = data;
    setAuthLoading(true);
    try {
      const res = await axios.post(loginURL, {
        username: email,
        password: password,
      });

      setAuth({ ...res.data });
      console.log(
        "redirectPath",
        res.data.role.toLowerCase().concat("Dashboard")
      );
      if (res.data.success) {
        const redirectPath = res.data.role.toLowerCase().concat("Dashboard");
        history.replace(`/${redirectPath}`);
      }
      //await getUserData();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        error.response?.status === 400
          ? setAuthError("Please fill all the fields correctly!")
          : setAuthError("Invalid email and password combination.");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const verifyUser = useCallback(async () => {
    console.log("Verifying User");
    setAuthLoading(true);
    const refreshTokenURL = "auth/refreshToken";
    try {
      const response = await axios.post(refreshTokenURL);
      if (response.status === 200) {
        const redirectPath = response.data.role
          .toLocalLowerCase()
          .concat("Dashboard");
        setAuth((oldValue) => {
          return {
            ...oldValue,
            success: true,
            token: response.data.token,
            redirectPath,
          };
        });
        setTimeout(verifyUser, 10 * 60 * 1000);
        return true;
      } else {
        history.replace("/login");
        setAuth((oldValue) => {
          return { ...oldValue, token: null };
        });
        return false;
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("errrr", error.response?.data);
        history.replace("/login");
        setAuth((oldValue) => {
          return { ...oldValue, token: null };
        });
        return false;
      }
    } finally {
      setAuthLoading(false);
    }
  }, [setAuth]);

  const logoutUser = async () => {
    const logoutURL = "auth/logout";
    const response = await axios.get(logoutURL, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });

    try {
      if (response.status === 200) {
        setAuth((oldValues) => {
          return { ...oldValues, userData: null, token: null };
        });
        window.localStorage.setItem("logout", JSON.stringify(Date.now()));
        history.replace("/login");
      }
    } catch (error) {
      console.log("err", error);
    }
  };

  return {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser,
    authError,
    getUserData,
    authLoading,
  };
}
