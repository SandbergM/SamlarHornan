import React from "react";
import CommentRow from "./CommentRow";

const CommentTable = ({ comments, deleteComment }) => {
  return (
    <div className="row">
      {comments &&
        comments.map((comment, index) => {
          return (
            <CommentRow
              key={index}
              comment={comment}
              deleteComment={deleteComment}
            />
          );
        })}
    </div>
  );
};

export default CommentTable;
