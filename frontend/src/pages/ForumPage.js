import React from "react";
import { useParams } from "react-router-dom";
import ThreadTable from "../components/Thread/ThreadTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";

const StartPage = () => {
  let { forumUrl } = useParams();

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-8 pt-5">
        <div className="row ">
          <div className="col-8 ">
            <SearchField placeholder={`Sök efter en tråd`} />
          </div>
          <div className="col-4">
            <Select className="col-8" options={[]} />
          </div>
        </div>
        <ThreadTable forumUrl={forumUrl} />
      </div>
    </div>
  );
};

export default StartPage;
