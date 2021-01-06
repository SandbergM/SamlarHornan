import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadTable from "../components/Thread/ThreadTable";
import SearchField from "../components/InputFields/SearchField";
import NewThread from "../components/Thread/NewThread";
import { UserContext } from "../context/UserContext";

const StartPage = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const [forum, setForum] = useState(null);

  const { user } = useContext(UserContext);
  let { forumUrl } = useParams();

  const fetchForumDetails = async () => {
    let forum = await fetch(`/api/v1/forums?url=${forumUrl}`);
    forum = await forum.json();
    setForum(forum[0]);
  };

  useEffect(() => {
    fetchForumDetails();
  }, [forumUrl]);

  return (
    <div className="col-12 pt-3">
      <div className="row">
        <div className={`${user ? ` col-lg-8` : `col-12 col-lg-12`} mb-2`}>
          <SearchField
            onChange={setThreadTitle}
            placeholder={`Sök efter tråd`}
          />
        </div>
        {user && (
          <div className="col-12 col-lg-4 mb-2">
            <NewThread forum={forum} />
          </div>
        )}
        <div className="col-12 mb-2">
          <ThreadTable forumUrl={forumUrl} threadTitle={threadTitle} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
