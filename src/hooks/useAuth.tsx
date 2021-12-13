import { useState, useContext, useCallback } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "services/AuthContext";
import { SignupFormInputs } from "atoms/SignupForm";
import { LoginFormInputs } from "atoms/LoginForm";
export default function useAuth() {
  let history = useHistory();

  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const { auth, setAuth } = useContext(AuthContext);

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
    const refreshTokenURL = "auth/refreshToken";

    try {
      const response = await axios.post(refreshTokenURL);
      if (response.status === 200) {
        const redirectPath = response.data.role
          .toLowerCase()
          .concat("Dashboard");
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
      setTimeout(verifyUser, 10 * 60 * 1000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setAuthError("Something went wrong. Please try again");
      }
    }
  }, [setAuth]);

  const fetchUserDetails = useCallback(async () => {
    const userDataUrl = "/auth/me";
    try {
      const response = await axios.get(userDataUrl, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });

      response.status === 200
        ? setAuth((oldValues) => {
            return { ...oldValues, userData: response.data?.user };
          })
        : setAuth((oldValues) => {
            return { ...oldValues, userData: null };
          });
    } catch (error) {
      setAuthError("Something went wrong. Please try again");
    }
  }, [setAuth, auth.token]);

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
    fetchUserDetails,
  };
}
