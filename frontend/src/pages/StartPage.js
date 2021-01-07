import React, { useEffect, useState, useContext } from "react";
import ForumTable from "../components/Forum/ForumTable";
import SearchField from "../components/InputFields/SearchField";
import Select from "../components/InputFields/Select";

const StartPage = () => {
  const [nameSearch, setNameSearch] = useState("");
  const [categorySearch, setCategorySearch] = useState("");

  const [forums, setForums] = useState(null);
  const [categories, setCategories] = useState(null);

  const fetchForums = async () => {
    let forums = await fetch(
      `/api/v1/forums?name=${nameSearch}&categoryId=${categorySearch}`
    );
    switch (forums.status) {
      case 200:
        setForums(await forums.json());
        break;
      default:
        setForums(null);
    }
  };

  const fetchCategories = async () => {
    let categories = await fetch(`/api/v1/categories`);
    switch (categories.status) {
      case 200:
        setCategories(await categories.json());
        break;
      default:
        setCategories(null);
    }
  };

  useEffect(() => {
    fetchForums();
  }, [nameSearch, categorySearch]);

  useEffect(() => {
    fetchCategories();
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
