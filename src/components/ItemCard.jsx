import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ItemCard extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{`$: ${price}`}</p>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};
