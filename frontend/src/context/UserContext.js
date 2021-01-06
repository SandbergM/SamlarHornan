import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(false);

  const whoami = async () => {
    let result = await fetch(`/api/v1/auth`);
    if (result.status === 200) {
      setUser(await result.json());
    } else {
      console.warn(`Not authenticated`);
    }
  };

  const logout = async () => {
    await fetch(`/api/v1/auth`, {
      method: "DELETE",
    }).then(setUser(null));
  };

  useEffect(() => {
    whoami();
  }, []);

  const values = {
    user,
    setUser,
    whoami,
    logout,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
