import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ThreadTable from "../components/Thread/ThreadTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";
import NewThread from "../components/Thread/NewThread";

const StartPage = () => {
  const [threadTitle, setThreadTitle] = useState("");
  let { forumUrl } = useParams();

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-8 pt-5">
        <div className="row">
          <div className="col-8">
            <SearchField
              onChange={setThreadTitle}
              placeholder={`Sök efter tråd`}
            />
          </div>
          <div className="col-4">
            <Select options={[]} />
          </div>
          <div className="col-12">
            <NewThread />
          </div>
        </div>
        <ThreadTable forumUrl={forumUrl} threadTitle={threadTitle} />
      </div>
    </div>
  );
};

export default StartPage;
