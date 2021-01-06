import React from "react";
import { useHistory } from "react-router-dom";

const ForumRow = ({ forum }) => {
  let history = useHistory();

  const redirectToForum = (url) => {
    history.push(`/forum/${url}`);
  };
  return (
    <div
      className="row forum-row-container secondary-bgc rounded mt-2 primary-tc pointer pl-2"
      onClick={() => {
        redirectToForum(forum.url);
      }}
    >
      <p className="col-8 forum-row-name mt-2">{forum.name}</p>
      <p className="col-4 forum-row-threads mt-2">Trådar : {forum.threads}</p>
      <p className="col-12 forum-row-description">{forum.description}</p>
    </div>
  );
};

export default ForumRow;
