import React from "react";
import User from "./User";

const ListUsers = props => {
  return (
    <div className="row text-center justify-content-center pr-3 pl-3">
      <div className="col-md">
        <h1 className="text-center">This is the contact page</h1>
        <div className="row">
          {props.contacts.map((contact, index) => {
            return (
              <div className="col-md-3 mb-3" key={index}>
                <User
                  contact={contact}
                  deleteContact={id => props.deleteContact(id)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListUsers;
