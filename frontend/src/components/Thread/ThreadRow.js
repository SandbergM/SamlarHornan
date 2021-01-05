import React from "react";
import { useHistory, useParams } from "react-router-dom";

const ThreadRow = ({ thread }) => {
  let history = useHistory();
  let { forumUrl } = useParams();

  const redirectToThread = (id) => {
    history.push(`/forum/${forumUrl}/thread/${id}`);
  };

  return (
    <div
      className="row forum-row-container secondary-bgc rounded mt-2 primary-tc pointer pl-2"
      onClick={() => {
        redirectToThread(thread.id);
      }}
    >
      <p className="col-12 forum-row-name">{thread.title}</p>
      <p className="col-12 forum-row-description">{thread.message}</p>
    </div>
  );
};

export default ThreadRow;
