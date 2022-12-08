import React from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';

import './Phonebook.modyle.css';

class Phonebook extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitHander = ({ name, number }) => {
    const newUser = { id: nanoid(), name: name, number: number };
    let security = false;
    this.state.contacts.forEach(elm => {
      if (elm.name === name) {
        security = true;
      }
    });
    if (!security) {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newUser],
      }));
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  onFilterValue = value => {
    this.setState({
      filter: value,
    });
  };
  filterContacts = () => {
    const normalizedFilter = this.state.filter.toLocaleLowerCase();
    return this.state.contacts.filter(contact =>
      contact.name.toLocaleLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  componentDidMount() {
    const contact = localStorage.getItem('contacts');
    const persedContact = JSON.parse(contact);
    if (persedContact) {
      this.setState({ contacts: persedContact });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  render() {
    const visibleContact = this.filterContacts();

    return (
      <div>
        <h1 className="title">Phonebook</h1>

        <ContactForm
          key="contactForm"
          onSubmit={this.formSubmitHander}
        ></ContactForm>
        <h2 className="title">Contacts</h2>
        <Filter
          key="filter"
          onFilterValue={this.onFilterValue}
          value={this.state.filter}
        ></Filter>
        <Contacts
          key="contacts"
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        ></Contacts>
      </div>
    );
  }
}
export default Phonebook;
