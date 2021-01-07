import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import CommentTable from "../components/Comment/CommentTable";
import { convertTimeStamp } from "../utils/TimeStampToDateAndTime";
import { MdLockOpen, MdLockOutline } from "react-icons/md";
import { UserContext } from "../context/UserContext";

const ThreadPage = () => {
  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState(null);

  let { isAdmin, permissions, user } = useContext(UserContext);
  let { threadId, forumUrl } = useParams();

  const fetchComments = async () => {
    let comments = await fetch(`/api/v1/comments?threadId=${threadId}`);
    switch (comments.status) {
      case 200:
        setComments(await comments.json());
        break;
      default:
        setComments(null);
    }
  };

  const fetchThreadDetails = async () => {
    let thread = await fetch(
      `/api/v1/threads?id=${threadId}&forumUrl=${forumUrl}`
    );
    switch (thread.status) {
      case 200:
        thread = await thread.json();
        setThread(thread[0]);
        break;
      default:
        setComments(null);
    }
  };

  const deleteComment = async (id) => {
    await fetch(`/api/v1/comments/${id}`, {
      method: "DELETE",
    });
    let updatedArr = comments.filter((comment) => {
      if (comment.id !== id) return comments;
    });
    setComments(updatedArr);
  };

  const lockThread = async () => {
    let locked = thread.isLocked === 0 ? 1 : 0;
    console.log(locked);
    let res = await fetch(`/api/v1/threads/${threadId}`, {
      method: "PUT",
      body: JSON.stringify({ isLocked: locked }),
      headers: { "Content-type": "application/json;charset=utf-8" },
    });
    if (res.status === 200) {
      setThread({ ...thread, isLocked: !thread.isLocked });
    }
  };

  useEffect(() => {
    fetchThreadDetails();
    fetchComments();
  }, [forumUrl]);

  return (
    <div className="d-flex justify-content-around ">
      {thread && (
        <div className="col-12">
          <div className="row">
            <div
              className={`primary-tc secondary-bgc bold oblique p-2 pl-5 ${
                isAdmin || permissions[forumUrl]
                  ? "col-10 rounder-upper-left"
                  : "col-12 rounded-upper"
              }`}
            >
              {thread && <h2>{thread.title}</h2>}
            </div>
            {(isAdmin || permissions[forumUrl]) && (
              <div className="col-2 primary-tc secondary-bgc bold oblique rounder-upper-right d-flex justify-content-center align-items-center">
                {thread.isLocked ? (
                  <MdLockOutline
                    className="moderator-icon pointer"
                    onClick={() => {
                      lockThread();
                    }}
                  />
                ) : (
                  <MdLockOpen
                    className="moderator-icon pointer"
                    onClick={() => {
                      lockThread();
                    }}
                  />
                )}
              </div>
            )}
            <div className="col-12 primary-tc secondary-bgc bold oblique p-2 pl-5 ">
              <h5>{convertTimeStamp(thread.published)}</h5>
            </div>
            <div className="col-12">
              <CommentTable deleteComment={deleteComment} comments={comments} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreadPage;
