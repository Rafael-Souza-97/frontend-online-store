import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CartInfo extends Component {
  render() {
    const { counter } = this.props;
    return (
      <span data-testid="shopping-cart-size">{counter}</span>
    );
  }
}

CartInfo.propTypes = {
  counter: PropTypes.number.isRequired,
};
