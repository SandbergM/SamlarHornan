import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { convertTimeStamp } from "../../utils/TimeStampToDateAndTime";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../../context/UserContext";

const CommentRow = ({ comment, deleteComment }) => {
  let { isAdmin, permissions } = useContext(UserContext);
  let { forumUrl } = useParams();
  return (
    <div
      className={`col-12 secondary-bgc rounded mt-2 primary-tc p-2 pl-5 ${
        comment.highlighted ? "highlighted-comment" : ""
      }`}
    >
      <div className="row">
        <div className="col-12 col-lg-4">
          <div className="row">
            <p className="col-12 bold">
              {convertTimeStamp(comment.published)}{" "}
            </p>
            <p className="col-12 bold oblique"> {comment.sender.username} </p>
          </div>
        </div>
        <div className="col-12 col-lg-7 comment-message-container">
          {comment.message}
        </div>
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
