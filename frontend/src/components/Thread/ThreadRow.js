import React from "react";
import { useHistory } from "react-router-dom";

const ThreadRow = ({ thread }) => {
  let history = useHistory();

  //   const redirectToForum = (url) => {
  //     history.push(`/forum/${url}`);
  //   };

  return (
    <div
      className="row forum-row-container secondary-bgc rounded mt-2 primary-tc pointer pl-2"
      onClick={() => {
        // redirectToForum(forum.url);
      }}
    >
      <p className="col-12 forum-row-name">{thread.title}</p>
      <p className="col-12 forum-row-description">{thread.message}</p>
    </div>
  );
};

export default ThreadRow;
