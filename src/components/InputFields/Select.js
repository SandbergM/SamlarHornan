import React from "react";
import { Input } from "reactstrap";

const Select = (props) => {
  return (
    <div className="col-12 no-padding ">
      <Input
        type="select"
        placeholder={props.placeholder || `Skriv här...`}
        onChange={(e) => props.onChange(e.target.value)}
      >
        <option value=""> {props.defaultOption || "Allt"} </option>
        {props.options.map((x, index) => {
          return (
            <option key={index} value={x.id}>
              {x.name}
            </option>
          );
        })}
      </Input>
    </div>
  );
};
export default Select;
