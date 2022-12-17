import { useState } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from '../ContactForm/ContactFormHooks';
import Filter from '../Filter/Filter';
import Contacts from '../Contacts/Contacts';
import useLocalStorage from '../hooks/useLocalStorahe';

import './App.modyle.css';
export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filters, setFilter] = useState('');

  const formSubmitHander = (name, number) => {
    const newUser = { id: nanoid(), name: name, number: number };
    let security = false;
    contacts.forEach(elm => {
      if (elm.name === name) {
        security = true;
      }
    });
    if (!security) {
      setContacts([...contacts, newUser]);
    } else {
      alert(`${name} is already in contacts.`);
    }
  };

  const onFilterValue = value => {
    setFilter(value);
  };
  const filterContacts = () => {
    if (filters !== undefined) {
      const normalizedFilter = filters.toLocaleLowerCase();
      return contacts.filter(contact =>
        contact.name.toLocaleLowerCase().includes(normalizedFilter)
      );
    }
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div>
      <h1 className="title">Phonebook</h1>

      <ContactForm key="contactForm" onSubmit={formSubmitHander}></ContactForm>
      <h2 className="title">Contacts</h2>
      <Filter
        key="filter"
        onFilterValue={onFilterValue}
        value={filters}
      ></Filter>
      <Contacts
        key="contacts"
        contacts={filterContacts()}
        onDeleteContact={deleteContact}
      ></Contacts>
    </div>
  );
};
