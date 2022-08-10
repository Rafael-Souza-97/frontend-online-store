import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class ItemCard extends Component {
  render() {
    const {
      thumbnail,
      title,
      price,
      id,
      onClick,
      result,
      updateCounter,
      shipping,
    } = this.props;
    return (
      <div data-testid="product">
        { shipping.free_shipping && <p data-testid="free-shipping">Frete Grátis</p> }
        <img src={ thumbnail } alt={ title } />
        <h3>{ title }</h3>
        <p>{`$: ${price}`}</p>
        <Link
          to={ `/cart/${id}` }
          data-testid="product-detail-link"
        >
          Mais Detalhes
        </Link>

        <button
          type="button"
          onClick={ () => {
            onClick(result);
            updateCounter();
          } }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  result: PropTypes.shape().isRequired,
  updateCounter: PropTypes.func.isRequired,
  shipping: PropTypes.shape({
    free_shipping: PropTypes.bool.isRequired,
  }).isRequired,
};
