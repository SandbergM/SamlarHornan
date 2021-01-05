import React, { useEffect, useState } from "react";
import ForumTable from "../components/Forum/ForumTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";

const StartPage = () => {
  const [options, setOptions] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const fetchOptions = async () => {
    let tempArr = [
      { id: 1, name: "Fotboll" },
      { id: 2, name: "Simmning" },
      { id: 3, name: "Bowling" },
      { id: 4, name: "Frimärken" },
    ];
    setOptions(tempArr);
  };

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <div className="row d-flex justify-content-around">
      <div className="col-8 pt-5">
        <div className="row ">
          <div className="col-8 ">
            <SearchField
              onChange={setNameSearch}
              placeholder={`Sök efter ett forum`}
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
