import PropTypes from 'prop-types';
import './Contacts.modyle.css';

const Contacts = ({ contacts, onDeleteContact }) => {
  if (contacts) {
    return (
      <ul>
        {contacts.map(elm => {
          return (
            <li key={elm.id}>
              {`${elm.name}: ${elm.number}`}{' '}
              <button
                type="button"
                className="btn__delete--contact"
                onClick={() => onDeleteContact(elm.id)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
};

export default Contacts;
Contacts.propTypes = {
  contacts: PropTypes.array,
  onDeleteContact: PropTypes.func,
};
