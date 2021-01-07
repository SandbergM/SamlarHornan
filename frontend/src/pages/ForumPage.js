import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ThreadTable from "../components/Thread/ThreadTable";
import SearchField from "../components/InputFields/SearchField";
import NewThread from "../components/Thread/NewThread";
import { MdDelete } from "react-icons/md";
import { UserContext } from "../context/UserContext";

const StartPage = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const [threads, setThreads] = useState("");

  const { isAdmin, permissions, user } = useContext(UserContext);
  let { forumUrl } = useParams();

  const fetchThreads = async (title) => {
    let threads = await fetch(
      `/api/v1/threads?forumUrl=${forumUrl}&title=${title}`
    );
    switch (threads.status) {
      case 200:
        setThreads(await threads.json());
        break;
      default:
        setThreads(null);
    }
  };

  const deleteThread = async (id) => {};

  useEffect(() => {
    fetchThreads(threadTitle);
  }, [threadTitle]);

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
            <NewThread forumUrl={forumUrl} />
          </div>
        )}
        <div className="col-12 mb-2">
          <ThreadTable threads={threads} deleteThread={deleteThread} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
