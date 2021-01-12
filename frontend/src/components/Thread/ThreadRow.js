import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { convertTimeStamp } from "../../utils/TimeStampToDateAndTime";
import { UserContext } from "../../context/UserContext";
import { ForumContext } from "../../context/ForumContext";
import { MdDelete } from "react-icons/md";

const ThreadRow = ({ thread }) => {
  let history = useHistory();
  let { forumUrl } = useParams();

  let { isAdmin, permissions } = useContext(UserContext);
  const { deleteThread } = useContext(ForumContext);

  const redirectToThread = (id) => {
    history.push(`/forum/${forumUrl}/thread/${id}`);
  };

  return (
    <div className="row forum-row-container secondary-bgc rounded mt-2 primary-tc  pl-2">
      <div
        className={`forum-row-description pointer ${
          isAdmin || permissions[forumUrl] ? "col-10" : "col-12"
        }`}
        onClick={() => {
          redirectToThread(thread.id);
        }}
      >
        <div className="row">
          <h5 className="col-7 forum-row-name mt-2">{thread.title}</h5>
          <h5 className="col-5 forum-row-name mt-2">
            {convertTimeStamp(thread.published)}
          </h5>
          <h5 className="col-12">Svar {thread.comments}</h5>
        </div>
      </div>
      {(isAdmin || permissions[forumUrl]) && (
        <div className="col-2 d-flex justify-content-center align-items-center">
          <MdDelete
            className="pointer"
            onClick={() => {
              deleteThread(thread.id);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ThreadRow;
