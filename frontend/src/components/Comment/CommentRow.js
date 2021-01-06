import React from "react";

const CommentRow = ({ comment }) => {
  return (
    <div className="row forum-row-container secondary-bgc rounded mt-2 primary-tc pointer pl-2">
      <p className="col-8 forum-row-name mt-2 mb-0">{comment.message}</p>
    </div>
  );
};

export default CommentRow;
