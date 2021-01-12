import React, { useState, useContext, useEffect } from "react";
import { Input } from "reactstrap";
import RemoveRole from "./RemoveRole";
import AddRole from "./AddRole";

const UpdateUser = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [profilToUpdate, setProfileToUpdate] = useState(null);

  const fetchUsers = async (username) => {
    let result = await fetch(`/api/v1/users?username=${username}`);
    switch (result.status) {
      case 200:
        setUsers(await result.json());
        break;
      default:
        setUsers(null);
    }
  };

  const selectUser = (user) => {
    setProfileToUpdate(user);
    setUsers(null);
  };

  useEffect(() => {
    setProfileToUpdate(null);
    fetchUsers(username);
  }, [username]);

  return (
    <div className="primary-bgc secondary-tc">
      <Input
        type="text"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      {users &&
        users.map((user) => {
          return (
            <p
              className="mt-1 mb-1"
              onClick={() => {
                selectUser(user);
              }}
            >
              {user.username}
            </p>
          );
        })}
      {profilToUpdate && (
        <div className="row">
          <RemoveRole user={profilToUpdate} setUser={setProfileToUpdate} />
          <AddRole user={profilToUpdate} setUser={setProfileToUpdate} />
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
