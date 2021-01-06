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
    <div className="d-flex justify-content-around">
      <div className="col-12 col-lg-8 col-xl-6 pt-5">
        <div className="row ">
          <div className="col-8">
            <SearchField
              onChange={setNameSearch}
              placeholder={`Sök efter forum`}
            />
          </div>
          <div className="col-4">
            <Select
              className="col-8"
              onChange={setCategorySearch}
              options={options}
            />
          </div>
        </div>
        <ForumTable categorySearch={categorySearch} nameSearch={nameSearch} />
      </div>
    </div>
  );
};

export default StartPage;
