import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ItemCard extends Component {
  render() {
    const { thumbnail, title, price, id } = this.props;
    return (
      <div data-testid="product">
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{`$: ${price}`}</p>
        <Link
          to={ `/cart/${id}` }
          data-testid="product-detail-link"
        >
          Mais Detalhes
        </Link>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};
