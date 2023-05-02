import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext({
  auth: null,
  user: null,
  setAuth: () => {},
});

export function useAuth() {
  return React.useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [user, setUser] = useState(null);

  const isAuth = () => {
    let auth_data = JSON.parse(localStorage.getItem("auth_token"));

    if (auth_data) {
      setUser(auth_data);
      setAuth(true);
    } else {
      setUser(null);
      setAuth(false);
    }
  };

  useEffect(() => {
    isAuth();
  }, [auth]);

  let value = { auth, user, setAuth };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
