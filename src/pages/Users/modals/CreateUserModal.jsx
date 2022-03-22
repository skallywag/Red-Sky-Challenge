import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../../shared/Components/button/Button";
import "./Modal.scss";

const CreateUserModal = ({
  setShowCreateModal,
  getUsers,
  setToast,
  handleToast,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post(
          "http://localhost:5432/createUser",
          values
        );
        setShowCreateModal(false);
        handleToast("User Created!");
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
        <h3 className="title">Create New user</h3>
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
              variant="outline-btn"
              text="CANCEL"
              onClick={() => setShowCreateModal(false)}
            />
            <Button type="submit" text="CREATE" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
