import React, { useEffect, useState } from "react";
import ForumRow from "./ForumRow";

const ForumTable = ({ nameSearch, categorySearch }) => {
  const [forums, setForums] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchForums = async (nameSearch, categorySearch) => {
    let result = await fetch(
      `/api/v1/forums?page=${currentPage}&name=${nameSearch}&categoryId=${categorySearch}`
    );
    if (result.status === 200) {
      setForums(await result.json());
    } else {
      setForums(null);
    }
  };
  useEffect(() => {
    fetchForums(nameSearch, categorySearch);
  }, [nameSearch.length, categorySearch]);

  return (
    <div className="col-12">
      {forums &&
        forums.map((forum) => {
          return (
            <h2>
              <ForumRow key={forum.url} forum={forum} />
            </h2>
          );
        })}

      {!forums && (
        <div className="col-12 pt-5 oblique">
          <h2 className="secondary-tc">
            Vi kunde tyvärr inte hitta ett forum som matchade din sökning
          </h2>
        </div>
      )}
    </div>
  );
};

export default ForumTable;
