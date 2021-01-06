import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentTable from "../components/Comment/CommentTable";
const ThreadPage = () => {
  const [comments, setComments] = useState([]);
  const [thread, setThread] = useState(null);
  let { threadId } = useParams();

  const fetchComments = async () => {
    let res = await fetch(`/api/v1/comments?threadId=${threadId}`);
    if (res.status === 200) {
      setComments(await res.json());
    }
  };

  const fetchThreadDetails = async () => {
    let res = await fetch(`/api/v1/threads?id=${threadId}`);
    if (res.status === 200) {
      res = await res.json();
      setThread(res[0]);
    }
  };

  useEffect(() => {
    fetchThreadDetails();
    fetchComments();
  }, []);

  return (
    <div className="d-flex justify-content-around">
      <div className="col-12 col-lg-8 col-xl-6 pt-5">
        <div className="row">
          <div className="col-12">{thread && <h2>{thread.title}</h2>}</div>
          <div className="col-12">
            <CommentTable comments={comments} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreadPage;
