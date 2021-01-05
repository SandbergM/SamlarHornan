import React, { useEffect, useState } from "react";
import ThreadRow from "./ThreadRow";

const ThreadTable = ({ forumUrl }) => {
  const [threads, setThreads] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchThreads = async () => {
    let result = await fetch(
      `/api/v1/threads?forumUrl=${forumUrl}&page=${currentPage}`
    );
    console.log(result);
    if (result.status === 200) {
      setThreads(await result.json());
    } else {
      setThreads(null);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, []);

  return (
    <div className="col-12">
      {threads &&
        threads.map((thread) => {
          return (
            <h2>
              <ThreadRow key={thread.title} thread={thread} />
            </h2>
          );
        })}
    </div>
  );
};

export default ThreadTable;
