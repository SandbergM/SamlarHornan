import React, { useState, useContext, useEffect } from "react";
import { Button, Input } from "reactstrap";

const AddRole = ({ user }) => {
  const [forumId, setForumId] = useState(null);
  const [forums, setForums] = useState(null);

  const updateProfile = async () => {
    await fetch(`/api/v1/users/upgrade`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        forumId: parseInt(forumId),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
  };

  const fetchForums = async () => {
    let res = await fetch(`/api/v1/forums`);
    switch (res.status) {
      case 200:
        res = await res.json();
        setForums(res);
        break;
      default:
        setForums(null);
    }
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return (
    <div className="col-6">
      <h6> Nuvarande roller </h6>
      <Input
        type="select"
        onChange={(e) => {
          setForumId(e.target.value);
        }}
      >
        <option defaultValue>Roller</option>
        {forums &&
          forums.map((forum) => {
            return <option value={forum.id}> {forum.name} </option>;
          })}
      </Input>
      <Button
        onClick={() => {
          updateProfile();
        }}
      >
        Lägg till roll
      </Button>
    </div>
  );
};

export default AddRole;
