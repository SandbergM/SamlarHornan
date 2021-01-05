import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ThreadPage = () => {
  let { threadId } = useParams();

  const fetchComments = async () => {
    let res = await fetch(`/api/v1/comments?threadId=${threadId}`);
    res = await res.json();
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return <div className="row d-flex justify-content-around"></div>;
};

export default ThreadPage;
