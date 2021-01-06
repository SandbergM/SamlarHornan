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
      <p className="col-12 col-lg-8 forum-row-name mt-2 mb-0">{thread.title}</p>
      <p className="col-12 col-lg-4 forum-row-name mt-2">
        Svar {thread.comments}
      </p>
    </div>
  );
};

export default ThreadRow;
