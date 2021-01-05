import React from "react";
import { Input } from "reactstrap";

const SearchField = (props) => {
  return (
    <div className="col-12 no-padding">
      <Input
        type="text"
        placeholder={props.placeholder || `Skriv här...`}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};
export default SearchField;
