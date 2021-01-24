import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const RemoveRole = ({ user, setUser }) => {
  const [role, setRole] = useState(null);
  const [message, setMessages] = useState(null);

  const updateProfile = async () => {
    let result = await fetch(`/api/v1/users/downgrade`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        roleId: parseInt(role.split(",")[1]),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    switch (result.status) {
      case 200:
        delete user.permissions[role.split(",")[0]];
        setUser(user);
        setMessages(`Role removed from user ${user.username}`);
        break;
      default:
        setMessages(`Couldn't remove role from ${user.username}`);
    }
  };

  return (
    <div className="col-6">
      <h6> Nuvarande roller </h6>
      <Input
        type="select"
        onChange={(e) => {
          setRole(e.target.value);
        }}
      >
        <option defaultValue>Roller</option>
        {Object.entries(user.permissions).map(([key, val]) => {
          return <option value={[key, val]}> {key} </option>;
        })}
      </Input>
      <Button
        onClick={() => {
          updateProfile();
        }}
      >
        Ta bort roll
      </Button>
      {message && <p> {message} </p>}
    </div>
  );
};

export default RemoveRole;
