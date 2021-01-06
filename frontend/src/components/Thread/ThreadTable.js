import React, { useEffect, useState } from "react";
import ThreadRow from "./ThreadRow";

const ThreadTable = ({ forumUrl, threadTitle, sortBy }) => {
  const [threads, setThreads] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [noResult, setNoResult] = useState(false);

  const fetchThreads = async () => {
    console.log("pdwoijapodjwa");
    let result = await fetch(
      `/api/v1/threads?forumUrl=${forumUrl}&page=${currentPage}&title=${threadTitle}`
    );
    if (result.status === 200) {
      setThreads(await result.json());
      setNoResult(false);
    } else {
      setThreads(null);
      setNoResult(true);
    }
  };

  useEffect(() => {
    fetchThreads();
  }, [forumUrl, threadTitle]);

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
      {noResult && (
        <h2 className="col-12 pt-5 oblique secondary-tc no-result-text d-flex justify-content-center">
          Vi kunde tyvärr inte hitta en tråd som matchade din sökning
        </h2>
      )}
    </div>
  );
};

export default ThreadTable;
