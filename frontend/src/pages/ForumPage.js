import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import ThreadTable from "../components/Thread/ThreadTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";
import NewThread from "../components/Thread/NewThread";
import { UserContext } from "../context/UserContext";

const StartPage = () => {
  const [threadTitle, setThreadTitle] = useState("");
  const { user } = useContext(UserContext);
  let { forumUrl } = useParams();

  return (
    <div className="d-flex justify-content-around">
      <div className="col-12 col-lg-8 col-xl-6 pt-5">
        <div className="row">
          <div
            className={`${user ? `col-12 col-lg-6` : `col-12 col-lg-8`} mb-2`}
          >
            <SearchField
              onChange={setThreadTitle}
              placeholder={`Sök efter tråd`}
            />
          </div>
          <div
            className={`${user ? `col-12 col-lg-3` : `col-12 col-lg-4`} mb-2`}
          >
            <Select options={[]} />
          </div>
          {user && (
            <div className="col-12 col-lg-3 mb-2">
              <NewThread />
            </div>
          )}
        </div>
        <ThreadTable forumUrl={forumUrl} threadTitle={threadTitle} />
      </div>
    </div>
  );
};

export default StartPage;
