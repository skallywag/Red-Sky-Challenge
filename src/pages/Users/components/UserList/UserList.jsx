import React from "react";
import Button from "../../../../shared/Components/button/Button";
import "./UserList.scss";
// import { userData } from "./userData.js";

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
              <th>
                <h2>Avatar</h2>
              </th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email Address</th>
            </tr>
          </thead>
          <tbody>
            {users
              ? users.map((user) => (
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
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
