import React from "react";
import Button from "../../../../shared/Components/button/Button";
import Spinner from "../../../../shared/Components/Spinner/Spinner";
// import { userData } from "./userData.js";
import "./UserList.scss";

const UserList = ({ users, openModal }) => {
  return (
    <div className="container">
      <div className="user-list-ctn">
        <div className="title-ctn">
          <h2 className="table-title">USER LIST</h2>
        </div>
        <table className="user-table">
          <thead className="table-head">
            <tr className="tHead-row">
              <th className="avatar-title">Avatar</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {users ? (
              users.map((user) => (
                <tr key={user.id} className="user-cell">
                  <td>
                    <img
                      className="avatar"
                      src={user.avatar}
                      alt="avatar img"
                    />
                  </td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td className="buttonCtn">
                    <Button
                      text="EDIT"
                      onClick={() => openModal(user.id, "edit")}
                      variant="edit-btn"
                    />
                    <Button
                      text="DELETE"
                      variant="delete-btn"
                      onClick={() => {
                        openModal(user.id);
                      }}
                    />
                  </td>
                </tr>
              ))
            ) : (
              // Aware of a correct way to set loading state.
              <Spinner />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
