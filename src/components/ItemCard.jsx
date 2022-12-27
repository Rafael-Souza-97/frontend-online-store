import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../styles/Home.css'

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
      <div data-testid="product" className='card'>
        <Link
          to={ `/cart/${id}` }
          data-testid="product-detail-link"
        >
          <div className='card-link' >
            { shipping.free_shipping && <p data-testid="free-shipping" className='frete'>Frete Grátis</p> }
            <img src={ thumbnail } alt={ title } className='product-img'/>
            <h3 className='card-title'>{ title }</h3>
            <p className='price'>{`R$ ${price}`}</p>
          </div>
        </Link>

        <div className='buttom-fix'>
          <button
            type="button"
            className='add-to-cart-button'
            onClick={ () => {
              onClick(result);
              updateCounter();
            } }
            data-testid="product-add-to-cart"
          >
            Adicionar ao Carrinho
          </button>
        </div>
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
