import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);

  const whoami = async () => {
    let result = await fetch(`/api/v1/auth`);
    console.log(result);
    if (result.status === 200) {
      setUser(await result.json());
    } else {
      console.warn(`Not authenticated`);
    }
  };

  const login = async (email, password) => {};

  const logout = async (email, password) => {};

  useEffect(() => {
    whoami();
  }, []);

  const values = {
    user,
    whoami,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
