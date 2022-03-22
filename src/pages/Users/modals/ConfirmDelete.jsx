import React from "react";
import Button from "../../../shared/Components/button/Button";
import "./DeleteModal.scss";

const ConfirmDelete = ({ setShowDelete, deleteUser, openModal }) => {
  return (
    <div className="overLay">
      <div className="delete-card">
        <span>DELETE USER?</span>
        <div className="btn-ctn">
          {/* <div> */}
          <Button
            text="DELETE"
            variant="confrim-dlte"
            onClick={() => deleteUser()}
          />
          {/* </div> */}
          <Button
            text="NO"
            variant="confirm-dlte"
            onClick={() => setShowDelete(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
