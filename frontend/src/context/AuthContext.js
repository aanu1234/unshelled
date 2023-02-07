import axios from "axios";
import { HOST_API_KEY } from "../config";
import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  isInitialized: false,
  isAuthenticated: false,
  currentUser: JSON.parse(localStorage.getItem("user")) || null,
  token: JSON.parse(localStorage.getItem("token")) || null,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
    localStorage.setItem("token", JSON.stringify(state.token));
  }, [state.currentUser, state.token]);

  // LOGIN
  const login = async (formdata) => {
    const { username, password } = formdata;
    const encodedBase64User = btoa(`${username}:${password}`);

    const url = {
      method: "post",
      url: `${HOST_API_KEY}/account`,
      headers: {
        Authorization: `Basic ${encodedBase64User}`,
        "Content-Type": "application/json",
      },
      data: formdata,
    };
    const { data } = await axios(url);
    // check for error
    if (data?.error) {
      throw new Error(data.error);
    }

    const { user, token } = data;
    // setSession(token);
    dispatch({
      type: "LOGIN",
      payload: {
        token,
        user,
      },
    });
  };

  // LOGOUT
  const logout = async () => {
    // setSession(null);
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
      // value={{ currentUser: state.currentUser, dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
