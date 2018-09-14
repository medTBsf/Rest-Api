import React, { Component } from "react";
import "./App.css";
import ListUsers from "./components/ListUsers";
import AddContact from "./components/AddContact";
import ContactApp from "./components/ContactApp";
import ModifyContact from "./components/ModifyContact";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: [],
      contactName: "",
      contactPhone: 0,
      contactEmail: "",
      nameWarning: "",
      emailWarning: ""
    };
  }

  nameHandler = event => {
    let regex = /^[a-zA-Z]\D*[\s\s.]*$/; // regex for names starts with char, having spaces dots and no numeric allowed
    let warning = "";
    if (regex.test(event.target.value)) {
      if (event.target.value.length < 3 || event.target.value.length > 15) {
        warning = "Then name's length should be between 3 and 15 characters !!";
      } else {
        this.setState({
          contactName: event.target.value
        });
      }
    } else {
      warning = "Name should contain characters, spaces and dots !!";
    }
    this.setState({
      nameWarning: warning
    });
  };

  phoneHandler = event => {
    this.setState({
      contactPhone: event.target.value
    });
  };

  emailHandler = event => {
    let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let warning = "";
    if (!regex.test(event.target.value)) {
      warning = "Invanid Email !!!";
    } else {
      this.setState({
        contactEmail: event.target.value
      });
    }
    this.setState({
      emailWarning: warning
    });
  };

  addContact = () => {
    let newContact = {
      name: this.state.contactName,
      phone: this.state.contactPhone,
      email: this.state.contactEmail
    };

    axios
      .post("/contacts", newContact)
      .then(res => {
        axios.get("/contacts").then(res => {
          this.updateContacts(res.data);
        });
      })
      .catch(err => console.log(err));
  };

  deleteContact = id => {
    let contactToDelete = this.state.contacts.find(contact => {
      return contact._id === id;
    });

    axios.delete(`/contacts/${id}`).then(res => console.log(res.data));

    this.setState({
      contacts: this.state.contacts.filter(contact => {
        return contact._id !== contactToDelete._id;
      })
    });
  };

  componentDidMount() {
    axios
      .get("/contacts")
      .then(res => {
        this.updateContacts(res.data);
      })
      .catch(err => console.log(err));
  }

  updateContacts = value => {
    this.setState({
      contacts: value
    });
  };

  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/" render={() => <ContactApp />} />
          <Switch>
            <Route
              path="/add_contact"
              render={() => (
                <AddContact
                  nameHandler={this.nameHandler}
                  phoneHandler={this.phoneHandler}
                  emailHandler={this.emailHandler}
                  addContact={this.addContact}
                  nameWarning={this.state.nameWarning}
                  emailWarning={this.state.emailWarning}
                />
              )}
            />
            <Route
              path="/contacts"
              render={() => (
                <ListUsers
                  contacts={this.state.contacts}
                  deleteContact={id => this.deleteContact(id)}
                />
              )}
            />
            <Route
              path="/modify_contact/:id"
              exact
              render={props => (
                <ModifyContact
                  id={props.match.params.id}
                  updateContacts={value => this.updateContacts(value)}
                />
              )}
            />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
