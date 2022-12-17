import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactFormHooks';
import Filter from './Filter';
import Contacts from './Contacts';

import './Phonebook.modyle.css';

export default function Phonebook() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(window.localStorage.getItem('contacts')) ?? [];
  });
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

  // useEffect(() => {
  //   const visibleContact = filterContacts();
  // }, [filters]);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

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
        contacts={contacts}
        onDeleteContact={deleteContact}
      ></Contacts>
    </div>
  );
}

// class Phonebook extends React.Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   formSubmitHander = (name, number) => {
//     const newUser = { id: nanoid(), name: name, number: number };
//     let security = false;
//     this.state.contacts.forEach(elm => {
//       if (elm.name === name) {
//         security = true;
//       }
//     });
//     if (!security) {
//       this.setState(prevState => ({
//         contacts: [...prevState.contacts, newUser],
//       }));
//     } else {
//       alert(`${name} is already in contacts.`);
//     }
//   };

//   onFilterValue = value => {
//     this.setState({
//       filter: value,
//     });
//   };
//   filterContacts = () => {
//     const normalizedFilter = this.state.filter.toLocaleLowerCase();
//     return this.state.contacts.filter(contact =>
//       contact.name.toLocaleLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   componentDidMount() {
//     const contact = localStorage.getItem('contacts');
//     const persedContact = JSON.parse(contact);
//     if (persedContact) {
//       this.setState({ contacts: persedContact });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.contacts !== this.state.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   render() {
//     const visibleContact = this.filterContacts();

//     return (
//       <div>
//         <h1 className="title">Phonebook</h1>

//         <ContactForm
//           key="contactForm"
//           onSubmit={this.formSubmitHander}
//         ></ContactForm>
//         <h2 className="title">Contacts</h2>
//         <Filter
//           key="filter"
//           onFilterValue={this.onFilterValue}
//           value={this.state.filter}
//         ></Filter>
//         <Contacts
//           key="contacts"
//           contacts={visibleContact}
//           onDeleteContact={this.deleteContact}
//         ></Contacts>
//       </div>
//     );
//   }
// }
// export default Phonebook;
