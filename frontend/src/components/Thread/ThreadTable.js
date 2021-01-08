import React from "react";
import ThreadRow from "./ThreadRow";

const ThreadTable = ({ threads, deleteThread }) => {
  return (
    <div className="col-12">
      {threads &&
        threads.map((thread, index) => {
          return (
            <ThreadRow
              key={index}
              thread={thread}
              deleteThread={deleteThread}
            />
          );
        })}
      {!threads && (
        <h2 className="col-12 pt-5 oblique secondary-tc no-result-text d-flex justify-content-center">
          Vi kunde tyvärr inte hitta en tråd som matchade din sökning
        </h2>
      )}
    </div>
  );
};

export default ThreadTable;
