import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();
function AuthContextProvider(props) {
  const [loggedin, setLoggedin] = useState(undefined);

  async function getLoggedin(navigate) {
    const loggedinRes = await axios.get(
      "/api/user/loggedIn"
    );

    setLoggedin(loggedinRes.data);

    if (navigate) {
      navigate('/dashboard')
      console.log("transfer", loggedin, loggedinRes);
    }
  }

  useEffect(() => {
    getLoggedin();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedin, getLoggedin }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
