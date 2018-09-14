import React from "react";
import { NavLink } from "react-router-dom";

const AddContact = props => {
  return (
    <div className="row mb-3">
      <div className="col-md-6 offset-md-3">
        <h1 className="text-center">Add contact page</h1>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label htmlFor="contact-name">Contact name</label>
              <input
                type="text"
                className="form-control"
                id="contact-name"
                placeholder="Contact name"
                onChange={props.nameHandler}
              />
              <span
                className={`mt-3 mb-3 ${
                  props.nameWarning ? "text-danger" : ""
                }`}
              >
                {props.nameWarning}
              </span>
            </div>
            <div className="form-group">
              <label htmlFor="tel-number">Contact phone</label>
              <input
                type="number"
                className="form-control"
                id="tel-number"
                placeholder="Contact phone number"
                min="21000000"
                max="99999999"
                onChange={props.phoneHandler}
              />
            </div>
            <div className="form-group">
              <label htmlFor="conatact-email">Contact email</label>
              <input
                type="email"
                className="form-control"
                id="conatact-email"
                placeholder="Contact email"
                onChange={props.emailHandler}
              />
              <span
                className={`mt-3 mb-3 ${
                  props.emailWarning ? "text-danger" : ""
                }`}
              >
                {props.emailWarning}
              </span>
            </div>
            <div className="text-center">
              <NavLink
                to="/contacts"
                className="btn btn-primary"
                onClick={props.addContact}
              >
                Add contact
              </NavLink>
              <NavLink to="/contacts" className="btn btn-danger ml-4">
                Cancel
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddContact;
