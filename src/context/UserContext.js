import React, { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [permissions, setPermissions] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

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
    });
    setUser(null);
  };

  useEffect(() => {
    whoami();
  }, []);

  useEffect(() => {
    setPermissions({ ...((user && user.permissions) || {}) });
    setIsAdmin(user && user.roles && user.roles.includes("ADMIN"));
  }, [user]);

  const values = {
    user,
    setUser,
    whoami,
    logout,
    permissions,
    isAdmin,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};
export default UserContextProvider;
