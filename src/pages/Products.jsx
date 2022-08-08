import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductFromId } from '../services/api';
import {
  getProductToLocalStorage, setProductToLocalStorage,
} from '../services/localStorage';

export default class Products extends Component {
  constructor() {
    super();
    this.state = {
      requestProduct: {},
      productsInCart: [],
    };
  }

  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const requestProduct = await getProductFromId(id);
    const productsInCart = JSON.parse(getProductToLocalStorage());
    this.setState({ requestProduct, productsInCart });
  }

  handleClick = () => {
    const { requestProduct, productsInCart } = this.state;
    if (productsInCart) {
      productsInCart.push(requestProduct);
      this.setState({ productsInCart }, setProductToLocalStorage(JSON
        .stringify(productsInCart)));
    }
  }

  render() {
    const { requestProduct: { price, title, thumbnail } } = this.state;

    return (
      <div>
        <img
          src={ thumbnail }
          alt={ title }
          data-testid="product-detail-image"
        />

        <h3 data-testid="product-detail-name">{ title }</h3>

        <p data-testid="product-detail-price">{`R$: ${price}`}</p>

        <Link to="/cart" data-testid="shopping-cart-button">
          Carrinho
        </Link>

        <button
          type="button"
          onClick={ this.handleClick }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
  }
}

Products.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
