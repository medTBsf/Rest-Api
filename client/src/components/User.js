import React from "react";
import "../styles/user.css";
import { NavLink } from "react-router-dom";

const User = ({ contact, deleteContact }) => {
  return (
    <div className="user">
      <h2>Contact name : {contact.name}</h2>
      <h4>Contact phone : {contact.phone}</h4>
      <h4>Contact email : {contact.email}</h4>
      <div>
        <NavLink
          to={`/modify_contact/${contact._id}`}
          className="btn btn-primary"
        >
          modifier
        </NavLink>
        <button
          type="button"
          className="btn btn-success"
          onClick={() => deleteContact(contact._id)}
        >
          supprimer
        </button>
      </div>
    </div>
  );
};

export default User;
