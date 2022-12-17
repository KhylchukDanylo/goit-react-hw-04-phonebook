import PropTypes from 'prop-types';
import './Filter.modyle.css';

const Filrer = ({ value, onFilterValue }) => {
  return (
    <div className="filter">
      <label className="filte__label">
        Find contacts by name
        <input
          className="filter__input"
          type="text"
          name="filter"
          value={value}
          onChange={evt => {
            onFilterValue(evt.target.value);
          }}
        />
      </label>
    </div>
  );
};
export default Filrer;
Filrer.propTypes = {
  value: PropTypes.string,
  onFilterValue: PropTypes.func,
};
