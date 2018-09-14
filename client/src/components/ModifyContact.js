import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import axios from "axios";

class ModifyContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contactName: "",
      contactPhone: "",
      contactEmail: ""
    };
  }

  nameHandler = event => {
    this.setState({
      contactName: event.target.value
    });
  };

  phoneHandler = event => {
    this.setState({
      contactPhone: event.target.value
    });
  };

  emailHandler = event => {
    this.setState({
      contactEmail: event.target.value
    });
  };

  updateContact = id => {
    let contactToModify = {
      name: this.state.contactName,
      phone: this.state.contactPhone,
      email: this.state.contactEmail
    };
    axios.put(`/modify_contact/${id}`, contactToModify).then(res => {
      axios.get("/contacts").then(res => {
        this.props.updateContacts(res.data);
      });
    });
  };

  componentDidMount() {
    axios.get(`/modify_contact/${this.props.id}`).then(res => {
      this.setState({
        contactName: res.data.name,
        contactPhone: res.data.phone,
        contactEmail: res.data.email
      });
    });
  }
  render() {
    return (
      <div className="row mb-3">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center">Modify contact page</h1>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label htmlFor="contact-name">Contact name</label>
                <input
                  type="text"
                  className="form-control"
                  id="contact-name"
                  placeholder="Contact name"
                  onChange={this.nameHandler}
                  value={this.state.contactName}
                />
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
                  onChange={this.phoneHandler}
                  value={this.state.contactPhone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="conatact-email">Contact email</label>
                <input
                  type="email"
                  className="form-control"
                  id="conatact-email"
                  placeholder="Contact name"
                  onChange={this.emailHandler}
                  value={this.state.contactEmail}
                />
              </div>
              <div className="text-center">
                <NavLink
                  to="/contacts"
                  className="btn btn-primary"
                  onClick={() => this.updateContact(this.props.id)}
                >
                  Modify contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModifyContact;
