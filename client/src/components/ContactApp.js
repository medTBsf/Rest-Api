import React from "react";
import { NavLink } from "react-router-dom";

const ContactApp = () => {
  return (
    <div className="row m-3">
      <div className="col-md-6 offset-md-3 text-center">
        <h1>Contact App</h1>
        <NavLink to="/contacts" className="btn btn-outline-secondary mr-2">
          Contact list
        </NavLink>
        <NavLink to="/add_contact" className="btn btn-outline-danger">
          Add contact
        </NavLink>
      </div>
    </div>
  );
};

export default ContactApp;
