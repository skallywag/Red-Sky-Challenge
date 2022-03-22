import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "../../shared/Components/button/Button";
import UserList from "./components/UserList/UserList";
import CreateUserModal from "./components/modals/CreateUserModal";
import EditUserModal from "./components/modals/EditUserModal";
import ConfirmDelete from "./components/modals/ConfirmDelete";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [modalId, setModalId] = useState(null);
  const [toast, setToast] = useState("");
  // const ref = useRef();
  // useOnClickOutside(ref, () => setShowDelete(false));

  useEffect(() => {
    async function getInitialUsers() {
      try {
        // Saved to local storage.
        // const response = await axios.get("https://reqres.in/api/users?page=2");
        // setUsers(response.data.data)
        // localStorage.setItem("users", JSON.stringify(response.data));
        // const { data } = await axios.get("http://localhost:5432/getUsers");
        // Hosting
        const { data } = await axios.get("/getUsers");
        setUsers(data);
      } catch {
        console.error();
      }
    }
    getInitialUsers();
  }, []);

  // Was learning how i could set up an "offClick" event.

  // function useOnClickOutside(ref, handler) {
  //   useEffect(() => {
  //     const listener = (event) => {
  //       // Do nothing if clicking ref's element or descendent elements
  //       if (!ref.current || ref.current.contains(event.target)) {
  //         return;
  //       }
  //       handler(event);
  //     };
  //     document.addEventListener("mousedown", listener);
  //     document.addEventListener("touchstart", listener);
  //     return () => {
  //       document.removeEventListener("mousedown", listener);
  //       document.removeEventListener("touchstart", listener);
  //     };
  //   }, [ref, handler]);
  // }

  const getUsers = async () => {
    try {
      // const { data } = await axios.get("http://localhost:5432/getUsers");
      // Hosting
      const { data } = await axios.get("/getUsers");

      setUsers(data);
    } catch {
      console.error();
    }
  };

  const deleteUser = async () => {
    try {
      // const response = await axios.delete(
      //   `http://localhost:5432/deleteUser/${modalId}`
      // );
      const response = await axios.delete(`/deleteUser/${modalId}`);
      console.log(response);
      setShowDelete(false);
      getUsers();
      handleToast("USER DELETED");
    } catch {
      console.error();
    }
  };

  // Used function to get id's for now.
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
      <h1 className="users-title">Red Sky Coding Challenge</h1>
      <div className="line-break" />
      <div className="wrapper">
        <div className="createBtnCtn">
          <Button
            onClick={() => setShowCreateModal(!false)}
            variant="large-btn"
            text="CREATE NEW USER"
          />
        </div>
        <UserList users={users} openModal={openModal} />
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
