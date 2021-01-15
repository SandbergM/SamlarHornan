import React, { useState, useContext, useEffect } from "react";
import { Button, Input } from "reactstrap";

const AddRole = ({ user, setUser }) => {
  const [forumId, setForumId] = useState(null);
  const [forums, setForums] = useState(null);
  const [message, setMessage] = useState(null);

  const updateProfile = async () => {
    let res = await fetch(`/api/v1/users/upgrade`, {
      method: "PUT",
      body: JSON.stringify({
        userId: user.id,
        forumId: parseInt(forumId),
      }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });

    let forumToAppend = forums.filter((forum) => {
      if (forum.id == forumId) {
        return forum;
      }
    })[0];

    switch (res.status) {
      case 200:
        setUser({
          ...user,
          permissions: {
            ...user.permissions,
            [forumToAppend.name]: forumToAppend.id,
          },
        });
        setMessage(`Role added!`);
        break;
      default:
        setMessage(`Error, could not add role`);
    }
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
      {message && <p> {message} </p>}
    </div>
  );
};

export default AddRole;
