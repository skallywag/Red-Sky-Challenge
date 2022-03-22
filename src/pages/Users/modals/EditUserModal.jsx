import React from "react";
import { useFormik } from "formik";
import Button from "../../../shared/Components/button/Button";
import "./Modal.scss";
import axios from "axios";

const EditUserModal = ({
  setShowEditModal,
  showEditModal,
  handleToast,
  openEditModal,
  getUsers,
  modalId,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
      modalId,
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.put(
          `http://localhost:5432/updateUser/`,
          values
        );
        setShowEditModal(false);
        handleToast("User Updated!");
        getUsers();
      } catch {
        console.error();
      }
      resetForm({ values: "" });
    },
  });
  return (
    <div className="overLay">
      <div className="modal-ctn">
        <h3 className="title">EDIT USER</h3>
        <form onSubmit={formik.handleSubmit} className="modal-form">
          <div>
            <label className="modal-label" htmlFor="firstName">
              First Name
            </label>
            <input
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="firstName"
              type="text"
              className="modal-input"
            />
          </div>

          <label className="modal-label" htmlFor="lastName">
            Last Name
          </label>
          <div>
            <input
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="lastName"
              type="text"
              className="modal-input"
            />
          </div>

          <label className="modal-label" htmlFor="email">
            Email Address
          </label>
          <div>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="email"
              type="text"
              className="modal-input"
            />
          </div>

          <label className="modal-label" htmlFor="avatar">
            Avatar Image Link
          </label>
          <div>
            <input
              value={formik.values.avatar}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              id="avatar"
              type="text"
              className="modal-input"
            />
          </div>
          <div className="form-btns">
            <Button
              text="CANCEL"
              variant="outline-btn"
              showEditModal={showEditModal}
              setShowEditModal={setShowEditModal}
              onClick={() => setShowEditModal(false)}
            />
            <Button text="SAVE" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
