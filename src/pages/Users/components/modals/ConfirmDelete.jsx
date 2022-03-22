import React from "react";
import Button from "../../../../shared/Components/button/Button";
import "./DeleteModal.scss";

const ConfirmDelete = ({ setShowDelete, deleteUser }) => {
  return (
    <div className="overLay">
      <div className="delete-ctn">
        <div className="title-ctn">
          <h3 className="delete-title">DELETE USER?</h3>
        </div>
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
