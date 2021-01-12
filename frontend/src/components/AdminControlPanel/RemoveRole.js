import React, { useState } from "react";
import { Button, Input } from "reactstrap";

const RemoveRole = ({ user }) => {
  const [role, setRole] = useState(null);

  const updateProfile = async () => {
    let result = await fetch(`/api/v1/users/downgrade`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        roleId: parseInt(role),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
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
          return <option value={val}> {key} </option>;
        })}
      </Input>
      <Button
        onClick={() => {
          updateProfile();
        }}
      >
        Ta bort roll
      </Button>
    </div>
  );
};

export default RemoveRole;
