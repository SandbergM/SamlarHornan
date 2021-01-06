import React, { useEffect, useState } from "react";
import ForumTable from "../components/Forum/ForumTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";

const StartPage = () => {
  const [options, setOptions] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const fetchOptions = async () => {
    let res = await fetch(`/api/v1/categories`);
    if (res.status === 200) {
      setOptions(await res.json());
    }
  };

  useEffect(() => {
    fetchOptions();
  }, []);

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
          <Select onChange={setCategorySearch} options={options} />
        </div>
        <div className="col-12 mb-2">
          <ForumTable categorySearch={categorySearch} nameSearch={nameSearch} />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
