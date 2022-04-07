import React, { useCallback, useState, useEffect } from "react";
import { AuthContext } from "./authContext";
import { attemptLogout } from "../api/login";

let logoutTimer;

const AuthProvider = (props) => {
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("user")) || false
  );
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("user"))?.userData || false
  );
  const [tokenExpirationDate, setTokenExpirationDate] = useState(null);

  const login = useCallback((user, token, expirationDate) => {
    setToken(token);
    setUserData(user);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 12);
    setTokenExpirationDate(tokenExpirationDate);

    localStorage.setItem(
      "user",
      JSON.stringify({
        userData: user,
        token,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserData(null);
    setTokenExpirationDate(null);
    attemptLogout();
    localStorage.removeItem("user");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationDate) {
      const remainingTime =
        tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationDate]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("user"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      login(
        storedData.userData,
        storedData.token,
        new Date(storedData.expiration)
      );
    }
  }, [login]);

  const authContextValue = {
    isLoggedIn: !!token,
    token,
    userData,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={authContextValue}
      {...props}
    ></AuthContext.Provider>
  );
};

export default AuthProvider;
