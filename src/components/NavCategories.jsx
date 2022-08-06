import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class NavCategories extends Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <button type="button" data-testid="category">
          { name }
        </button>
      </div>
    );
  }
}

NavCategories.propTypes = {
  name: PropTypes.string.isRequired,
};
