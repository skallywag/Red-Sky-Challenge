import React from "react";
import "./Spinner.scss";
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div>
      <div className="spinner">
        <ClipLoader />
      </div>
    </div>
  );
};

export default Spinner;
