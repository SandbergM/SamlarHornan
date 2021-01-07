import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { convertTimeStamp } from "../../utils/TimeStampToDateAndTime";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../context/UserContext";

const CommentRow = ({ comment, deleteComment }) => {
  let { isAdmin, permissions } = useContext(UserContext);
  let { forumUrl } = useParams();
  console.log(permissions);
  return (
    <div className="col-12 secondary-bgc rounded mt-2 primary-tc p-2 pl-5">
      <div className="row">
        <div className="col-3">
          <p> {convertTimeStamp(comment.published)} </p>
        </div>
        <div className="col-8 comment-message-container">{comment.message}</div>
        {(isAdmin || permissions[forumUrl]) && (
          <div className="col-1 d-flex align-items-center">
            <MdDelete
              className="pointer"
              onClick={() => {
                deleteComment(comment.id);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentRow;
