import React, { useContext, useState, useEffect } from "react";
import ForumTable from "../components/Forum/ForumTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";

import { ForumContext } from "../context/ForumContext";

const StartPage = () => {
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const { forums, categories, fetchForums } = useContext(ForumContext);

  useEffect(() => {
    fetchForums(nameSearch, categorySearch);
  }, [nameSearch, categorySearch]);

  return (
    <div className="col-12 pt-3">
      <div className="row">
        <div className="col-12 col-lg-8 mb-2">
          <SearchField
            onChange={setNameSearch}
            placeholder={`Sök efter forum`}
          />
        </div>
        <div className="col-12 col-lg-4 mb-2">
          <Select onChange={setCategorySearch} options={categories || []} />
        </div>
        <div className="col-12 mb-2">
          <ForumTable forums={forums} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
