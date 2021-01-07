import React from "react";
import ForumRow from "./ForumRow";

const ForumTable = ({ forums }) => {
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
        <h6 className="col-12 pt-5 oblique secondary-tc  d-flex justify-content-center">
          Vi kunde tyvärr inte hitta ett forum som matchade din sökning
        </h6>
      )}
    </div>
  );
};

export default ForumTable;
