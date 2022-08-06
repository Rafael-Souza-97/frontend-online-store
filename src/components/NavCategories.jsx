import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavCategories extends Component {
  render() {
    const { name, saveFilterCategory, id } = this.props;
    return (
      <div>
        <button
          type="button"
          id={ id }
          data-testid="category"
          onClick={ saveFilterCategory }
        >
          { name }
        </button>
      </div>
    );
  }
}

NavCategories.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  saveFilterCategory: PropTypes.func.isRequired,
};
