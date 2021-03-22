import React from 'react';
import PropTypes from 'prop-types';

class Dropdown extends React.Component {
  render() {
    const { onChange } = this.props;
    return (
      <div>
        <select onChange={ onChange } name="select">
          <option value=""> </option>
          <option value="Menor" name="Menor">Menor Preço</option>
          <option value="Maior" name="Maior">Maior Preço</option>
        </select>
      </div>
    );
  }
}

Dropdown.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default Dropdown;
