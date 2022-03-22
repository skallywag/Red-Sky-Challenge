import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "../../shared/Components/button/Button";
import UserList from "./components/UserList/UserList";
import CreateUserModal from "./modals/CreateUserModal";
import EditUserModal from "./modals/EditUserModal";
import ConfirmDelete from "./modals/ConfirmDelete";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function getInitialUsers() {
      try {
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        // setUsers(response.data.data)
        // localStorage.setItem("users", JSON.stringify(response.data));
        const { data } = await axios.get("http://localhost:5432/getUsers");
        setUsers(data);
      } catch {
        console.error();
      }
    }
    getInitialUsers();
  }, [users]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5432/getUsers");
      setUsers(data);
    } catch {
      console.error();
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:5432/deleteUser/${modalId}`
      );
      // getUsers();
      setShowDelete(false);
      handleToast("USER DELETED");
    } catch {
      console.error();
    }
  };

  const openModal = (id, type) => {
    setModalId(id);
    if (type === "edit") {
      return setShowEditModal(true);
    }
    setShowDelete(true);
  };

  const handleToast = (toast) => {
    setToast(toast);
    setTimeout(() => {
      setToast("");
    }, 2500);
  };

  return (
    <div className="container">
      {toast && (
        <div className="toast-ctn">
          <span className="toast">{toast}</span>
        </div>
      )}
      <div className="wrapper">
        <h1 className="users-title">Red Sky Coding Challenge</h1>
        <div className="line-break" />
        <div className="createBtnCtn">
          <Button
            onClick={() => setShowCreateModal(!false)}
            variant="large-btn"
            text="CREATE NEW USER"
          />
        </div>
        <div>
          <UserList
            users={users}
            showEditModal={showEditModal}
            setShowEditModal={setShowEditModal}
            deleteUser={deleteUser}
            getUsers={getUsers}
            handleToast={handleToast}
            setShowDelete={setShowDelete}
            openModal={openModal}
          />
        </div>
        {showCreateModal && (
          <CreateUserModal
            setShowCreateModal={setShowCreateModal}
            getUsers={getUsers}
            handleToast={handleToast}
          />
        )}
        {showEditModal && (
          <EditUserModal
            setShowEditModal={setShowEditModal}
            handleToast={handleToast}
            getUsers={getUsers}
            openModal={openModal}
            modalId={modalId}
          />
        )}
        {showDelete && (
          <ConfirmDelete
            setShowDelete={setShowDelete}
            deleteUser={deleteUser}
            openModal={openModal}
          />
        )}
      </div>
    </div>
  );
};

export default Users;
