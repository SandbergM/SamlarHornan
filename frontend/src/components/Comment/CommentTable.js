import React, { useEffect, useState } from "react";
import CommentRow from "./CommentRow";

const CommentTable = ({ comments }) => {
  return (
    <div className="col-12">
      {comments &&
        comments.map((comment, index) => {
          return (
            <h2>
              <CommentRow key={index} comment={comment} />
            </h2>
          );
        })}
    </div>
  );
};

export default CommentTable;
