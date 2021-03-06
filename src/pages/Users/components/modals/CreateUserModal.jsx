import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import Button from "../../../../shared/Components/button/Button";
import "./Modal.scss";

const CreateUserModal = ({ setShowCreateModal, getUsers, handleToast }) => {
  const validate = (values) => {
    const errors = {};
    const emailRegex = new RegExp(
      /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/g
    );
    if (!values.firstName) {
      errors.firstName = "*Required";
    } else if (values.firstName.length < 3) {
      errors.firstName = "First Name must be more than 3 characters";
    }
    if (!values.lastName) {
      errors.lastName = "*Required";
    } else if (values.lastName.length < 3) {
      errors.lastName = "Last Name must be more than 3 characters";
    }
    if (!values.email) {
      errors.email = "*Required";
    } else if (!emailRegex.test(values.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!values.avatar) {
      errors.avatar = "*Required";
    } else if (values.avatar.length < 8) {
      formik.errors.avatar = "Please enter an avatar link";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      avatar: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        // const response = await axios.post(
        //   "http://localhost:5432/createUser",
        //   values
        // );
        const response = await axios.post("/createUser", values);
        setShowCreateModal(false);
        handleToast("USER CREATED!");
        getUsers();
      } catch {
        console.error();
      }
      resetForm({ values: "" });
    },
    validate,
  });

  return (
    <div className="overLay">
      <div className="modal-ctn">
        <h3 className="modal-title">Create New user</h3>
        <form onSubmit={formik.handleSubmit} className="modal-form">
          <label className="modal-label" htmlFor="firstName">
            First Name
          </label>
          <div>
            {formik.errors.firstName && formik.touched.firstName ? (
              <span className="input-error">{formik.errors.firstName}</span>
            ) : null}
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
            {formik.errors.lastName && formik.touched.lastName ? (
              <span className="input-error">{formik.errors.lastName}</span>
            ) : null}
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
            {formik.errors.email && formik.touched.email ? (
              <span className="input-error">{formik.errors.email}</span>
            ) : null}
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
            {formik.errors.avatar && formik.touched.avatar ? (
              <span className="input-error">{formik.errors.avatar}</span>
            ) : null}
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
              variant="cancel-btn"
              text="CANCEL"
              onClick={() => setShowCreateModal(false)}
            />
            <Button type="submit" text="CREATE" variant="small-btn" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
