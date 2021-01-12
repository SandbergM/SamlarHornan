import React, { useContext } from "react";
import ThreadRow from "./ThreadRow";
import { ForumContext } from "../../context/ForumContext";

const ThreadTable = () => {
  const { threads } = useContext(ForumContext);

  return (
    <div className="col-12">
      {threads &&
        threads.map((thread, index) => {
          return <ThreadRow key={index} thread={thread} />;
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
